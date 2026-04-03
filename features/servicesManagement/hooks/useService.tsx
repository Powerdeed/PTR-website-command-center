"use client";

import useServiceApi from "./useServiceApi";
import useServiceEdit from "./useServiceEdit";
import useServiceStates from "./useServiceStates";

export default function useService() {
  const state = useServiceStates();
  const serviceEdit = useServiceEdit();
  const api = useServiceApi();

  return { state, actions: { ...serviceEdit, ...api } };
}
