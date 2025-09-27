// components/dashboard/pages/ui/PageTabs.tsx
"use client";

import React, { useState, useEffect, isValidElement, cloneElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactElement<{ activeTab?: boolean }>;
}

interface PageTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function PageInnerTabs({
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
    //const length = tabs.length;
    return `w-full`;
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

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const content = isValidElement(tab.content)
          ? cloneElement(tab.content, { activeTab: isActive })
          : tab.content;
        return (
          <TabsContent key={tab.id} value={tab.id}>
            {content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
