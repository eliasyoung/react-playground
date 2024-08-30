import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "@/components/header/header";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Header />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
    </React.Fragment>
  ),
});