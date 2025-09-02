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
  Cog,
  Headset,
  Code,
  FilePen,
  Clock,
  UserCog,
  Handshake,
  UserLock,
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
    title: 'Statistiche',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'test',
    href: '/dashboard/test',
    icon: Code,
  },
  {
    title: 'Collaboratori',
    href: '/dashboard/staff',
    icon: UserCog,
  },
  {
    title: 'Candidati',
    href: '/dashboard/candidates',
    icon: UserLock,
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
    icon: FileText,
  },
  {
    title: 'Ore lavorate',
    href: '/dashboard/worked-hours',
    icon: Clock,
  },
  {
    title: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    title: 'Quiz',
    href: '/dashboard/quiz',
    icon: FilePen,
  },
]

const bottomNavItems: MenuItem[] = [
  {
    title: 'Impostazioni',
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