"use client";

import WebsiteContentProvider from "./context/websiteContextProvider";

import HomepageProvider from "./context/homepage/homepageProvider";

import TestimonialsProvider from "./context/homepage/testimonialsProvider";

import AboutpageProvider from "./context/aboutpage/aboutpageProvider";

import ContactpageProvider from "./context/contactpage/contactpageProvider";

import CompanyStructureProvider from "./context/aboutpage/companyStructureProvider";

import WebsiteContentView from "./components/WebsiteContentView";

export default function WebsiteContent() {
  return (
    <WebsiteContentProvider>
      <HomepageProvider>
        <TestimonialsProvider>
          <AboutpageProvider>
            <CompanyStructureProvider>
              <ContactpageProvider>
                <WebsiteContentView />
              </ContactpageProvider>
            </CompanyStructureProvider>
          </AboutpageProvider>
        </TestimonialsProvider>
      </HomepageProvider>
    </WebsiteContentProvider>
  );
}
