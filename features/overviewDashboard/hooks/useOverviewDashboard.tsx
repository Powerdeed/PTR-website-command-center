import useCount from "./useCount";
import useGraphs from "./useGraphs";

export default function useOverviewDashboard() {
  const state = useCount();
  const graphs = useGraphs();

  return { state, graph: { ...graphs } };
}
