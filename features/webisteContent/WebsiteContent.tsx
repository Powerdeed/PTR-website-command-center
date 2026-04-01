"use client";

import WebsiteContentView from "./components/WebsiteContentView";
import AboutpageProvider from "./context/aboutpageProvider";
import ContactpageProvider from "./context/contactpageProvider";
import HomepageProvider from "./context/homepageProvider";
import WebsiteContentProvider from "./context/websiteContextProvider";

export default function WebsiteContent() {
  return (
    <WebsiteContentProvider>
      <HomepageProvider>
        <AboutpageProvider>
          <ContactpageProvider>
            <WebsiteContentView />
          </ContactpageProvider>
        </AboutpageProvider>
      </HomepageProvider>
    </WebsiteContentProvider>
  );
}
