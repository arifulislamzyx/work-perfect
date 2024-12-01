import BreadcrumbHeader from "@/layout/BreadcrumbHeader";
import DesktopSidebar from "@/layout/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 max-h-screen">
        <header className=" container flex items-center justify-between px-6 py-6 h-[50px]">
          <BreadcrumbHeader />
          <div className="gap-1 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="container flex flex-1 py-4 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
