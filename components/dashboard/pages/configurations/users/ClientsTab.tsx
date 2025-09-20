// components/dashboard/pages/configurations/users/ClientsTab.tsx


'use client'

import { useEffect, useState } from 'react'
import { rolesColumns, AppRolesType } from '@/components/dashboard/pages/configurations/rbac/columns/rolesCols'
import { DataTable } from '@/components/shared/data-table/data-table'
import { Spinner } from '@/components/ui/shadcn-io/spinner';

type ClientsTabProps = {
  activeTab?: boolean
}

export default function ClientsTab({ activeTab = false }: ClientsTabProps) {
  const [app_roles, setAppRoles] = useState<AppRolesType[]>([])
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
      <div className="mt-8 mb-0">
        <h2 className="text-xl font-bold mb-4">Gestione Ruoli Applicazione</h2>
        <p>Gestione completa dei ruoli applicazione.</p>
      </div>
      <div className="mb-8">
        {loading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner className="text-violet-800 dark:text-violet-500" key={"bars"} variant={"bars"} />
              <p>Loading...</p>
            </div>
        ) : (
          <DataTable columns={rolesColumns} data={app_roles} />
        )}
      </div>
    </>
  )
}