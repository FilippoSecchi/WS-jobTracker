// components/dashboard/pages/configurations/FrontSiteTab.tsx

import CollaboratoriTab from '@/components/dashboard/pages/configurations/CollaboratoriTab';
import ClientiTab from '@/components/dashboard/pages/configurations/ClientiTab';
import WorkersTab from '@/components/dashboard/pages/configurations/WorkersTab';
import CandidatiTab from '@/components/dashboard/pages/configurations/CandidatiTab';
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


export default function FrontSiteTab() {
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