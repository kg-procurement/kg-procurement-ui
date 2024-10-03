"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List {...props} />
);

const TabsTrigger = ({ ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger {...props} />
);

const TabsContent = ({ ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
