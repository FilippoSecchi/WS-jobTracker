//import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { UserProfile } from "@/components/dashboard/NavbarProfile";
import { Message } from "@/components/dashboard/NavbarMessages";
import { Notification } from "@/components/dashboard/NavbarNotifications";
import { injectUserToChildren } from "@/lib/injectUser";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();
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
      id: user.id,
      first_name: userProfileData?.first_name ?? "",
      last_name: userProfileData?.last_name ?? "",
      email: userProfileData?.email ?? user.email,
      user_role: userRole,
      avatar: userProfileData?.avatar_url ?? "",
    };
  }

  const notifications: Notification[] = [
    { id: 1, message: "Nuovo messaggio da cliente", time: "5 min fa" },
    { id: 2, message: "Aggiornamento sistema completato", time: "1 ora fa" },
  ];

  const messages: Message[] = [
    { id: 1, from: "Cliente ABC", message: "Quando sarà pronto il progetto?", time: "10 min fa" },
    { id: 2, from: "Team Dev", message: "Review codice completata", time: "30 min fa" },
  ];
  
  // clona tutti i children aggiungendo user
  const childrenWithUser = injectUserToChildren(children, userProfile);
  //console.log(userProfile);
  //console.log(children);
  /* if (Array.isArray(childrenWithUser) && childrenWithUser.length > 0 && childrenWithUser[0]?.props) {
    console.log('Layout data', childrenWithUser[0].props.user);
  } else if (childrenWithUser && typeof childrenWithUser === 'object' && 'props' in childrenWithUser) {
    // If childrenWithUser is a single ReactElement
    console.log('Layout single element data', (childrenWithUser as React.ReactElement<{ user?: UserProfile }>).props.user);
  } */

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <DashboardShell
        user={userProfile ?? { id: "", last_name: "", email: "", avatar: "" }}
        messages={messages}
        notifications={notifications}
      >        
        {childrenWithUser}
      </DashboardShell>
    </ThemeProvider>
  );
}
