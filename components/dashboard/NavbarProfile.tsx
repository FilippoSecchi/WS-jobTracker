"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { logoutAction } from "@/app/actions/logout";

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name: string;
  email: string;
  user_role?: string;
  avatar?: string;
}

interface NavbarProfileProps {
  user: UserProfile;
}

export default function NavbarProfile({ user }: NavbarProfileProps) {
  const name = `${user.first_name ?? ""} ${user.last_name}`.trim() || user.email;
  const user_role = user.user_role || "guest";
  const avatarFallback = getInitials(user.first_name ?? "", user.last_name ?? "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={name} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-violet-700 dark:text-violet-300">{name}</p>
            <p className="text-xs font-normal">
              {user_role}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <User className="mr-2 h-4 w-4" />
            Il Mio Profilo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Impostazioni
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logoutAction}>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
