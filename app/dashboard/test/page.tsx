// app/dashboard/test/page.tsx
// A simple test page to verify Supabase connection and query the 'test' table
import Link from 'next/link'
import { redirect } from "next/navigation";
import { Headset, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/dashboard/pages/ui/Header'
import PageBreadcrumb from '@/components/dashboard/pages/ui/PageBreadcrumb'
import { createClient } from '@/lib/supabase/server'
import AddressFormSelect from '@/components/shared/form/AddressFormSelect'
import InviteDialog from '@/components/dashboard/dialogs/InviteDialog'
import PageTabs from '@/components/dashboard/pages/ui/PageTabs';
import PrimaryTab from '@/components/dashboard/pages/test/tabs/PrimaryTab';
import SecondaryTab from "@/components/dashboard/pages/test/tabs/SecondaryTab";
import TertiaryTab from "@/components/dashboard/pages/test/tabs/TertiaryTab";


const contentTabs = [
  {
    id: "primaryTab",
    label: "Primary",
    content: <PrimaryTab />,
  },
  {
    id: "secondaryTab",
    label: "Secondary",
    content: <SecondaryTab />,
  },
  {
    id: "tertiaryTab",
    label: "Tertiary",
    content: <TertiaryTab />,
  },
];


export default async function TestPage() {
  /* const [activeTab, setActiveTab] = useState('active');
 */
  const supabase = await createClient()
  
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims || !data.claims.sub || !data.claims.email || !data.claims.aud || data.claims.aud !== 'authenticated') {
      redirect("/auth/login");
    }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'test', href: '/dashboard/test' },
        ]}
      />

      {/* Header */}
      <Header
        title="Test"
        description="Pagina di test per verificare la connessione a Supabase e RBAC con claims."
        icon={<Code className="h-5 w-5" />}
        actions={[
          <InviteDialog key="invite" />, // Client-side dialog with its own state
          <Button key="help-center" asChild>
            <Link href="/dashboard/help">
              <Headset className="h-4 w-4 mr-2" />
              Help Center
            </Link>
          </Button>,
        ]}
      />

      <PageTabs tabs={contentTabs} defaultTab="primaryTab" />

      <AddressFormSelect />

      {/* Supabase claims data */}
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="w-full">
          <pre>
            {JSON.stringify(data.claims, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
