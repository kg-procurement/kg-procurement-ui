"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = () => (
  <TabsPrimitive.List />
);

const TabsTrigger = () => (
  <TabsPrimitive.Trigger />
);

// Modified TabsContent: Removed React.forwardRef
const TabsContent = () => (
  <TabsPrimitive.Content />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
