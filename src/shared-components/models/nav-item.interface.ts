export interface NavigationItem {
    label: string;
    link: string[];
    children: NavigationItem[];
}