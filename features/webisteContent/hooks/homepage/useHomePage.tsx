"use client";

import useHomePageApi from "./useHomePageApi";
import useHomePageEdit from "./useHomepageEdit";
import useHomepageState from "./useHomepageState";

export default function useHomePage() {
  const state = useHomepageState();
  const editors = useHomePageEdit();
  const api = useHomePageApi();

  return {
    state,
    actions: { ...editors, ...api },
  };
}
