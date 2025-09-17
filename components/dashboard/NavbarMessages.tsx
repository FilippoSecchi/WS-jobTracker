import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export interface Message {
  id: number
  from: string
  message: string
  time: string
}

const messages: Message[] = [
  { id: 1, from: "Cliente ABC", message: "Quando sarà pronto il progetto?", time: "10 min fa" },
  { id: 2, from: "Team Dev", message: "Review codice completata", time: "30 min fa" },
];

export function NavbarMessages() {
  const hasNewMessages = messages.length > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Mail className="h-4 w-4" />
          {hasNewMessages && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {messages.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Messaggi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {messages.length === 0 ? (
          <DropdownMenuItem disabled>
            Nessun nuovo messaggio
          </DropdownMenuItem>
        ) : (
          messages.map((message) => (
            <DropdownMenuItem key={message.id} className="flex flex-col items-start p-3">
              <div className="font-medium">{message.from}</div>
              <div className="text-sm text-muted-foreground truncate w-full">
                {message.message}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {message.time}
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/messages" className="w-full text-center">
            Vedi tutti i messaggi
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}