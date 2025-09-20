// components/dashboard/pages/configurations/ActionsTab.tsx

'use client'

import { useEffect, useState } from 'react'
import { actionsColumns, AppActionsType } from '@/components/dashboard/pages/configurations/rbac/columns/actionsCols'
import { DataTable } from '@/components/shared/data-table/data-table'
import { Spinner } from '@/components/ui/shadcn-io/spinner';

type ActionsTabProps = {
  activeTab?: boolean
}



export default function ActionsTab({ activeTab = false }: ActionsTabProps) {
  const [app_roles, setAppRoles] = useState<AppActionsType[]>([])
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
          <DataTable columns={actionsColumns} data={app_roles} />
        )}
      </div>
    </>
  )
}
