// app/dashboard/settings/page.tsx

import Link from 'next/link'
import { redirect } from "next/navigation";
import { cookies as nextCookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Headset, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import InviteDialog from '@/components/dashboard/dialogs/InviteDialog'
import PageTabs from '@/components/dashboard/pages/ui/PageTabs';
import GeneraliTab from '@/components/dashboard/pages/settings/GeneraliTab';
import AgenziaTab from '@/components/dashboard/pages/settings/AgenziaTab';
import NotificheTab from '@/components/dashboard/pages/settings/NotificheTab';
import MessaggiTab from '@/components/dashboard/pages/settings/MessaggiTab';
import UtentiTab from '@/components/dashboard/pages/settings/UtentiTabs';
import FrontSiteTab from '@/components/dashboard/pages/settings/FrontSiteTab';
import WebAppTab from '@/components/dashboard/pages/settings/WebAppTab';
import PwaTab from '@/components/dashboard/pages/settings/PwaTab';

//import type { UserProfile } from '@/types/UserProfile'; // Adjust the import path as needed


export interface UserProfile {
  id: string;
  first_name?: string;
  last_name: string;
  email: string;
  user_role?: string;
  avatar?: string;
}

const contentTabs = [
  {
    id: "generali",
    label: "Generali",
    content: <GeneraliTab />,
  },
  {
    id: "agenzia",
    label: "Agenzia",
    content: <AgenziaTab />,
  },
  {
    id: "front-site",
    label: "Sito Web",
    content: <FrontSiteTab />,
  },
  {
    id: "web-app",
    label: "Web App",
    content: <WebAppTab />,
  },
  {
    id: "pwa",
    label: "PWA (mobile)",
    content: <PwaTab />,
  },
  {
    id: "utenti",
    label: "Utenti",
    content: <UtentiTab />,
  },
  {
    id: "notifiche",
    label: "Notifiche",
    content: <NotificheTab />,
  },
  {
    id: "messaggi",
    label: "Messaggi",
    content: <MessaggiTab />,
  },
];




export default async function SettingsPage() {
  const supabase = await createClient()

  // Ensure authenticated user
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims || !claimsData.claims.sub || !claimsData.claims.email || !claimsData.claims.aud || claimsData.claims.aud !== 'authenticated') {
    redirect("/auth/login");
  }
  console.log("Page Claims:", claimsData?.claims);

  // Optionally fetch the user profile here
  const { data: userRes } = await supabase.auth.getUser();
  let userProfile: UserProfile | null = null;
  if (userRes?.user) {
    const userId = userRes.user.id;
    const { data: userProfileData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    const { data: roles } = await supabase.rpc("get_user_role", { p_user_id: userId });
    const userRole = roles && roles.length > 0 ? roles[0].role : "ospite";

    userProfile = {
      id: userId,
      first_name: userProfileData?.first_name ?? "",
      last_name: userProfileData?.last_name ?? "",
      email: userProfileData?.email ?? userRes.user.email ?? "",
      user_role: userRole,
      avatar: userProfileData?.avatar_url ?? "",
    };
  }

  console.log('Page User (local fetch):', userProfile);

  // Server-side cookie access using Next.js headers API
  const cookieStore = await nextCookies()
  const userRoleCookie = cookieStore.get('user-role')?.value
  console.log('Page Cookie for user-role:', userRoleCookie)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/dashboard/settings' },
        ]}
      />

      {/* Header */}
      <Header
        title="Settings"
        description="Gestione delle impostazioni generali e delle configurazioni e funzionalità dell'applicazione."
        icon={<Settings className="h-5 w-5" />}
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
