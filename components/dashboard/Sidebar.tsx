import { cn } from '@/lib/utils'
import { SidebarHeader } from './SidebarHeader'
import { SidebarMenu, MenuItem } from './SidebarMenu'
import { SidebarFooter } from './SidebarFooter'
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  HelpCircle,
  MessageSquare,
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  companyName?: string
  companyLogo?: string
}

const mainNavItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Utenti',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Servizi',
    href: '/dashboard/services',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
]

const bottomNavItems: MenuItem[] = [
  {
    title: 'Supporto',
    href: '/dashboard/support',
    icon: HelpCircle,
  },
  {
    title: 'Aiuto',
    href: '/dashboard/help',
    icon: MessageSquare,
  },
  {
    title: 'Impostazioni',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar({ 
  isCollapsed, 
  companyName = 'MyCompany', 
  companyLogo = 'MC' 
}: SidebarProps) {
  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader
        isCollapsed={isCollapsed}
        companyName={companyName}
        companyLogo={companyLogo}
      />
      
      <SidebarMenu
        isCollapsed={isCollapsed}
        items={mainNavItems}
      />
      
      <SidebarFooter
        isCollapsed={isCollapsed}
        items={bottomNavItems}
      />
    </div>
  )
}