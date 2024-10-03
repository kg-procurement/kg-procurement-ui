import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index.tsx"; // Adjust the import path
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Tabs Component", () => {
  it("renders Tabs, TabsList, TabsTrigger, and TabsContent correctly", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" id="trigger-tab1">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" id="trigger-tab2">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" id="content-tab1">
          Content 1
        </TabsContent>
        <TabsContent value="tab2" id="content-tab2">
          Content 2
        </TabsContent>
      </Tabs>,
    );
    const contentTab2 = document.getElementById("content-tab2");

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
  
});
