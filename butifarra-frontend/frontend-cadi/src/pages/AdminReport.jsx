import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Dashboard } from "../components/Dashboard/Dashboard";

export default function AdminReport() {
  return (
    
   <main style={{ display: 'grid', gridTemplateColumns: '230px 1fr'}} className="h-screen w-screen p-0 gap-0 ">
      <Sidebar />
      
      <Dashboard />
      
    </main>
  );
}