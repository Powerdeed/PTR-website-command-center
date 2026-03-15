"use client";

import { SectionTitle } from "@global components/ui/Title";

import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";

import { PAGE_META } from "./constants/PageMetaData";
import { PAGES } from "./constants/pages";

import useActiveSection from "./hooks/useActiveSection";

export default function WebsiteContent() {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <div className="page-layout">
      <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />

      <div className="flex-1 feature-container-vertical text-style__body">
        <div className="text-style__subheading">Page Content Editor</div>

        {/* Sections selector */}
        <div className="flex justify-between bg-(--secondary-grey)/20 p-1 rounded-[10px]">
          {PAGES.map((page) => (
            <div
              key={page}
              onClick={() => setActiveSection(page)}
              className={`flex-1 ${activeSection === page ? "bg-white" : null} py-2 px-4 rounded-[10px] text-style__small-text text-center cursor-pointer`}
            >
              {page}
            </div>
          ))}
        </div>

        {activeSection === "Home Page" && <HomePage />}
        {activeSection === "About Page" && <AboutPage />}
        {activeSection === "Contact Page" && <ContactPage />}
      </div>
    </div>
  );
}
