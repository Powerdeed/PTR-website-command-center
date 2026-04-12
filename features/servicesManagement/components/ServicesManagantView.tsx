"use client";

import Button from "@global components/ui/Button";
import { SectionTitle } from "@global components/ui/Title";

import ServiceEditor from "./ServiceEditor";
import ServicesDisplay from "./ServicesDisplay";

import { PAGE_META } from "../constants/pageMeta";

import useService from "../hooks/useService";

export function ServicesManagementView() {
  const { state, actions } = useService();

  return (
    <div className="page-layout">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />
        </div>

        <Button
          buttonText={"+ Add New Service"}
          clickAction={actions.handleAddNewService}
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:gap-5">
        <ServicesDisplay />

        <ServiceEditor />
      </div>

      {state.fetchServicesError && (
        <div className="text-(--primary-red) text-style__small-text">
          Error fetching services: {state.fetchServicesError}
        </div>
      )}
    </div>
  );
}
