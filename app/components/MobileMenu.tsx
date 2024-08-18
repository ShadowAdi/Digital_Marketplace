"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavbarLinksArray } from "./NavbarLInks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const MobileMenu = () => {
  const path = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex px-2 space-y-1 flex-col ">
          {NavbarLinksArray.map((link) => {
            return (
                <Link
                  href={link.href}
                  key={link.id}
                  className={cn(
                    path === link.href
                      ? "bg-muted text-primary"
                      : "hover:bg-muted hover:bg-opacity-75",
                    "group flex items-center px-2 py-2 font-medium rounded-md hover:text-primary mb-3"
                  )}
                >
                  {link.name}
                </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
