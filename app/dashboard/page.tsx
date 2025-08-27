'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight, UserPlus, Headset
} from 'lucide-react'
import Header from '@/components/dashboard/pages/Header'
import Link from 'next/link'
import PageBreadcrumb from '@/components/dashboard/pages/PageBreadcrumb';

export default function DashboardPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [due, setDue] = useState("")

  // Mock data - sostituisci con i dati reali da Supabase
  const stats = [
    {
      title: 'Utenti Totali',
      value: '2,345',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      description: 'Rispetto al mese scorso'
    },
    {
      title: 'Ricavi',
      value: '€45,231',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'Rispetto al mese scorso'
    },
    {
      title: 'Crescita',
      value: '+23.1%',
      change: '+4.3%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Rispetto al mese scorso'
    },
    {
      title: 'Attività',
      value: '573',
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      description: 'Rispetto al mese scorso'
    },
  ]

  const recentActivity = [
    {
      id: 1,
      user: 'Mario Rossi',
      action: 'Ha completato il progetto "Website Redesign"',
      time: '2 minuti fa',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Laura Bianchi',
      action: 'Ha creato un nuovo cliente',
      time: '15 minuti fa',
      status: 'created'
    },
    {
      id: 3,
      user: 'Giuseppe Verdi',
      action: 'Ha aggiornato le impostazioni del servizio',
      time: '1 ora fa',
      status: 'updated'
    },
    {
      id: 4,
      user: 'Sofia Ferrari',
      action: 'Ha inviato un report mensile',
      time: '2 ore fa',
      status: 'sent'
    },
  ]

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      progress: 85,
      status: 'In Progress',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mobile App',
      client: 'Tech Startup',
      progress: 60,
      status: 'In Progress',
      dueDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Brand Identity',
      client: 'Local Business',
      progress: 100,
      status: 'Completed',
      dueDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      client: 'Online Store',
      progress: 25,
      status: 'Planning',
      dueDate: '2024-03-01'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'created':
        return 'bg-blue-100 text-blue-800'
      case 'updated':
        return 'bg-yellow-100 text-yellow-800'
      case 'sent':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  useEffect(() => {
    setDue(new Date(projects[0].dueDate).toLocaleDateString("it-IT"))
  }, [projects])

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' }/* ,
          { label: 'Workers', href: '/dashboard/workers' } */
        ]}
      />

      {/* Header */}
      <Header
        title='Dashboard'
        description='Benvenuto nella tua dashboard. Ecco una panoramica delle tue attività.'
        icon={<Users className='h-5 w-5' />}
        actions={[
          <Button key='invite' onClick={() => setDialogOpen(true)}>
            <UserPlus className='mr-2 h-4 w-4' />
            Invita Worker
          </Button>,
          <Button key='help-center' asChild>
            <Link href='/dashboard/help'>
              <Headset className='h-4 w-4 mr-2' />
              Help Center
            </Link>
          </Button>
        ]}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Attività Recente</CardTitle>
            <CardDescription>
              Le ultime attività dei tuoi utenti
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Overview */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Progetti</CardTitle>
              <CardDescription>
                Stato dei progetti correnti
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Vedi tutti
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  <Badge variant="secondary" className={getProjectStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress ?? 0} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Scadenza: {due || "—"} {/* {new Date(project.dueDate).toLocaleDateString('it-IT')} */}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}