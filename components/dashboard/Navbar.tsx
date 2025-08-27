import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NavbarMessages, Message } from './NavbarMessages'
import { NavbarNotifications, Notification } from './NavbarNotifications'
import { NavbarProfile, UserProfile } from './NavbarProfile'

interface NavbarProps {
  isCollapsed: boolean
  onToggleSidebar: () => void
  user: UserProfile
  messages: Message[]
  notifications: Notification[]
  onLogout?: () => void
}

export function Navbar({
  isCollapsed,
  onToggleSidebar,
  user,
  messages,
  notifications,
  onLogout
}: NavbarProps) {
  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6">
      {/* Left side - Collapse button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSidebar}
        className="p-2"
        aria-label={isCollapsed ? "Espandi sidebar" : "Comprimi sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Right side - Notifications, Messages, Profile */}
      <div className="flex items-center space-x-4">
        <NavbarMessages messages={messages} />
        <NavbarNotifications notifications={notifications} />
        <NavbarProfile user={user} onLogout={onLogout} />
      </div>
    </header>
  )
}