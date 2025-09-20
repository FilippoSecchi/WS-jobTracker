// components/dashboard/pages/ui/PageTabs.tsx
"use client";

import { useState, ReactNode, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface PageTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function PageTabs({
  tabs,
  defaultTab,
  onTabChange,
}: PageTabsProps) {
  const safeDefault = defaultTab && tabs.some(t => t.id === defaultTab)
    ? defaultTab
    : tabs[0]?.id;

  const [activeTab, setActiveTab] = useState<string>(safeDefault);

  // se cambia defaultTab, aggiornalo
  useEffect(() => {
    if (defaultTab && tabs.some(t => t.id === defaultTab)) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, tabs]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // Dynamically determine grid columns based on tabs count
  const getGridClass = () => {
    switch (tabs.length) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      case 6:
        return 'grid-cols-6';
      case 7:
        return 'grid-cols-7';
      case 8:
        return 'grid-cols-8';
      case 8:
        return 'grid-cols-8';
      case 9:
        return 'grid-cols-9';
      case 10:
        return 'grid-cols-10';
      case 11:
        return 'grid-cols-11';
      case 12:
        return 'grid-cols-12';
      default:
        return 'grid-cols-4';
    }
  };


  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="space-y-4"
    >
      <TabsList className={cn("grid w-full h-12'", getGridClass())}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

