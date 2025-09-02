'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Navbar } from '@/components/dashboard/Navbar'
import { UserProfile } from '@/components/dashboard/NavbarProfile'
import { Message } from '@/components/dashboard/NavbarMessages'
import { Notification } from '@/components/dashboard/NavbarNotifications'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {  
  const router = useRouter();
  const supabase = createClient()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  const notifications: Notification[] = [
    { id: 1, message: 'Nuovo messaggio da cliente', time: '5 min fa' },
    { id: 2, message: 'Aggiornamento sistema completato', time: '1 ora fa' },
  ]

  const messages: Message[] = [
    { id: 1, from: 'Cliente ABC', message: 'Quando sarà pronto il progetto?', time: '10 min fa' },
    { id: 2, from: 'Team Dev', message: 'Review codice completata', time: '30 min fa' },
  ]

  useEffect(() => {
    const getUser = async () => {
      const {
        data: user,
        error,
      } = await supabase.auth.getClaims()

      if (error) {
        console.error('Errore recupero user:', error.message)
        return
      }

      console.log('Utente autenticato:', user)

      if (user) {
        setUser({
          name: user.claims?.full_name || user.claims.email?.split('@')[0] || 'Utente',
          email: user.claims.email || '',
          avatar: user.claims?.avatar_url || '/placeholder-avatar.jpg',
        })
      }
    }

    getUser()

    // opzionale: listener per login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Utente',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url || '/placeholder-avatar.jpg',
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/auth/login");
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        companyName="MyCompany"
        companyLogo="MC"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar
          isCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          user={user ?? { name: '', email: '', avatar: '/placeholder-avatar.jpg' }}
          messages={messages}
          notifications={notifications}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
