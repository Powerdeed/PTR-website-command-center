"use client";

import { SectionTitle } from "@components/ui/Title";

const pageMeta = {
  title: "Scheduling & Visibility",
  subtitle: "Manage when content goes live on the website",
};

export default function SchedulingAndVisibilitySection() {
  return (
    <div className="page-layout">
      <SectionTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
      </div>
    </div>
  );
}
