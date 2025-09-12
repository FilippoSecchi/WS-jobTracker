// components/dashboard/pages/configurations/RolesTab.tsx

import CollaboratoriTab from '@/components/dashboard/pages/configurations/CollaboratoriTab';
import ClientiTab from '@/components/dashboard/pages/configurations/ClientiTab';
import WorkersTab from '@/components/dashboard/pages/configurations/WorkersTab';
import CandidatiTab from '@/components/dashboard/pages/configurations/CandidatiTab';
import PageInnerTabs from '../ui/PageInnerTabs';



const contentTabs = [
    {
    id: "gest-roles",
    label: "Ruoli",
    content: <CollaboratoriTab />,
    },
    {
    id: "gest-resources",
    label: "Risorse",
    content: <CollaboratoriTab />,
    },
    {
    id: "gest-actions",
    label: "Azioni",
    content: <CollaboratoriTab />,
    },
    {
    id: "gest-scopes",
    label: "Scopes",
    content: <CollaboratoriTab />,
    },
    {
    id: "gest-permessi",
    label: "Permessi Ruolo",
    content: <CollaboratoriTab />,
    },
    {
    id: "collaboratori",
    label: "Collaboratori",
    content: <CollaboratoriTab />,
    },
    {
    id: "clienti",
    label: "Clienti",
    content: <ClientiTab />,
    },
    {
    id: "workers",
    label: "Workers",
    content: <WorkersTab />,
    },
    {
    id: "candidati",
    label: "Candidati",
    content: <CandidatiTab />,
    }
];


export default function RolesTab() {
    return (
      <div className="mt-8 mb-8 pb-8">
        {/* Title and description */}
        <h2 className="text-xl font-bold mb-4">Ruoli e Permessi Utente</h2>
        <p className="mb-4 ">Gestione RBAC (Role-Based Access Control), include creazione dei ruoli e dei livelli di accesso, assegnamento dei permessi agli utenti per garantire l&apos;accesso controllato ai dati e alle funzionalità del sistema garantite da parte del ruolo assegnato all&apos;utente. Inoltre, la gestione degli utenti è responsabile della registrazione e dell&apos;autenticazione degli utenti nel sistema, inclusa la verifica delle credenziali fornite dall&apos;utente durante il login e l&apos;assegnazione dei ruoli appropriati in base al profilo dell&apos;utente. La gestione degli utenti può anche includere la gestione delle autorizzazioni per gli utenti, come ad esempio l&apos;impostazione di limiti sulle operazioni che possono essere effettuate da un utente specifico o la definizione di criteri di sicurezza per proteggere i dati sensibili.</p>

        {/* Tabs */}
        <PageInnerTabs tabs={contentTabs} defaultTab="collaboratori" />
      </div>
    );
  }

