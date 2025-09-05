// components/dashboard/pages/PrimaryTab.tsx
export default function PrimaryTab() {
  return (
    <div className="mt-8 mb-8 pb-8 border-b">
      <h2>Primary Tab</h2>
      <p>Qui ci metti i contenuti del tab primario.</p>
    </div>
  );
}

/* import { useState } from 'react';
import {
  Star,
  Calendar,
  Eye,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/components/ui/use-toast';
import { ReactNode } from 'react';

// Position colors mapping
const positionColors: Record<string, string> = {
  Cuoco: '#4CAF50',
  Cameriere: '#2196F3',
  Barista: '#9C27B0',
  Coordinatore: '#FF9800',
  Assistente: '#607D8B'
};

// Default color for positions not in the mapping
const defaultPositionColor = '#6E59A5';

// Mock data for active workers
const mockActiveWorkers = [
  {
    id: '1',
    nome: 'Marco',
    cognome: 'Rossi',
    email: 'marco.rossi@example.com',
    posizione: 'Coordinatore',
    servizi: 24,
    valutazione: 4.8,
    avatar: '',
    ultimoServizio: '2025-05-02'
  },
  {
    id: '2',
    nome: 'Anna',
    cognome: 'Bianchi',
    email: 'anna.bianchi@example.com',
    posizione: 'Assistente',
    servizi: 18,
    valutazione: 4.5,
    avatar: '',
    ultimoServizio: '2025-05-03'
  },
  {
    id: '3',
    nome: 'Alessio',
    cognome: 'Romano',
    email: 'alessio.romano@example.com',
    posizione: 'Cameriere',
    servizi: 32,
    valutazione: 4.9,
    avatar: '',
    ultimoServizio: '2025-05-01'
  },
  {
    id: '4',
    nome: 'Sofia',
    cognome: 'Ricci',
    email: 'sofia.ricci@example.com',
    posizione: 'Cameriere',
    servizi: 12,
    valutazione: 4.3,
    avatar: '',
    ultimoServizio: '2025-04-28'
  },
  {
    id: '5',
    nome: 'Luca',
    cognome: 'Esposito',
    email: 'luca.esposito@example.com',
    posizione: 'Cuoco',
    servizi: 28,
    valutazione: 4.7,
    avatar: '',
    ultimoServizio: '2025-05-04'
  },
  {
    id: '6',
    nome: 'Giulia',
    cognome: 'Martini',
    email: 'giulia.martini@example.com',
    posizione: 'Barista',
    servizi: 15,
    valutazione: 4.6,
    avatar: '',
    ultimoServizio: '2025-04-30'
  },
  {
    id: '7',
    nome: 'Roberto',
    cognome: 'Ferrari',
    email: 'roberto.ferrari@example.com',
    posizione: 'Cameriere',
    servizi: 22,
    valutazione: 4.4,
    avatar: '',
    ultimoServizio: '2025-05-02'
  },
  {
    id: '8',
    nome: 'Francesca',
    cognome: 'Russo',
    email: 'francesca.russo@example.com',
    posizione: 'Cuoco',
    servizi: 29,
    valutazione: 4.9,
    avatar: '',
    ultimoServizio: '2025-05-05'
  },
  {
    id: '9',
    nome: 'Paolo',
    cognome: 'Marino',
    email: 'paolo.marino@example.com',
    posizione: 'Barista',
    servizi: 16,
    valutazione: 4.2,
    avatar: '',
    ultimoServizio: '2025-04-29'
  }
];

const getInitials = (nome: string, cognome: string) => {
  return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
};

const ActiveTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define table headers
  const headers = {
    worker: 'Lavoratore',
    position: 'Ruolo',
    services: 'Servizi',
    rating: 'Valutazione',
    lastService: 'Ultimo Servizio',
    actions: 'Azioni'
  };

  // Create rows for DataTable
  const tableRows = mockActiveWorkers.map((worker) => ({
    id: worker.id,
    worker: (
      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage src={worker.avatar} />
          <AvatarFallback>
            {getInitials(worker.nome, worker.cognome)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className='font-medium'>
            {worker.nome} {worker.cognome}
          </div>
          <div className='text-sm text-muted-foreground'>{worker.email}</div>
        </div>
      </div>
    ),
    position: (
      <Badge
        variant='outline'
        className='font-normal px-3 py-0.5 text-white dark:text-white'
        style={{
          backgroundColor:
            positionColors[worker.posizione] || defaultPositionColor,
          borderColor: positionColors[worker.posizione] || defaultPositionColor
        }}
      >
        {worker.posizione}
      </Badge>
    ),
    services: worker.servizi,
    rating: (
      <div className='flex items-center justify-center'>
        {worker.valutazione}
        <Star className='h-4 w-4 text-yellow-500 ml-1' fill='currentColor' />
      </div>
    ),
    lastService: (
      <div className='flex items-center'>
        <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
        <span>{worker.ultimoServizio}</span>
      </div>
    ),
    actions: (
      <Button
        variant='ghost'
        size='icon'
        onClick={() => viewWorkerDetails(worker.id)}
      >
        <Eye className='h-4 w-4' />
      </Button>
    )
  }));

  // Filter rows based on search query and position filter
  const filteredRows = tableRows.filter((row) => {
    // Get the worker data
    const workerData = mockActiveWorkers.find((w) => w.id === row.id);
    if (!workerData) return false;

    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      workerData.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workerData.cognome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workerData.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workerData.posizione.toLowerCase().includes(searchQuery.toLowerCase());

    // Position filter
    const matchesPosition =
      positionFilter === '' || workerData.posizione === positionFilter;

    return matchesSearch && matchesPosition;
  });

  const viewWorkerDetails = (workerId: string) => {
    navigate(`/dashboard/workers/${workerId}`);
  };

  const handleDeleteSelected = (selectedRows: Record<string, ReactNode>[]) => {
    toast({
      title: 'Eliminazione Workers',
      description: `Stai per eliminare ${selectedRows.length} workers selezionati.`
    });
  };

  // Get unique positions for filtering
  const positions = Array.from(
    new Set(mockActiveWorkers.map((worker) => worker.posizione))
  );

  return (
    <div className='space-y-6'>
      <DataTable
        title='Workers Attivi'
        description='Tutti i workers attivi registrati nel sistema'
        headers={headers}
        rows={filteredRows}
        search={{
          placeholder: 'Cerca workers...',
          searchValue: searchQuery,
          setSearchValue: setSearchQuery,
          keyToSearchBy: 'worker'
        }}
        sort={{
          defaultProperty: 'worker'
        }}
        filterBy={['position']}
        showSortingButtons
        enableStripedRows
        pagination={{ rowsPerPage: 10 }}
        onRowClick={(row: { id: string }) => viewWorkerDetails(row.id)}
        clickableColumns={['worker']}
        callToAction={
          <Button
            variant='outline'
            onClick={() => {
              console.log('Call to action clicked');
            }}
          >
            <FileText className='mr-2 h-4 w-4' />
            Esporta PDF
          </Button>
        }
      />
    </div>
  );
};

export default ActiveTab;
 */