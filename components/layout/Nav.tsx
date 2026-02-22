"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "../../lib/icons";

export default function Nav() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed w-[calc(100vw-260px)] h-15 top-0 left-65 flex gap-2.5 items-center border-b border-(--terciary-grey) backdrop-blur shadow-[0_4px_6px_-1px_rgba(51,51,51,0.1)] py-2.5 px-5 text-style__body">
      <div className="flex-1 border border-(--terciary-grey) p-1.25 rounded-[10px] focus:shadow-[0_0_0_1px_var(--secondary-blue)] focus-within:shadow-[0_0_0_1px_var(--secondary-blue)] transition-shadow flex items-center">
        <FontAwesomeIcon
          icon={["fas", "magnifying-glass"]}
          className="text-(--terciary-grey) px-1.25"
        />
        <input
          type="text"
          placeholder="Search leads, services, content..."
          className="w-full outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative p-1 rounded-[10px] duration-300 hover:bg-(--terciary-grey) cursor-pointer">
        <FontAwesomeIcon
          icon={["far", "bell"]}
          className="text-(--primary-grey)"
        />

        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          3
        </div>
      </div>

      <div className="px-2 border-l border-(--terciary-grey) flex items-center gap-2.5 text-style__small-text">
        <div>
          <div className="font-bold">Admin User</div>
          <div className="">Administrator</div>
        </div>

        <div className="p-2 border rounded-full bg-(--primary-blue)">
          <FontAwesomeIcon
            icon={["far", "user"]}
            className="text-white text-style__body"
          />
        </div>
      </div>
    </nav>
  );
}
