// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    hidden: string;
    isExternalLink: boolean;
    submenu : RouteInfo[];
}
