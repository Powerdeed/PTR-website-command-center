"use client";
import {
  LineContext,
  PieContext,
} from "@/components/layout/charts/ChartContext";
import { sectionAccentColors } from "@/utils/constants/UI-data-constants";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

const PageMetadata = {
  title: "Dashboard Overview",
  description: "Business health at a glance",
};

const stats = [
  {
    label: "New Inquiries",
    value: "23",
    change: "+12% from last month",
    changeDirection: "up",
    icon: ["fas", "user-group"],
    iconColor: "text-(--secondary-blue)",
  },
  {
    label: "Active Leads",
    value: "47",
    change: "+8% from last month",
    changeDirection: "up",
    icon: ["fas", "suitcase"],
    iconColor: "text-(--secondary-yellow)",
  },
  {
    label: "Services Viewed",
    value: "1,234",
    change: "+24% from last month",
    changeDirection: "up",
    icon: ["far", "eye"],
    iconColor: "text-(--secondary-red)",
  },
  {
    label: "Traffic Summary",
    value: "8.5K",
    change: "+15% from last month",
    changeDirection: "up",
    icon: ["fas", "arrow-trend-up"],
    iconColor: "text-(--secondary-green)",
  },
];

const recentActivities = [
  {
    section: "Form Inquiry",
    description: "New contact form submission from Sarah Mitchell",
    time: "5 minutes ago",
  },
  {
    section: "Services Management",
    description: `Service page "Industrial Engineering" updated`,
    time: "1 hour ago",
  },
  {
    section: "Articles & Insights",
    description: `Article "Future of Renewable Energy" scheduled for publish`,
    time: "2 hours ago",
  },
  {
    section: "Projects / Portfolio",
    description: "New inquiry about Project Management services",
    time: "3 hours ago",
  },
  {
    section: "Website Content",
    description: "Homepage hero section content updated",
    time: "5 hours ago",
  },
];

export default function Home() {
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
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      drawOnChartArea: true,
      datasets: [
        {
          label: "Average Response Time (hours)",
          data: [4.1, 4, 4.2, 4, 4.2, 4.3, 4.1],
          borderColor: "rgb(30,144,255)",
          backgroundColor: "transparent",
        },
      ],
      scales: {
        y: {
          min: 0,
          max: 8,
          ticks: {
            callback: (value: number | string) => String(value),
          },
        },
      },
    });
  }, [setLineProps]);

  useEffect(() => {
    setPieProps({ pieData: [80, 15, 5] });
  }, [setPieProps]);

  return (
    <main className="p-2.5 lg:p-5 flex flex-col gap-2.5 lg:gap-5">
      {/* TITLE SECTION */}
      <div>
        <div className="text-style__heading">{PageMetadata.title}</div>
        <div className="text-style__body">{PageMetadata.description}</div>
      </div>

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
        <div className="h-100 p-5 pb-10 bg-white border border-(--terciary-grey) rounded-[10px]">
          <div className="text-style__body mb-2.5">Traffic Sources</div>
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
