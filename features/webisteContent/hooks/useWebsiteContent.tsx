"use client";

import useAboutPage from "./aboutPage/useAboutPage";
import useContactPage from "./contactpage/useContactPage";
import useHomePage from "./homepage/useHomePage";
import useWebsiteContentState from "./useWebsiteContentState";

export default function useWebsiteContent() {
  const state = useWebsiteContentState();

  const homepageHandlers = useHomePage();
  const aboutpageHandlers = useAboutPage();
  const contactpageHandlers = useContactPage();

  return {
    state,
    actions: {
      ...homepageHandlers,
      ...aboutpageHandlers,
      ...contactpageHandlers,
    },
  };
}
