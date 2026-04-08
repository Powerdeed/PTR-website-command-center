"use client";

import useWebsiteContentState from "./useWebsiteContentState";

export default function useWebsiteContent() {
  const state = useWebsiteContentState();

  return {
    state,
  };
}
