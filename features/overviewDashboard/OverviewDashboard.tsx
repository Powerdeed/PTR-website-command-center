import OverviewProvider from "./context/overviewProvider";

import { OverviewDashboardView } from "./components/OverviewDashboardView";

export default function OverviewDashboard() {
  return (
    <OverviewProvider>
      <OverviewDashboardView />
    </OverviewProvider>
  );
}
