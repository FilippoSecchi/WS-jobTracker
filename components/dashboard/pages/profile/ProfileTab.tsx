// components/dashboard/pages/profile/ProfileTab.tsx

import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server'
import ProfileClient from './ProfileClient'

export interface UserProfileDb {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
}

// Server component: fetch minimal data and pass to client component
export default async function ProfileTab() {
  const supabase = await createClient();

  // Ensure authenticated user
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims || !claimsData.claims.sub || !claimsData.claims.email || !claimsData.claims.aud || claimsData.claims.aud !== 'authenticated') {
    redirect("/auth/login");
  }

  // Fetch user and profile
  const { data: userRes } = await supabase.auth.getUser();
  let base: UserProfileDb | null = null;
  let role: string = 'ospite';

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
    skills: [], // Add default empty skills array
  };

  const viewModel = {
    id: base?.id ?? '',
    firstName: base?.first_name ?? '',
    lastName: base?.last_name ?? '',
    email: base?.email ?? '',
    avatar: base?.avatar_url ?? '',
    role,
    ...dummyData,
  };

  return <ProfileClient profile={viewModel} />;
}