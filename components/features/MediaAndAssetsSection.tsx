"use client";

import FormWrapper from "@components/layout/FormWrapper";
import Button, { ButtonLight } from "@components/ui/Button";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

const pageMeta = {
  title: "Media & Assets",
  subtitle: "Central storage for images, documents, and diagrams",
};

const fileCategories = ["All", "Images", "Documents", "Diagrams"];

export default function MediaAndAssetsSection() {
  return (
    <div className="page-layout">
      <FormWrapper
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
        subtitleChildren={
          <Button buttonText="Upload Files" clickAction={() => {}} />
        }
      >
        <div className="feature-container-horizontal">
          <div className="flex-1 border border-(--terciary-grey) p-1.25 rounded-[10px] focus:shadow-[0_0_0_1px_var(--secondary-blue)] focus-within:shadow-[0_0_0_1px_var(--secondary-blue)] transition-shadow flex items-center">
            <FontAwesomeIcon
              icon={["fas", "magnifying-glass"]}
              className="text-(--terciary-grey) px-1.25"
            />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full outline-none"
              value=""
              onChange={() => {}}
            />
          </div>

          {fileCategories.map((category) => (
            <ButtonLight
              key={category}
              buttonText={category}
              clickAction={(val) => console.log(val)}
            />
          ))}
        </div>

        <div className="feature-container-vertical">
          <FormWrapper
            subtitle={`All Assets (${6})`}
            subtitleChildren={
              <div className="text-(terciary-grey) text-style__small-text">
                Total Storage: {14.5} MB
              </div>
            }
          >
            <div></div>
          </FormWrapper>
        </div>
      </FormWrapper>
    </div>
  );
}
