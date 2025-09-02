// app/dashboard/test/page.tsx
// A simple test page to verify Supabase connection and query the 'test' table
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button'
import {
  Users,
  Headset
} from 'lucide-react'
import Header from '@/components/dashboard/pages/Header'
import Link from 'next/link'
import PageBreadcrumb from '@/components/dashboard/pages/PageBreadcrumb';
import { createClient } from "@/lib/supabase/server";
import AddressFormSelect from "@/components/shared/form/AddressFormSelect";

export default async function TestPage() {
  const supabase = await createClient();
  const { data: test } = await supabase.from('test').select()
  /* const { data: claims, error } = await supabase.auth.getClaims();
    if (error || !claims?.claims) {
      redirect("/auth/login");
    } */
    //console.log("User claims:", claims.claims);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        links={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'test', href: '/dashboard/test' }
        ]}
      />

      {/* Header */}
      <Header
        title='Test'
        description='Pagina di test per verificare la connessione a Supabase e RBAC con claims.'
        icon={<Users className='h-5 w-5' />}
        actions={[          
          <Button key='help-center' asChild>
            <Link href='/dashboard/help'>
              <Headset className='h-4 w-4 mr-2' />
              Help Center
            </Link>
          </Button>
        ]}
      />

      <AddressFormSelect />


      
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </div>
    </div>


      
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        {/* <pre>{JSON.stringify(claims.claims, null, 2)}</pre> */}
      </div>
    </div>

    </div>
  )
}