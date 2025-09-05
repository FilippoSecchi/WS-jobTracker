import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

export interface UserProfile {
  first_name: string
  last_name: string
  name?: string
  email: string
  avatar?: string
}

interface NavbarProfileProps {
  user: UserProfile
  onLogout?: () => void
}

export function NavbarProfile({ user, onLogout }: NavbarProfileProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior
      console.log('Logout clicked')
    }
  }

  console.log("Rendering NavbarProfile with user:", user)
  const avatar = user.avatar || ''
  const name = `${user.first_name} ${user.last_name}`.trim() || user.email
  user = { ...user, name } // Aggiungo il campo name per comodità
  const first_name = user.first_name || ''
  const last_name = user.last_name || ''
  let avatarFallBacK = ''
  if (!avatar) {
    avatarFallBacK = getInitials(first_name, last_name)
  }
  console.log("Avatar:", avatar)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{avatarFallBacK}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">
            {name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
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
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}