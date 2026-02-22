"use client";

import { useContext, useEffect, useState } from "react";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  inquiryTrendsData,
  recentActivities,
  stats,
  trafficSourceData,
} from "@/services/web-activities";

import { sectionAccentColors } from "@/utils/constants/UI-data-constants";

import {
  LineContext,
  PieContext,
} from "@/components/layout/charts/ChartContext";
import PageTitle from "@/components/ui/PageTitle";

const PageMetadata = {
  title: "Dashboard Overview",
  subtitle: "Business health at a glance",
};

export default function OverviewDashboardSection() {
  const [visibleCount, setVisibleCount] = useState(5);
  const lContext = useContext(LineContext);
  const pieContext = useContext(PieContext);

  if (!lContext || !pieContext) {
    throw new Error("context must be used within a provider");
  }

  const { LineGraph, setLineProps } = lContext;
  const { PieDoughnut, setPieProps } = pieContext;

  useEffect(() => {
    setLineProps({
      labels: Object.keys(inquiryTrendsData),
      drawOnChartArea: true,
      datasets: [
        {
          label: "Average Response Time (hours)",
          data: Object.values(inquiryTrendsData),
          borderColor: "rgb(30,144,255)",
          backgroundColor: "transparent",
        },
      ],
      scales: {
        y: {
          min: 0,
          max: 28,
          ticks: {
            callback: (value: number | string) => String(value),
          },
        },
      },
    });
  }, [setLineProps]);

  useEffect(() => {
    setPieProps({
      labels: trafficSourceData.channel,
      pieData: trafficSourceData.users,
    });
  }, [setPieProps]);

  return (
    <main className="page-layout">
      <PageTitle title={PageMetadata.title} subtitle={PageMetadata.subtitle} />

      {/* STATS */}
      <div className="grid lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex gap-2.5 items-center p-2 lg:p-5 border border-(--terciary-grey) rounded-[10px] bg-white"
          >
            <div className="text-style__body">
              <div className="font-medium">{stat.label}</div>
              <div className="text-style__heading">{stat.value}</div>
              <div
                className={`${stat.changeDirection === "up" ? "text-(--primary-green)" : "text-(--primary-red)"}`}
              >
                {stat.change}
              </div>
            </div>
            <div className="bg-(--terciary-grey)/50 p-1 rounded-[10px]">
              <FontAwesomeIcon
                icon={stat.icon as [IconPrefix, IconName]}
                className={`${stat.iconColor}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CHART TRENDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-100 p-5 pb-10 bg-white border border-(--terciary-grey) rounded-[10px]">
          <div className="text-style__body mb-2.5">Inquiry Trends</div>
          <LineGraph />
        </div>
        <div className="h-100 p-5 pb-10 bg-white border border-(--terciary-grey) rounded-[10px] flex flex-col items-center">
          <div className="text-style__body mb-2.5 w-full h-fit text-left">
            Traffic Sources
          </div>
          <PieDoughnut />
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="flex flex-col gap-2.5 border border-(--terciary-grey) rounded-[10px] p-2.5 lg:p-5 bg-white">
        <div className="text-style__subheading">Recent Activity</div>

        {recentActivities.slice(0, visibleCount).map((activity, index) => (
          <div
            key={index}
            className={`${index === recentActivities.length - 1 ? "" : "border-b border-(--terciary-grey)"} flex gap-2.5 items-center py-2.5`}
          >
            <div
              className={`w-2 h-2 rounded-full ${sectionAccentColors[activity.section as keyof typeof sectionAccentColors].background}`}
            ></div>
            <div>
              <div className="text-style__body">{activity.description}</div>
              <div className="text-style__small-text">{activity.time}</div>
            </div>
          </div>
        ))}

        <div
          className="text-style__small-text text-(--primary-blue) cursor-pointer hover:underline self-start"
          onClick={() => setVisibleCount(visibleCount + 5)}
        >
          view more
        </div>
      </div>
    </main>
  );
}
