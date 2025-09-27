// app/dashboard/settings/page.tsx

import Link from 'next/link'
import { redirect } from "next/navigation";
//import { cookies as nextCookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Headset, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import PageTabs from '@/components/dashboard/pages/ui/PageTabs';
import GeneraliTab from '@/components/dashboard/pages/settings/GeneraliTab';
import AgenziaTab from '@/components/dashboard/pages/settings/AgenziaTab';
import NotificheTab from '@/components/dashboard/pages/settings/NotificheTab';
import MessaggiTab from '@/components/dashboard/pages/settings/MessaggiTab';
import UtentiTab from '@/components/dashboard/pages/settings/UtentiTabs';
import FrontSiteTab from '@/components/dashboard/pages/settings/FrontSiteTab';
import WebAppTab from '@/components/dashboard/pages/settings/WebAppTab';
import PwaTab from '@/components/dashboard/pages/settings/PwaTab';
import UserCookies from '@/components/shared/ssr/UserCookies';

//import type { UserProfile } from '@/types/UserProfile'; // Adjust the import path as needed


export interface UserProfile {
  id: string;
  first_name?: string;
  last_name: string;
  email: string;
  user_role?: string;
  avatar?: string;
}


export interface UserCookies {
  session_id: string;
  role_id?: string;
  id: string;
  user_auth: string;
  user_role?: string;
  email: string;
  email_verified: boolean;
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
  // Read and log cookies on the server (SSR)
  const userCookiesData = await UserCookies();
  console.log('Page userCookiesData from SSR component:', userCookiesData);

  
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
    const userRole = roles && roles.length > 0 ? roles[0].role : "guest";

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
  // const cookieStore = await nextCookies()

  // Retrieve specific cookies
  /* const sessionIdCookie = cookieStore.get('session-id')?.value
  const roleIdCookie = cookieStore.get('role-id')?.value
  const userIdCookie = cookieStore.get('user-id')?.value
  const userAuthCookie = cookieStore.get('user-auth')?.value
  const userRoleCookie = cookieStore.get('user-role')?.value
  const userEmailCookie = cookieStore.get('user-email')?.value
  const userEmailVerifiedCookie = cookieStore.get('user-email-verified')?.value */
  // console.log('Session ID Cookie:', sessionIdCookie);
  // console.log('User ID Cookie:', userIdCookie);
  // console.log('User Auth Cookie:', userAuthCookie);
  // console.log('User Role Cookie:', userRoleCookie);
  // console.log('User Email Cookie:', userEmailCookie);
  // console.log('User Email Verified Cookie:', userEmailVerifiedCookie);
  // console.log('User Avatar URL Cookie:', userAvatarUrlCookie);

  // create a new object with only the properties retrieved from the cookies
  /* const userProfileFromCookies: UserCookies = {
    session_id: sessionIdCookie!,
    id: userIdCookie!,
    email: userEmailCookie!,
    email_verified: userEmailVerifiedCookie === 'true',
    user_auth: userAuthCookie!,
    user_role: userRoleCookie!,
    role_id: roleIdCookie!
  };
  console.log('Page UserCookies from Page call:', userProfileFromCookies); */



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
