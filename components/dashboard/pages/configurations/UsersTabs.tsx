// components/dashboard/pages/configurations/UsersTabs.tsx


import PageInnerTabs from '../ui/PageInnerTabs';
import StaffTab from './users/StaffTab';
import ClientsTab from './users/ClientsTab';
import WorkersTab from './users/WorkersTab';
import CandidatesTab from './users/CandidatesTab';



const contentTabs = [
    {
    id: "Staff",
    label: "Collaboratori",
    content: <StaffTab activeTab={false} />,
    },
    {
    id: "clients",
    label: "Clienti",
    content: <ClientsTab activeTab={false} />,
    },
    {
    id: "workers",
    label: "Workers",
    content: <WorkersTab activeTab={false} />,
    },
    {
    id: "candidates",
    label: "Candidati",
    content: <CandidatesTab activeTab={false} />,
    }
];

  


export default function UsersTabs() {
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