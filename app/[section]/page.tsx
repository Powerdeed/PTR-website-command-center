"use client";

import { use } from "react";

import OverviewDashboardSection from "@/components/features/OverviewDashboardSection";
import ProjectsSection from "@/components/features/ProjectsSection";
import WebsiteContentSection from "@/components/features/WebsiteContentSection";
import ArticlesAndInsightsSection from "@/components/features/ArticlesAndInsightsSection";
import MediaAndAssetsSection from "@/components/features/MediaAndAssetsSection";
import SchedulingAndVisibilitySection from "@/components/features/SchedulingAndVisibilitySection";
import DataAndReportsSection from "@/components/features/DataAndReportsSection";
import CustomizationSection from "@/components/features/CustomizationSection";
import SettingsAndUsersSection from "@/components/features/SettingsAndUsersSection";
import LeadsAndInquiriesSection from "@/components/features/LeadsAndInquiriesSection";
import ServicesManagementSection from "@/components/features/ServicesManagementSection";
import SideBar from "@/components/layout/SideBar";

import { convertLinkToLabel } from "@/utils/conversions";
import { MenuLabels } from "@/utils/constants/UI-data-constants";

export default function Section({
  params,
}: {
  params: Promise<{ section: MenuLabels }>;
}) {
  const { section } = use(params);
  const sectionLabel = convertLinkToLabel(decodeURIComponent(section));

  const sectionMap: Record<MenuLabels, React.ReactNode> = {
    "Dashboard Overview": <OverviewDashboardSection />,
    "Leads & Inquiries": <LeadsAndInquiriesSection />,
    "Services Management": <ServicesManagementSection />,
    Projects: <ProjectsSection />,
    "Website Content": <WebsiteContentSection />,
    "Articles & Insights": <ArticlesAndInsightsSection />,
    "Media & Assets": <MediaAndAssetsSection />,
    "Scheduling & Visibility": <SchedulingAndVisibilitySection />,
    "Data & Reports": <DataAndReportsSection />,
    Customization: <CustomizationSection />,
    "Settings & Users": <SettingsAndUsersSection />,
  };

  const content = sectionMap[sectionLabel];

  return (
    <div className="pl-65 pt-15">
      <SideBar currentMenu={sectionLabel} />

      {content}
    </div>
  );
}
