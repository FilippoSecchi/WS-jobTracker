// app/dashboard/configurations/page.tsx

import Link from 'next/link'
import { redirect } from "next/navigation";
import { Headset, Cog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import { createClient } from '@/lib/supabase/server'
import InviteDialog from '@/components/dashboard/dialogs/InviteDialog'
import PageTabs from '@/components/dashboard/pages/ui/PageTabs';
import GeneraliTab from '@/components/dashboard/pages/configurations/GeneraliTab';
import NotificheTab from '@/components/dashboard/pages/configurations/NotificheTab';
import MessaggiTab from '@/components/dashboard/pages/configurations/MessaggiTab';
import FrontSiteTab from '@/components/dashboard/pages/configurations/FrontSiteTab';
import WebAppTab from '@/components/dashboard/pages/configurations/WebAppTab';
import PwaTab from '@/components/dashboard/pages/configurations/PwaTab';
import RbacTab from '@/components/dashboard/pages/configurations/RbacTab';
import UsersTabs from '@/components/dashboard/pages/configurations/UsersTabs';


const contentTabs = [
  {
    id: "generali",
    label: "Generali",
    content: <GeneraliTab />,
  },
  {
    id: "front-site",
    label: "Sito Web",
    content: <FrontSiteTab />,
  },
  {
    id: "web-app",
    label: "Web App (desktop)",
    content: <WebAppTab />,
  },
  {
    id: "pwa",
    label: "PWA (mobile)",
    content: <PwaTab />,
  },
  {
    id: "roles",
    label: "RBAC",
    content: <RbacTab />,
  },
  {
    id: "users",
    label: "Utenti",
    content: <UsersTabs />,
  },
  {
    id: "notifications",
    label: "Notifiche",
    content: <NotificheTab />,
  },
  {
    id: "messages",
    label: "Messaggi",
    content: <MessaggiTab />,
  },
];


export default async function ConfigurationsPage() {
  /* const [activeTab, setActiveTab] = useState('active'); */

  const supabase = await createClient()
  
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims || !data.claims.sub || !data.claims.email || !data.claims.aud || data.claims.aud !== 'authenticated') {
      redirect("/auth/login");
    }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Configurazioni', href: '/dashboard/configurations' },
        ]}
      />

      {/* Header */}
      <Header
        title="Configurazioni"
        description="Configura i settaggi generali dell'intero ecosistema. Gestisci le preferenze e le impostazioni dell'applicazione, del sito web, dell'app mobile e della web app desktop. Imposta notifiche personalizzate per ricevere aggiornamenti importanti sulle attività di lavoro, gestisci gli utenti con ruoli e permessi specifici, ottimizza l'esperienza dell'utente attraverso la configurazione delle preferenze del sito web, personalizza il design dell'app mobile e della web app desktop, ottieni feedback dagli utenti tramite messaggi e molto altro."
        icon={<Cog className="h-5 w-5" />}
        actions={[
          <InviteDialog key="invite" />, // Client-side dialog with its own state
          <Button key="help-center" asChild>
            <Link href="/dashboard/help">
              <Headset className="h-4 w-4 mr-2" />
              Help Center
            </Link>
          </Button>,
        ]}
      />

      {/* Tabs */}
      <PageTabs tabs={contentTabs} defaultTab="generali" />

    </div>
  )
}
