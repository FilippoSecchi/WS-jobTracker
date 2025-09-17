'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight, UserPlus, Headset,
  Building,
  Briefcase,
  Calendar
} from 'lucide-react'
import Header from '@/components/dashboard/pages/ui/Header'
import Link from 'next/link'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb';

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // 

  
  // Sample data for charts
  const servicesData = [
    { month: 'Gen', servizi: 4 },
    { month: 'Feb', servizi: 7 },
    { month: 'Mar', servizi: 5 },
    { month: 'Apr', servizi: 10 },
    { month: 'Mag', servizi: 8 },
    { month: 'Giu', servizi: 12 },
    { month: 'Lug', servizi: 15 }
  ];

  const workerDistributionData = [
    { name: 'Cuochi', value: 18 },
    { name: 'Camerieri', value: 32 },
    { name: 'Baristi', value: 12 },
    { name: 'Altro', value: 8 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

  const serviceStatusData = [
    { name: 'Pianificato', value: 15 },
    { name: 'In Corso', value: 8 },
    { name: 'Completato', value: 25 },
    { name: 'Annullato', value: 2 }
  ];

  const STATUS_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F43F5E'];

  // Upcoming services data
  const upcomingServices = [
    {
      id: 1,
      client: 'Hotel Belvedere',
      serviceType: 'Catering Matrimonio',
      date: '2025-05-10T14:00:00',
      workerCount: 8,
      location: 'Milano'
    },
    {
      id: 2,
      client: 'Ristorante Da Marco',
      serviceType: 'Servizio Bar',
      date: '2025-05-12T18:30:00',
      workerCount: 4,
      location: 'Roma'
    },
    {
      id: 3,
      client: 'Villa Rosa',
      serviceType: 'Evento Aziendale',
      date: '2025-05-15T09:00:00',
      workerCount: 12,
      location: 'Firenze'
    }
  ];

  // Recent services data
  const recentServices = [
    {
      id: 1,
      client: 'Grand Hotel',
      serviceType: 'Catering Conferenza',
      date: '2025-05-04',
      status: 'Completato',
      revenue: 3200
    },
    {
      id: 2,
      client: 'Tenuta Bianchi',
      serviceType: 'Matrimonio',
      date: '2025-05-03',
      status: 'Completato',
      revenue: 5500
    },
    {
      id: 3,
      client: 'Azienda Tech Spa',
      serviceType: 'Aperitivo Aziendale',
      date: '2025-05-02',
      status: 'Completato',
      revenue: 1800
    },
    {
      id: 4,
      client: 'Hotel Splendid',
      serviceType: 'Gala Dinner',
      date: '2025-05-01',
      status: 'Completato',
      revenue: 4200
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleString('it-IT', options);
  };

  const formatDateOnly = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleString('it-IT', options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pianificato':
        return 'bg-blue-100 text-blue-800';
      case 'In Corso':
        return 'bg-purple-100 text-purple-800';
      case 'Completato':
        return 'bg-green-100 text-green-800';
      case 'Annullato':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2'>
        <Card className='stat-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Servizi Totali
            </CardTitle>
            <Briefcase className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42</div>
            <p className='text-xs text-muted-foreground'>
              +15% rispetto al mese scorso
            </p>
          </CardContent>
        </Card>
        <Card className='stat-card yellow'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Servizi Pianificati
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>
              3 in arrivo questa settimana
            </p>
          </CardContent>
        </Card>
        <Card className='stat-card info'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Lavoratori Attivi
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>70</div>
            <Progress value={70} className='h-2 mt-2' />
          </CardContent>
        </Card>
        <Card className='stat-card success'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Clienti</CardTitle>
            <Building className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24</div>
            <p className='text-xs text-muted-foreground'>3 nuovi questo mese</p>
          </CardContent>
        </Card>
      </div>

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

      

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 py-2'>
        {/* First chart - Area chart for Services */}
        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Servizi nel Tempo</CardTitle>
            <CardDescription>Servizi mensili realizzati</CardDescription>
          </CardHeader>
          <CardContent className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                data={servicesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='servizi'
                  stroke='#3B82F6'
                  fill='#93C5FD'
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Second column with two smaller charts */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Pie chart for worker distribution */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>Distribuzione Lavoratori</CardTitle>
              <CardDescription>Per ruolo lavorativo</CardDescription>
            </CardHeader>
            <CardContent className='h-52'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={workerDistributionData}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name }) =>
                      `${name}`
                    }
                    /* label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    } */
                  >
                    {workerDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar chart for service status */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>Stato Servizi</CardTitle>
              <CardDescription>Distribuzione attuale</CardDescription>
            </CardHeader>
            <CardContent className='h-52'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={serviceStatusData}
                  layout='vertical'
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' />
                  <YAxis dataKey='name' type='category' width={80} />
                  <Tooltip />
                  <Bar dataKey='value'>
                    {serviceStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Services and Recent Services */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 py-2'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle>Servizi Imminenti</CardTitle>
            <CardDescription>
              I tuoi servizi pianificati per le prossime 2 settimane
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingServices.length > 0 ? (
              <div className='space-y-4'>
                {upcomingServices.map((service) => (
                  <div
                    key={service.id}
                    className='flex items-start justify-between border-b last:border-0 pb-4 last:pb-0'
                  >
                    <div className='space-y-1'>
                      <p className='font-medium'>{service.client}</p>
                      <p className='text-sm text-muted-foreground'>
                        {service.serviceType}
                      </p>
                      <div className='flex items-center text-xs text-muted-foreground'>
                        <Calendar className='h-3 w-3 mr-1' />
                        {formatDate(service.date)}
                        <span className='mx-2'>•</span>
                        <Users className='h-3 w-3 mr-1' /> {service.workerCount}{' '}
                        lavoratori
                        <span className='mx-2'>•</span>
                        {service.location}
                      </div>
                    </div>
                    <Button variant='outline' size='sm'>
                      Dettagli
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-8 text-center'>
                <Calendar className='h-12 w-12 text-muted-foreground mb-3' />
                <p className='text-muted-foreground'>
                  Nessun servizio imminente.
                </p>
              </div>
            )}
            <div className='mt-4'>
              <Button variant='outline' size='sm' className='w-full'>
                Vedi Tutti i Servizi
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle>Servizi Recenti</CardTitle>
            <CardDescription>
              I tuoi servizi completati recentemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentServices.length > 0 ? (
              <div className='space-y-4'>
                {recentServices.map((service) => (
                  <div
                    key={service.id}
                    className='flex items-start justify-between border-b last:border-0 pb-4 last:pb-0'
                  >
                    <div className='space-y-1'>
                      <p className='font-medium'>{service.client}</p>
                      <p className='text-sm text-muted-foreground'>
                        {service.serviceType}
                      </p>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-muted-foreground'>
                          {formatDateOnly(service.date)}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                            service.status
                          )}`}
                        >
                          {service.status}
                        </span>
                        <span className='text-xs font-medium'>
                          €{service.revenue}
                        </span>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Fattura
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-8 text-center'>
                <Briefcase className='h-12 w-12 text-muted-foreground mb-3' />
                <p className='text-muted-foreground'>
                  Nessun servizio recente.
                </p>
              </div>
            )}
            <div className='mt-4'>
              <Button variant='outline' size='sm' className='w-full'>
                Vedi Storico Servizi
              </Button>
            </div>
          </CardContent>
        </Card>
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