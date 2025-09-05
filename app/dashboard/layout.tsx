'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const userId = session.user.id
          /* console.log("Utente autenticato:", userId) */

          // recupero profilo da user_profiles
          const { data: userProfileData, error: userProfileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single()

          if (userProfileError) {
            console.error('Errore recupero profilo utente:', userProfileError.message)
            return
          }

          if (userProfileData) {
            const avatar = userProfileData.avatar_url || ''

            setUser({
              first_name: userProfileData.first_name || '',
              last_name: userProfileData.last_name || '',
              email: userProfileData.email,
              avatar,
            })
          }
        } else {
          console.log("Utente non autenticato")
          router.push("/auth/login")
          setUser(null)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/auth/login");
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen flex bg-background">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          companyName="WS Job Tracker"
          companyLogo="WS"
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <Navbar
            isCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            user={user ?? { first_name: '', last_name: '', email: '', avatar: '' }}
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
    </ThemeProvider>
  )
}
