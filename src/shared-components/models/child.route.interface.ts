import { Route } from '@angular/router';

export interface LabeledRoute extends Route {
    path: string,
    data: {
        label: string;
    };
}

export interface ChildRoute extends Route {
    data: { parents: string[] };
    children: Route[]
}