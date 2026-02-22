"use client";

import PageTitle from "@/components/ui/PageTitle";

const pageMeta = {
  title: "Media & Assets",
  subtitle: "Central storage for images, documents, and diagrams",
};

export default function MediaAndAssetsSection() {
  return (
    <div className="page-layout">
      <PageTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
      </div>
    </div>
  );
}
