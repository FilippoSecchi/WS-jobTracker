// components/dashboard/pages/configurations/StyleTab.tsx

'use client'

import { useEffect, useState } from 'react'
import { styleColumns, AppStyleType } from '@/components/dashboard/pages/configurations/general/columns/styleCols'
import { DataTable } from '@/components/shared/data-table/data-table'
import { Spinner } from '@/components/ui/shadcn-io/spinner';

type StyleTabProps = {
  activeTab?: boolean
}


export default function StyleTab({ activeTab = false }: StyleTabProps) {
  const [labelStyle, setLabelStyle] = useState<AppStyleType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab && labelStyle.length === 0) {
      setLoading(true)
      fetch('/api/configurations/general/style') // Create this API route to fetch roles from the server
        .then(res => res.json())
        .then(data => setLabelStyle(data))
        .finally(() => setLoading(false))
    }
  }, [activeTab])

  return (
    <>
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-bold mb-4">Stili Etichette Applicazione</h2>
        <p className="mb-4 ">Impostazione dello stile grafico per le Etichette utilizzate dell&apos; applicazione.</p>
      </div>
      <div>
        {loading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner className="text-violet-800 dark:text-violet-500" key={"bars"} variant={"bars"} />
              <p>Loading...</p>
            </div>
        ) : (
          <DataTable columns={styleColumns} data={labelStyle} />
        )}
      </div>
    </>
  )
}

