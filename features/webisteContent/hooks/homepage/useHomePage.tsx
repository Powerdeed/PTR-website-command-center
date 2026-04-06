"use client";

import useHomePageApi from "./useHomepageApi";
import useHomepageState from "./useHomepageState";
import useHomePageEditor from "./useHomepageEditor";

export default function useHomePage() {
  const state = useHomepageState();
  const editors = useHomePageEditor();
  const api = useHomePageApi();

  return {
    state,
    actions: { ...editors, ...api },
  };
}
