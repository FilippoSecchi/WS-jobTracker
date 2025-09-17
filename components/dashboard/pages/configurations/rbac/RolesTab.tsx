// components/dashboard/pages/configurations/RolesTab.tsx

import UserCookies from '@/components/shared/ssr/UserCookies';
import { columns, UserCookiesType } from '@/components/shared/data-table/columns';
import { DataTable } from '@/components/shared/data-table/data-table';



export default async function RolesTab() {
  
    // Read and log cookies on the server (SSR)
    const userCookiesData: UserCookiesType = await UserCookies();

    return (
      <>
      <div className="mt-8 mb-8 pb-8">
        {/* Title and description */}
        <h2 className="text-xl font-bold mb-4">Gestione Ruoli Applicazione</h2>
        <p className="mb-4 ">Gestione completa dei ruoli applicazione.</p>
      </div>

      <div className="mt-8 mb-8 pb-8">
        {/* DataTable expects an array */}
        <DataTable columns={columns} data={[userCookiesData]} />
      </div>
      </>
    );
  }

