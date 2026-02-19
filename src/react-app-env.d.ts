/// <reference types="react-scripts" />

declare module "react-router-dom" {
  import * as React from "react";

  export interface RouteObject {
    path?: string;
    element?: React.ReactElement;
  }

  export interface RouterProps {
    children?: React.ReactNode;
  }

  export const BrowserRouter: React.ComponentType<RouterProps>;

  export const Routes: React.ComponentType<{ children?: React.ReactNode }>;

  export const Route: React.ComponentType<RouteObject>;

  export const Link: React.ComponentType<{ to: string; children?: React.ReactNode }>;
}
