"use client";

import useWebsiteContentEditor from "./useWebsiteContentEditor";
import useWebsiteContentState from "./useWebsiteContentState";

export default function useWebsiteContent() {
  const state = useWebsiteContentState();
  const editor = useWebsiteContentEditor();

  return {
    state,
    actions: { ...editor },
  };
}
