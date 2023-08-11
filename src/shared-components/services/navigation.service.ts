import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigationItem } from '../models/nav-item.interface';
import { LabeledRoute, ChildRoute } from '../models/child.route.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationItemsSubject = new BehaviorSubject<NavigationItem[]>([]);
  navigationItems$ = this.navigationItemsSubject.asObservable();

  addNavigationItems(routes: Route[]): void {
    console.log("service add", routes)
    const existingNavigationItems = this.navigationItemsSubject.value
    const childRoute = routes[0]
    if (this.isChildRoute(childRoute)) {
      const labeledChildRoutes = childRoute.children.filter((child) => this.isLabeledRoute(child)) as LabeledRoute[]
      const parentNavigationItem = this.findNavigationItem(childRoute.data['parents'])
      console.log("parentNavigationItem", parentNavigationItem)
      if (parentNavigationItem) {
        const updatedNavigationItems: NavigationItem[] = existingNavigationItems.map((item) => this.updateNavigationItem(item, labeledChildRoutes, parentNavigationItem))
        this.navigationItemsSubject.next(updatedNavigationItems);
      }
    } else {
      const labeledRoutes = routes.filter((route) => this.isLabeledRoute(route)) as LabeledRoute[]
      const newNavigationItems = this.createNavigationItems(labeledRoutes, null)
      this.navigationItemsSubject.next([...existingNavigationItems, ...newNavigationItems]);
    }
  }

  private updateNavigationItem(item: NavigationItem, childRoutes: LabeledRoute[], parentItem: NavigationItem): NavigationItem {
    const newChildNavigationItems = this.createNavigationItems(childRoutes, parentItem)

    if (item.link === parentItem.link) {
      return { ...item, children: newChildNavigationItems };
    }
    for (const childItem of item.children) {
      if (childItem.link === parentItem.link) {
        return { ...childItem, children: newChildNavigationItems };
      }
    }
    return item;
  }

  private linksAreIdentical = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  private findNavigationItem(link: string[]): NavigationItem | null {
    console.log("find", link)

    const browseItemTree = (item: NavigationItem): NavigationItem | null => {

      console.log("browseItemTree", item.link)
      if (this.linksAreIdentical(item.link, link)) {
        console.log("found")
        return item;
      }
      for (const child of item.children) {
        const foundItem = browseItemTree(child);
        if (foundItem) {
          return foundItem;
        }
      }
      return null;
    }
    const foundItem = this.navigationItemsSubject.value.map(item => browseItemTree(item))
      .find(item => item !== null)
    return foundItem ? foundItem : null
  }

  private createNavigationItems(routes: LabeledRoute[], parentItem: NavigationItem | null): NavigationItem[] {
    const newNavigationItems: NavigationItem[] = [];
    const parentLink = parentItem ? parentItem.link : []

    routes.forEach((route) => {
      const newNavigationItem: NavigationItem = {
        label: route.data['label'],
        link: [...parentLink, route.path],
        children: [],
      };
      newNavigationItems.push(newNavigationItem)
    });

    return newNavigationItems;
  }

  // private isNavigationItem(item: any): item is NavigationItem {
  //   return (
  //     item &&
  //     typeof item.label === 'string' &&
  //     Array.isArray(item.link) &&
  //     item.link.every((segment: any) => typeof segment === 'string') &&
  //     Array.isArray(item.children)
  //   );
  // }

  private isLabeledRoute(route: Route): route is LabeledRoute {
    return Boolean(route.data && route.path && typeof route.data['label'] === 'string');
  }

  private isChildRoute(route: Route): route is ChildRoute {
    const isArrayOfStrings = (arr: unknown): boolean => {
      return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
    }
    return Boolean(
      isArrayOfStrings(route.data?.['parents']) && route.children)
  }
}





