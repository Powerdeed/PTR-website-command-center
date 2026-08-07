"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AuthGuard } from "@app/auth";
import { GlobalProvider, UnsavedChangesGuard } from "@globals";
import { FileUploaderProvider } from "./fileUploader";
import Nav from "./nav/Nav";
import SideBar from "./SideBar";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/login")) return children;

  return (
    <AuthGuard>
      <GlobalProvider>
        <FileUploaderProvider>
          <Nav />
          <SideBar />
          <UnsavedChangesGuard />
          {children}
        </FileUploaderProvider>
      </GlobalProvider>
    </AuthGuard>
  );
}
