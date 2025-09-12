// components/sidebar/SidebarFooter.tsx
// "use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
// import { headers } from "next/headers"
import { usePathname } from 'next/navigation'
import { MenuItem } from './SidebarMenu'

interface SidebarFooterProps {
  isCollapsed: boolean
  items: MenuItem[]
}

export function SidebarFooter({ isCollapsed, items }: SidebarFooterProps) {
  const pathname = usePathname()
  //const headerObj = await headers();
  //const pathname = headerObj.get("x-invoke-path") ?? "";

  return (
    <div className="p-2 border-t space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                isCollapsed ? "px-2" : "px-3",
                isActive && "bg-secondary text-secondary-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-3")} />
              {!isCollapsed && (
                <span className="transition-opacity duration-200">
                  {item.title}
                </span>
              )}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}