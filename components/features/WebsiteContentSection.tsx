"use client";

import PageTitle from "@/components/ui/PageTitle";
import { useState } from "react";
import HomePage from "./WebsiteContentSection/HomePage";
import ContactPage from "./WebsiteContentSection/ContactPage";
import AboutPage from "./WebsiteContentSection/AboutPage";

const pageMeta = {
  title: "Website Content",
  subtitle: "Manage core website pages and sections",
};

const pages = ["Home Page", "About Page", "Contact Page"];

export default function WebsiteContentSection() {
  const [activeSection, setActiveSection] = useState("Home Page");
  return (
    <div className="page-layout">
      <PageTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />

      <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px] text-style__body">
        <div className="text-style__subheading">Page Content Editor</div>

        {/* Sections selector */}
        <div className="flex justify-between bg-(--secondary-grey)/20 p-1 rounded-[10px]">
          {pages.map((page) => (
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
