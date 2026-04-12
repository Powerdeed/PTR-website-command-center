"use client";

import useContactPageApi from "./useContactPageApi";
import useContactPageEditor from "./useContactPageEditor";
import useContactPageState from "./useContactPageState";

export default function useContactPage() {
  const state = useContactPageState();

  const contactEditor = useContactPageEditor();
  const contactApi = useContactPageApi();

  return { state, actions: { ...contactEditor, ...contactApi } };
}
