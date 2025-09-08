// app/onboarding/page.tsx
import { redirect } from "next/navigation";
import { PersonalDataForm } from "@/components/onboarding/personal-data-form";
import { createClient } from "@/lib/supabase/server";
import DomicileDataForm from "@/components/onboarding/domicile-data-form";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  //console.log("User claims:", data.claims);
  
  // Get the user ID from JWT claims
  const userId = data.claims.sub as string;
  console.log('User id:', userId); 
  const userEmail = data.claims.email as string;
  console.log('User email:', userEmail);

  // Call RPC with a named parameter matching the function signature
  const { data: roles, error: rolesError } = await supabase.rpc('get_user_role', {
     p_user_id: userId,
  });

  if (rolesError) {
    console.error('Errore recupero ruolo utente:', rolesError.message);
  }

  const userRole = roles && roles.length > 0 ? roles[0].role : 'ospite';

  // console.log('User role:', roles);
  // console.log("User role:", roles[0]?.role);
  // console.log("User role:", roles.map(r => r.role).join(", "));



  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <div className="mt-4 mb-4 text-center">
          <h1 className="text-3xl font-bold">Onboarding Utente - Ruolo: {userRole}</h1>
          <label className="text-lg text-muted-foreground">Passo 1 di 3</label>
          <br />
          <h2 className="text-lg text-muted-foreground mt-4">
          Benvenuto {data?.claims?.email}, la tua registrazione è stata completata con successo, <br />
          Per procedere abbiamo bisogno che tu fornisca i tuoi dati personali. 
          <br />
          Completa il processo di onboarding per iniziare a utilizzare la piattaforma, è semplice e veloce, bastano pochi minuti!
          </h2>
        </div>
         </div>
      <div className="w-full flex flex-col">
        <PersonalDataForm className="w-full" userId={userId} userEmail={userEmail} />
      </div>
      <div className="w-full flex flex-col">
        <DomicileDataForm className="w-full" userId={userId} />
      </div>
    </div>
  );
}
