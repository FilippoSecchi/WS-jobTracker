// components/dashboard/pages/settings/UsersTab.tsx

import CollaboratoriTab from './CollaboratoriTab';
import ClientiTab from './ClientiTab';
import WorkersTab from './WorkersTab';
import CandidatiTab from './CandidatiTab';
import PageInnerTabs from '../ui/PageInnerTabs';



const contentTabs = [
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

  


export default function UsersTab() {
    return (
      <div className="mt-8 mb-8 pb-8">
        {/* Title and description */}
        <div className="mb-8">
            <h2>Configurazione Utenti</h2>
            <p>Qui ci metti i contenuti del tab primario.</p>
        </div>

        {/* Tabs */}
        <PageInnerTabs tabs={contentTabs} defaultTab="collaboratori" />
      </div>
    );
  }