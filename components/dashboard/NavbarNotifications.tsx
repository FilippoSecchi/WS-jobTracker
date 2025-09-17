import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export interface Notification {
  id: number
  message: string
  time: string
}

const notifications: Notification[] = [
  { id: 1, message: "Nuovo messaggio da cliente", time: "5 min fa" },
  { id: 2, message: "Aggiornamento sistema completato", time: "1 ora fa" },
];

export function NavbarNotifications() {
  const hasNewNotifications = notifications.length > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-4 w-4" />
          {hasNewNotifications && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifiche</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>
            Nessuna nuova notifica
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
              <div className="text-sm">{notification.message}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {notification.time}
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/notifications" className="w-full text-center">
            Vedi tutte le notifiche
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}