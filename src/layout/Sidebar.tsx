"use client";
import React from "react";
import Logo from "../components/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../components/ui/button";
import { desktopRoute } from "@/data/SidebarItems";

const DesktopSidebar = () => {
  const pathName = usePathname();
  const activeRoute =
    desktopRoute.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || desktopRoute[0];
  return (
    <aside className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>

      <div className="p-2">TODO CREDITS</div>

      <div className="flex flex-col p-2">
        {desktopRoute.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItems"
                  : "sidebaritem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DesktopSidebar;
