import React from "react";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";
import { Logout } from "./Logout";
export const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-white  p-4 shadow">
        <div className="sticky top-1 h-[90vh]">
            <AccountToggle />
            <RouteSelect/>
            <Logout/>
        </div>
    </aside>
  );
};