// app/dashboard/settings/page.tsx

import Link from 'next/link'
import { redirect } from "next/navigation";
import { cookies as nextCookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Headset, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import PageTabs from '@/components/dashboard/pages/ui/PageTabs';
import ProfileTab from '@/components/dashboard/pages/profile/ProfileTab';
import PreferencesTab from '@/components/dashboard/pages/profile/preferences';
import SecondaryTab from '@/components/dashboard/pages/test/tabs/SecondaryTab';

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
    id: "profile",
    label: "Profilo",
    content: <ProfileTab />,
  },
  {
    id: "preferences",
    label: "Impostazioni",
    content: <PreferencesTab />,
  },
  {
    id: "security",
    label: "Sicurezza",
    content: <SecondaryTab />,
  },
];




export default async function ProfileSettingsPage() {
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
      const cookieStore = await nextCookies()
      const userRoleCookie = cookieStore.get('user-role')?.value
      console.log('Page Cookie for user-role:', userRoleCookie)


  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Il mio Profilo', href: '/dashboard/profile' },
          { label: 'Impostazioni Account', href: '/dashboard/profile/settings' },
        ]}
      />

      {/* Header */}
      <Header
        title="Impostazioni Account"
        description="Gestione Profilo personale, preferenze e impostazioni dell'applicazione."
        icon={<UserCog className="h-5 w-5" />}
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
      <PageTabs tabs={contentTabs} defaultTab="profile" />

    </div>
  )
}
