import { Route } from "@angular/router"
import { ChildRoute, LabeledRoute } from "./route.interface";

export const isLabeledRoute = (route: Route): route is LabeledRoute => {
    return Boolean(route.data && route.path && typeof route.data['label'] === 'string');
}

export const isChildRoute = (route: Route): route is ChildRoute => {
    const isArrayOfStrings = (arr: unknown): boolean => {
        return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
    }
    return Boolean(isArrayOfStrings(route.data?.['parents']) && route.children)
}