// app/dashboard/layout.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { UserProfile } from "@/components/dashboard/NavbarProfile";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Job Tracker",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();
  
  // check authentication
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims || !data.claims.sub || !data.claims.email || !data.claims.aud || data.claims.aud !== 'authenticated') {
    redirect("/auth/login");
  }
  
  // get user profile and role
  const { data: { user } } = await supabase.auth.getUser();
  let userProfile: UserProfile | null = null;

  if (user) {
    // query profilo
    const { data: userProfileData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // query ruolo (via rpc)
    const { data: roles } = await supabase.rpc("get_user_role", {
      p_user_id: user.id,
    });

    const userRole = roles && roles.length > 0 ? roles[0].role : "ospite";

    userProfile = {
      //id: user.id,
      first_name: userProfileData?.first_name ?? "",
      last_name: userProfileData?.last_name ?? "",
      email: userProfileData?.email ?? user.email,
      user_role: userRole,
      avatar: userProfileData?.avatar_url ?? "",
    };
  }


  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <DashboardShell
        user={userProfile ?? { first_name: "", last_name: "", email: "", user_role: "guest", avatar: "" }}      
        > 
        <Toaster className="z-999" />       
        {children}
      </DashboardShell>
    </ThemeProvider>
  );
}
