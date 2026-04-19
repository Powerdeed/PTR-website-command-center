"use client";

// modules
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

// utils
import { convertLinkToLabel } from "@global utils/conversions/urlConversions";

// constants
import { MenuLabels } from "@lib/constants/NAV_MENU_AND_LABELS";

// features
import SettingsAndUsers from "@features/settingsAndUser/SettingsAndUsers";
import Customization from "@features/customization/Customization";
import DataAndReports from "@features/dataAndReports/DataAndReports";
import SchedulingAndVisibility from "@features/schedulingAndVisiblity/SchedulingAndVisibility";
import MediaAndAssets from "@features/mediaAndAssets/MediaAndAssets";
import ArticlesAndInsights from "@features/articlesAndInsights/ArticlesAndInsights";
import WebsiteContent from "@features/webisteContent/WebsiteContent";
import Projects from "@features/projects/Projects";
import ServicesManagement from "@features/servicesManagement/ServicesManagement";
import LeadsAndInquiries from "@features/leadsAndInquiries/LeadsAndInquiries";
import OverviewDashboard from "@features/overviewDashboard/OverviewDashboard";

// component
import { ChartProvider } from "@global components/layout/charts/context/ChartProvider";

export default function Section({
  params,
}: {
  params: Promise<{ section: MenuLabels }>;
}) {
  const { section } = use(params);
  const sectionLabel = convertLinkToLabel(decodeURIComponent(section));
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
  }, [router]);

  const sectionMap: Record<MenuLabels, React.ReactNode> = {
    "Dashboard Overview": <OverviewDashboard />,
    "Leads & Inquiries": <LeadsAndInquiries />,
    "Services Management": <ServicesManagement />,
    Projects: <Projects />,
    "Website Content": <WebsiteContent />,
    "Articles & Insights": <ArticlesAndInsights />,
    "Media & Assets": <MediaAndAssets />,
    "Scheduling & Visibility": <SchedulingAndVisibility />,
    "Data & Reports": <DataAndReports />,
    Customization: <Customization />,
    "Settings & Users": <SettingsAndUsers />,
  };

  const content = sectionMap[sectionLabel];

  return (
    <div className="pl-65 pt-15">
      <ChartProvider>{content}</ChartProvider>
    </div>
  );
}
