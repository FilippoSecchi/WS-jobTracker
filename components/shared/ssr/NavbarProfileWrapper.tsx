// components/shared/ssr/NavbarProfileWrapper.tsx

import { cookies } from "next/headers";
import NavbarProfile, { type UserProfile } from "@/components/dashboard/NavbarProfile";

interface NavbarProfileWrapperProps {
  //user: UserProfile;
  onLogout?: () => void;
}

export default async function NavbarProfileWrapper({
  //user,
  onLogout,
}: NavbarProfileWrapperProps) {
  // Lettura sicura lato server
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("user-id")?.value ?? "guest";
  const userRoleCookie = cookieStore.get("user-role")?.value ?? "guest";
  const userEmailCookie = cookieStore.get("user-email")?.value ?? "guest";

  const enrichedUser: UserProfile = {
    //...user,
    user_id: userIdCookie,
    user_role: userRoleCookie,
    user_email: userEmailCookie,
  };

  return <NavbarProfile user={enrichedUser} onLogout={onLogout} />;
}
