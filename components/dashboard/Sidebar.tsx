import { cn } from '@/lib/utils'
import { SidebarHeader } from './SidebarHeader'
import { SidebarMenu, MenuItem } from './SidebarMenu'
import { SidebarFooter } from './SidebarFooter'
import {
  Home,
  Users,
  Settings,
  BarChart3,
  HelpCircle,
  Cog,
  Headset,
  Code,
  FilePen,
  Clock,
  Handshake,
  ShieldUser,
  UserPlus,
  HandPlatter,
  CalendarDays,
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  companyName?: string
  companyLogo?: string
}

const mainNavItems: MenuItem[] = [
  {
    title: 'test',
    href: '/dashboard/test',
    icon: Code,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Statistiche',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Collaboratori',
    href: '/dashboard/staff',
    icon: ShieldUser,
  },
  {
    title: 'Candidati',
    href: '/dashboard/candidates',
    icon: UserPlus,
  },
  {
    title: 'Workers',
    href: '/dashboard/workers',
    icon: Users,
  },
  {
    title: 'Clienti',
    href: '/dashboard/customers',
    icon: Handshake,
  },
  {
    title: 'Servizi',
    href: '/dashboard/services',
    icon: HandPlatter,
  },
  {
    title: 'Ore lavorate',
    href: '/dashboard/worked-hours',
    icon: Clock,
  },
  {
    title: 'Calendario',
    href: '/dashboard/calendar',
    icon: CalendarDays,
  },
  {
    title: 'Quiz',
    href: '/dashboard/quiz',
    icon: FilePen,
  },
]

const bottomNavItems: MenuItem[] = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Configurazioni',
    href: '/dashboard/configurations',
    icon: Cog,
  },
  {
    title: 'Supporto',
    href: '/dashboard/support',
    icon: Headset,
  },
  {
    title: 'Help Center',
    href: '/dashboard/help',
    icon: HelpCircle,
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