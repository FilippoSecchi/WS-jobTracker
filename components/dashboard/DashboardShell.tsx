"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import type { UserProfile } from "@/components/dashboard/NavbarProfile";

interface DashboardShellProps {
  user: UserProfile;
  children: React.ReactNode;
}

export default function DashboardShell({ user, children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  //console.log('DashboardShell User', user);

  return (
    <div className="h-screen flex bg-background">
      <Sidebar isCollapsed={isCollapsed} companyName="WS Job Tracker" companyLogo="WS" />

      <div className="flex-1 flex flex-col">
        <Navbar
          isCollapsed={isCollapsed}
          onToggleSidebar={() => setIsCollapsed((v) => !v)}
          user={user}
        />

        <main className="flex-1 overflow-auto p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}