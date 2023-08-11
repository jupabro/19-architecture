import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigationItem } from '../models/nav-item.interface';
import { LabeledRoute } from '../models/route.interface';
import { isLabeledRoute, isChildRoute } from '../models/type-utils';

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
    if (isChildRoute(childRoute)) {
      const labeledChildRoutes = childRoute.children.filter((child) => isLabeledRoute(child)) as LabeledRoute[]
      const parentNavigationItem = this.findNavigationItem(childRoute.data['parents'])
      console.log("parentNavigationItem", parentNavigationItem)
      if (parentNavigationItem) {
        const updatedNavigationItems: NavigationItem[] = existingNavigationItems.map((item) => this.updateNavigationItem(item, labeledChildRoutes, parentNavigationItem))
        this.navigationItemsSubject.next(updatedNavigationItems);
      }
    } else {
      const labeledRoutes = routes.filter((route) => isLabeledRoute(route)) as LabeledRoute[]
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
}





