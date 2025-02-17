"use Client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { desktopRoute } from "@/data/SidebarItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "@/components/logo";
import Link from "next/link";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const activeRoute =
    desktopRoute.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || desktopRoute[0];
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1">
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
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileSidebar;
