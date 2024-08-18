"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavbarLinksArray = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "Templates", href: "/products/template" },
  { id: 2, name: "UI Kits", href: "/products/uikit" },
  { id: 3, name: "Icons", href: "/products/icon" },
];

const NavbarLInks = () => {
  const path = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-3 ">
      {NavbarLinksArray.map((link, i) => {
        return (
          <>
            <Link
              href={link.href}
              key={i}
              className={cn(
                path === link.href
                  ? "border-b-primary"
                  : "hover:border-b-primary hover:bg-opacity-75",
                "group flex items-center px-2 py-2 font-medium rounded-sm border-b-2"
              )}
            >
              {link.name}
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default NavbarLInks;
