// components/dashboard/pages/configurations/ScopesTab.tsx

'use client'

import { useEffect, useState } from 'react'
import { scopesColumns, AppScopesType } from '@/components/dashboard/pages/configurations/rbac/columns/scopesCols'
import { DataTable } from '@/components/shared/data-table/data-table'
import { Spinner } from '@/components/ui/shadcn-io/spinner';

type ScopesTabProps = {
  activeTab?: boolean
}


export default function ScopesTab({ activeTab = false }: ScopesTabProps) {
  const [app_roles, setAppRoles] = useState<AppScopesType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab && app_roles.length === 0) {
      setLoading(true)
      fetch('/api/configurations/roles') // Create this API route to fetch roles from the server
        .then(res => res.json())
        .then(data => setAppRoles(data))
        .finally(() => setLoading(false))
    }
  }, [activeTab])

  return (
    <>
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-bold mb-4">Gestione Ruoli Applicazione</h2>
        <p className="mb-4 ">Gestione completa dei ruoli applicazione.</p>
      </div>
      <div>
        {loading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner className="text-violet-800 dark:text-violet-500" key={"bars"} variant={"bars"} />
              <p>Loading...</p>
            </div>
        ) : (
          <DataTable columns={scopesColumns} data={app_roles} />
        )}
      </div>
    </>
  )
}

