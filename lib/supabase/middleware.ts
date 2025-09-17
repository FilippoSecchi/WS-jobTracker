// lib/supabase/middleware.ts

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  //console.log("User in middleware:", user);
  
  const sessionId = data?.claims['session_id']; 
  const userId = data?.claims['sub']; 
  const userAuth = data?.claims['aud']; 
  const userEmail = data?.claims['email'];
  const userEmailVerified = data?.claims?.user_metadata['email_verified'];   
  //console.log("User ID:", userId);

  // Call RPC with a named parameter matching the function signature
  const { data: roles, error: rolesError } = await supabase.rpc('get_user_role', {
    p_user_id: userId,
  });
  //console.log("Roles:", roles);

  if (rolesError) {
    console.error('Errore recupero ruolo utente:', rolesError.message);
  }

  const userRole = roles && roles.length > 0 ? roles[0].role : 'guest';
  //console.log("User role:", userRole);
  const roleID = roles && roles.length > 0 ? roles[0].role_id : '';
  //console.log("Role ID:", roleID);

  

  // 👉 setti direttamente sul supabaseResponse
  // add userid, first_name last_name, email to the cookies other then user-role
  if(user){
    supabaseResponse.cookies.set("session-id", sessionId ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    supabaseResponse.cookies.set("user-id", userId ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    }); 
    supabaseResponse.cookies.set(
      "user-auth",
      Array.isArray(userAuth) ? userAuth.join(",") : userAuth ?? "",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1 ora
      }
    );
    supabaseResponse.cookies.set("role-id", roleID ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    supabaseResponse.cookies.set("user-role", userRole ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    supabaseResponse.cookies.set("user-email", userEmail ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    supabaseResponse.cookies.set("user-email-verified", userEmailVerified?.toString() ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    /* supabaseResponse.cookies.set("user-first-name", userFirstName, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    });
    supabaseResponse.cookies.set("user-last-name", userLastName, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ora
    }); */
  }

  //console.log("Set cookie user-role:", response.cookies.get("user-role")?.value);
  


  // If you need to make any changes to the response, do so on the
  // supabaseResponse object. Do not create a new response object.
  // If you create a new response object, you will break the auth
  // flow and your users will be logged out.
  
  

  if (
    request.nextUrl.pathname !== "/" &&
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
