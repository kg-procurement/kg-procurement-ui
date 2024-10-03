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

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("should forward ref to TabsList correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={ref}>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should forward ref to TabsTrigger correctly", () => {
    const ref = React.createRef<HTMLButtonElement>(); 
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger ref={ref} value="tab1">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("should forward ref to TabsContent correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent ref={ref} value="tab1">
          Content 1
        </TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
