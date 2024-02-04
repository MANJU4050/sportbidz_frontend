import { ReactElement } from "react";

export interface RouteProps {
    path: string;
    name: string;
    element: ReactElement;
    isVisible: boolean;
    isIndex?:boolean
}