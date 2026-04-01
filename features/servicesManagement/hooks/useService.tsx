"use client";

import useServiceEdit from "./useServiceEdit";
import useServiceStates from "./useServiceStates";

export default function useService() {
  const state = useServiceStates();
  const serviceEdit = useServiceEdit();

  return { state, actions: { ...serviceEdit } };
}
