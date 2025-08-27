'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Navbar } from '@/components/dashboard/Navbar'
import { UserProfile } from '@/components/dashboard/NavbarProfile'
import { Message } from '@/components/dashboard/NavbarMessages'
import { Notification } from '@/components/dashboard/NavbarNotifications'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock data - sostituisci con i dati reali da Supabase
  const user: UserProfile = {
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    avatar: '/placeholder-avatar.jpg'
  }

  const notifications: Notification[] = [
    { id: 1, message: 'Nuovo messaggio da cliente', time: '5 min fa' },
    { id: 2, message: 'Aggiornamento sistema completato', time: '1 ora fa' },
  ]

  const messages: Message[] = [
    { id: 1, from: 'Cliente ABC', message: 'Quando sarà pronto il progetto?', time: '10 min fa' },
    { id: 2, from: 'Team Dev', message: 'Review codice completata', time: '30 min fa' },
  ]

  const handleLogout = () => {
    // Implementa qui la logica di logout con Supabase
    console.log('Logout user')
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
          user={user}
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