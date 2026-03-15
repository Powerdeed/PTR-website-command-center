export const menuItems = [
  { label: "Dashboard Overview", icon: "list" },
  { label: "Leads & Inquiries", icon: "user-tie" },
  { label: "Services Management", icon: "list-check" },
  { label: "Projects", icon: "folder" },
  { label: "Website Content", icon: "file-lines" },
  { label: "Articles & Insights", icon: "newspaper" },
  { label: "Media & Assets", icon: "images" },
  { label: "Scheduling & Visibility", icon: "calendar" },
  { label: "Data & Reports", icon: "chart-column" },
  { label: "Customization", icon: "palette" },
  { label: "Settings & Users", icon: "user-group" },
];

export type MenuLabels = (typeof menuItems)[number]["label"];
