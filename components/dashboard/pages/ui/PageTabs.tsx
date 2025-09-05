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

  const getGridClass = () => {
    const length = tabs.length;
    return `grid-cols-${Math.min(length, 8)}`;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="space-y-4"
    >
      <TabsList className={cn("grid w-full", getGridClass())}>
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




/* import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function PageTabs() {
  return (
    <div className="pt-0 pb-4">
      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
            <Label htmlFor="tabs-demo-name">Name</Label>
          <Card >
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} */






/* import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  path: string;
}

interface PageTabsProps {
  children: ((props: { id: string }) => ReactNode) | ReactNode;
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

export function PageTabs({
  children,
  tabs,
  defaultTab,
  onTabChange
}: PageTabsProps) {
    const pathname = usePathname()
    const router = useRouter()

    // trova il tab iniziale basato sulla URL corrente
    const initialTab =
      tabs.find((tab) => pathname.startsWith(tab.path))?.id ||
      defaultTab ||
      tabs[0]?.id
  
    const [activeTab, setActiveTab] = useState<string>(initialTab)
  
    // aggiorna se cambia l'URL (es. navigazione diretta)
    useEffect(() => {
      const matchedTab = tabs.find((tab) => pathname.startsWith(tab.path))
      if (matchedTab && matchedTab.id !== activeTab) {
        setActiveTab(matchedTab.id)
      }
    }, [pathname, tabs, activeTab])
  
    const handleTabChange = (tab: string) => {
      setActiveTab(tab)
  
      const selectedTab = tabs.find((t) => t.id === tab)
      if (selectedTab) {
        router.push(selectedTab.path)
      }
  
      if (onTabChange) {
        onTabChange(tab)
      }
    }
  
    const getGridClass = () => {
      const length = tabs.length
      return `grid-cols-${Math.min(length, 8)}`
    }

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className='space-y-4'
    >
      <TabsList className={cn('grid w-full h-12', getGridClass())}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className='mt-6'>
        {typeof children === 'function'
          ? children({ id: activeTab })
          : children}
      </TabsContent>
    </Tabs>
  );
}

export default PageTabs;
 */