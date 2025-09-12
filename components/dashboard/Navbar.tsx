// components/dashboard/Navbar.tsx
"use client"

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavbarMessages, Message } from "./NavbarMessages";
import { NavbarNotifications, Notification } from "./NavbarNotifications";
import NavbarProfile, { UserProfile } from "./NavbarProfile";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface NavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  user: UserProfile;
  messages: Message[];
  notifications: Notification[];
}

export function Navbar({
  isCollapsed,
  onToggleSidebar,
  user,
  messages,
  notifications,
}: NavbarProps) {
  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSidebar}
        className="p-2"
        aria-label={isCollapsed ? "Espandi sidebar" : "Comprimi sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <NavbarMessages messages={messages} />
        <NavbarNotifications notifications={notifications} />
        <NavbarProfile user={user} />
      </div>
    </header>
  );
}
