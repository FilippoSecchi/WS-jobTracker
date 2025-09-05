// app/onboarding/layout.tsx

import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col gap-12 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Work Space - Services Hub</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="w-full flex flex-col gap-12 max-w-7xl p-5">
          {children}
        </div>

        <footer className="w-full border-t mx-auto text-center text-xs gap-y-4 mt-8 py-10">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer noopener"
            >
              DryWire - Digital Solutions
            </a>
          </p>
          <p>&copy; 2025 Work Space. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </main>
  );
}
