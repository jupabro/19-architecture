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
    const existingNavigationItems = this.navigationItemsSubject.value
    const childRoute = routes[0]
    if (this.isChildRoute(childRoute)) {
      const labeledChildRoutes = childRoute.children.filter((child) => this.isLabeledRoute(child)) as LabeledRoute[]
      const parentNavigationItem = existingNavigationItems.find(item => this.findNavigationItem(item, childRoute.data['parents']));
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

  private findNavigationItem(item: NavigationItem, link: string[]): NavigationItem | null {
    if (item.link === link) {
      return item;
    }
    for (const child of item.children) {
      const result = this.findNavigationItem(child, link);
      if (result !== null) {
        return result;
      }
    }
    return null;
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

  private isNavigationItem(item: any): item is NavigationItem {
    return (
      item &&
      typeof item.label === 'string' &&
      Array.isArray(item.link) &&
      item.link.every((segment: any) => typeof segment === 'string') &&
      Array.isArray(item.children)
    );
  }

  private isLabeledRoute(route: Route): route is LabeledRoute {
    return Boolean(route.data && typeof route.data['label'] === 'string');
  }

  private isChildRoute(route: Route): route is ChildRoute {
    const isArrayOfStrings = (arr: unknown): boolean => {
      return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
    }
    return Boolean(
      isArrayOfStrings(route.data?.['parents']) && route.children)
  }
}





