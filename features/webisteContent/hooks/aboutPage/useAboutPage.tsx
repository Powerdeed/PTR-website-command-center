"use client";

import useAboutEditor from "./useAboutEditor";
import useAboutPageApi from "./useAboutPageApi";
import useAboutpageState from "./useAboutpageState";
import useCompanyStructureApi from "./useCompanyStructureApi";
import useCompanyStructureEditor from "./useCompanyStructureEditor";

export default function useAboutPage() {
  const state = useAboutpageState();

  const aboutpageEditor = useAboutEditor();
  const aboutpageApi = useAboutPageApi();

  const companyStructureEditor = useCompanyStructureEditor();
  const companyStructureApi = useCompanyStructureApi();

  return {
    state,
    actions: {
      ...aboutpageEditor,
      ...aboutpageApi,
      ...companyStructureEditor,
      ...companyStructureApi,
    },
  };
}
