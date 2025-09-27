// components/dashboard/pages/configurations/GeneraliTab.tsx

  
  import PageInnerTabs from '../ui/PageInnerTabs';
  import StyleTab from './general/StyleTab';
  
  
  
  const contentTabs = [
      {
      id: "style",
      label: "Stile Etichette",
      content: <StyleTab />,
      },
  ];
  
  
  export default function GeneraliTab() {
      return (
        <div className="mt-8 mb-8 pb-8">
  
          {/* Tabs */}
          <PageInnerTabs tabs={contentTabs} defaultTab="style" />
        </div>
      );
    }
  
  