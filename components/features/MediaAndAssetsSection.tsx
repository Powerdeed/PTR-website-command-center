"use client";

import Button from "@components/ui/Button";
import { SectionTitle } from "@components/ui/Title";

const pageMeta = {
  title: "Media & Assets",
  subtitle: "Central storage for images, documents, and diagrams",
};

export default function MediaAndAssetsSection() {
  return (
    <div className="page-layout">
      <div className="flex gap-5 items-center">
        <div className="flex-1 vertical-layout__inner">
          <SectionTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />
        </div>
        <Button buttonText="Upload Files" clickAction={() => {}} />
      </div>

      <div className="flex-1 vertical-layout__inner bg-white border border-(--terciary-grey) rounded-[10px]"></div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        <div className="flex-1 p-2.5 md:p-5 vertical-layout__inner md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
        <div className="flex-1 p-2.5 md:p-5 vertical-layout__inner md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
      </div>
    </div>
  );
}
