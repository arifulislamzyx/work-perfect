import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({
  fontSize = "2xl",
}: {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer
          fontSize={fontSize}
          className="stroke-white"
        />
      </div>
      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Work
        </span>{" "}
        <span className="text-stone-700 dark:text-stone-300">Perfectly</span>
      </div>
    </Link>
  );
};

export default Logo;
