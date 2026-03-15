"use client";

import { use } from "react";

import { convertLinkToLabel } from "@global-utils/conversions";
import { MenuLabels } from "@global-utils/constants/NAV_MENU_AND_LABELS";

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

export default function Section({
  params,
}: {
  params: Promise<{ section: MenuLabels }>;
}) {
  const { section } = use(params);
  const sectionLabel = convertLinkToLabel(decodeURIComponent(section));

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

  return content;
}
