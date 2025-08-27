import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

export interface MenuItem {
  title: string
  href: string
  icon: LucideIcon
}

interface SidebarMenuProps {
  isCollapsed: boolean
  items: MenuItem[]
}

export function SidebarMenu({ isCollapsed, items }: SidebarMenuProps) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 p-2 space-y-2">
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
    </nav>
  )
}