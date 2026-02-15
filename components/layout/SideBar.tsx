"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/icons";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { companyName, menuItems } from "@/utils/constants/UI-data-constants";
import { useState } from "react";

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard Overview");

  return (
    <aside className="flex flex-col w-65 h-screen bg-(--primary-blue) text-(--terciary-grey)">
      <div className="py-2.5 pl-5 text-style__body h-20 flex items-center gap-2.5 border-b border-(--secondary-grey)">
        <div className="w-10 h-10 bg-(--secondary-blue) rounded-[10px] grid items-center justify-center">
          <FontAwesomeIcon
            icon={["fas", "gear"]}
            className="text-style__logo"
          />
        </div>
        <div className="h-fit">
          <h2 className="font-extrabold">PTR Command Center</h2>
          <h3>Operations Hub</h3>
        </div>
      </div>
      <div className="flex-1 py-2.5 text-style__body h-20 border-b border-(--secondary-grey)">
        <ul className="w-full h-full flex flex-col text-style__small-text overflow-y-scroll custom-scrollbar">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={`relative p-2.5 flex pl-5 gap-2.5 items-center ${activeMenu === item.label ? "bg-(--secondary-blue)/70 hover:bg-(--secondary-blue)/70 text-white" : "text-(--terciary-grey)"} cursor-pointer hover:bg-(--primary-grey)/30 hover:text-white transition-colors`}
              onClick={() => setActiveMenu(item.label)}
            >
              {activeMenu === item.label && (
                <div className="absolute left-0 top-0 h-full w-1.25 bg-(--secondary-blue)"></div>
              )}
              <div className="w-4">
                <FontAwesomeIcon icon={["fas", item.icon as IconName]} />
              </div>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-style__small-text py-2.5 pl-5 h-20">
        <div className="">{companyName}</div>
        <div>v{process.env.NEXT_PUBLIC_APP_VERSION}</div>
      </div>
    </aside>
  );
}
