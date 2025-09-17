// components/dashboard/pages/configurations/RolesTab.tsx

import RolesTab from '@/components/dashboard/pages/configurations/rbac/RolesTab';
import PageInnerTabs from '../ui/PageInnerTabs';
import ResourcesTab from './rbac/ResourcesTab';
import ActionsTab from './rbac/ActionsTab';
import ScopesTab from './rbac/ScopesTab';
import PermissionsTab from './rbac/PermissionsTab';



const contentTabs = [
    {
    id: "roles",
    label: "Ruoli",
    content: <RolesTab />,
    },
    {
    id: "resources",
    label: "Risorse",
    content: <ResourcesTab />,
    },
    {
    id: "actions",
    label: "Azioni",
    content: <ActionsTab />,
    },
    {
    id: "scopes",
    label: "Scopes",
    content: <ScopesTab />,
    },
    {
    id: "permessi",
    label: "Permessi",
    content: <PermissionsTab />,
    }
];


export default function RbacTab() {
    return (
      <div className="mt-8 mb-8 pb-8">
        {/* Title and description */}
        <h2 className="text-xl font-bold mb-4">RBAC (Role-Based Access Control)</h2>
        <p className="mb-4 ">Gestione RBAC (Role-Based Access Control), include creazione dei ruoli e dei livelli di accesso, assegnamento dei permessi agli utenti per garantire l&apos;accesso controllato ai dati e alle funzionalità del sistema garantite da parte del ruolo assegnato all&apos;utente. Inoltre, la gestione degli utenti è responsabile della registrazione e dell&apos;autenticazione degli utenti nel sistema, inclusa la verifica delle credenziali fornite dall&apos;utente durante il login e l&apos;assegnazione dei ruoli appropriati in base al profilo dell&apos;utente. La gestione degli utenti può anche includere la gestione delle autorizzazioni per gli utenti, come ad esempio l&apos;impostazione di limiti sulle operazioni che possono essere effettuate da un utente specifico o la definizione di criteri di sicurezza per proteggere i dati sensibili.</p>

        {/* Tabs */}
        <PageInnerTabs tabs={contentTabs} defaultTab="roles" />
      </div>
    );
  }

