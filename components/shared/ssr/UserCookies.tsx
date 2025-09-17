// components/shared/ssr/UserCookies.tsx

import { cookies } from 'next/headers'

export interface UserCookies {
  session_id: string;
  role_id?: string;
  id: string;
  user_auth: string;
  user_role?: string;
  email: string;
  email_verified: boolean;
}

// SSR utility: read cookies on the server and return a normalized object
export default async function UserCookies(): Promise<UserCookies> {
  // Server-side cookie access using Next.js headers API (sync)
  const cookieStore = await cookies();

  // Retrieve specific cookies
  const sessionIdCookie = cookieStore.get('session-id')?.value;
  const roleIdCookie = cookieStore.get('role-id')?.value;
  const userIdCookie = cookieStore.get('user-id')?.value;
  const userAuthCookie = cookieStore.get('user-auth')?.value;
  const userRoleCookie = cookieStore.get('user-role')?.value;
  const userEmailCookie = cookieStore.get('user-email')?.value;
  const userEmailVerifiedCookie = cookieStore.get('user-email-verified')?.value;

  // Build result
  const userCookies: UserCookies = {
    session_id: sessionIdCookie!,
    id: userIdCookie!,
    email: userEmailCookie!,
    email_verified: userEmailVerifiedCookie === 'true',
    user_auth: userAuthCookie!,
    user_role: userRoleCookie!,
    role_id: roleIdCookie!,
  };

  // Optional: also log here (still SSR)
  //console.log('Shared SSR Cookies:', userCookies);

  return userCookies;
}