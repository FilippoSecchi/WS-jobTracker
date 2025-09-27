// app/dashboard/settings/page.tsx

import Link from 'next/link'
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server'
import { Headset, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import ProfileClient from '@/components/dashboard/pages/profile/ProfileClient';
import UserCookies from '@/components/shared/ssr/UserCookies';

//import type { UserProfile } from '@/types/UserProfile'; // Adjust the import path as needed

 
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name: string;
  email: string;
  user_role?: string;
  avatar?: string;
  avatar_url?: string;
}




export default async function ProfilePage() {
  const supabase = await createClient();

  // Ensure authenticated user
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims || !claimsData.claims.sub || !claimsData.claims.email || !claimsData.claims.aud || claimsData.claims.aud !== 'authenticated') {
    redirect("/auth/login");
  }

  // Fetch user and profile
  const { data: userRes } = await supabase.auth.getUser();
  let base: UserProfile | null = null;
  let role: string = 'guest';

  if (userRes?.user) {
    const userId = userRes.user.id;
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("id, first_name, last_name, email, avatar_url")
      .eq("id", userId)
      .single();

    base = profile ?? {
      id: userId,
      first_name: '',
      last_name: '',
      email: userRes.user.email ?? '',
      avatar_url: ''
    };

    const { data: roles } = await supabase.rpc("get_user_role", { p_user_id: userId });
    role = roles && roles.length > 0 ? roles[0].role : "guest";
  }

  // Compose normalized view model for client
  const dummyData = {
    phone: '',
    location: '',
    jobTitle: '',
    bio: '',
    joinDate: '',
    // Dummy skills from server
    skills: [
      'React',
      'TypeScript',
      'Tailwind CSS',
    ],
  };

  const viewModel = {
    id: base?.id ?? '',
    firstName: base?.first_name ?? '',
    lastName: base?.last_name ?? '',
    email: base?.email ?? '',
    //avatar: base?.avatar_url ?? '',
    avatar: base?.avatar_url ?? '',
    role,
    ...dummyData,
    joinDate: dummyData.joinDate || new Date().toLocaleDateString('it-IT'),
  };
  

  

  // Read and log cookies on the server (SSR)
  const userCookiesData = await UserCookies();
  console.log('Page - userCookiesData from SSR component:', userCookiesData);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Il mio Profilo', href: '/dashboard/profile' },
        ]}
      />

      {/* Header */}
      <Header
        title="Il mio Profilo"
        description="Gestione Profilo personale, preferenze e impostazioni dell'applicazione."
        icon={<User className="h-5 w-5" />}
        actions={[
          <Button key="help-center" asChild>
            <Link href="/dashboard/help">
              <Headset className="h-4 w-4 mr-2" />
              Help Center
            </Link>
          </Button>,
        ]}
      />

      {/* Content */}
      <ProfileClient profile={viewModel} />

    </div>
  )
}
