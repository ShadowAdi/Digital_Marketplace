import Link from "next/link";
import React from "react";
import NavbarLInks from "./NavbarLInks";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();
  return (
    <nav className="max-w-7xl relative w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7 ">
      <div className="md:col-span-3">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold ">
            <span className="text-primary">Beauty</span>UI
          </h1>
        </Link>
      </div>
      <NavbarLInks />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {isAuth ? (
          <>
            <UserNav
              name={user?.given_name as string}
              email={user?.email as string}
              userImage={
                user?.picture ?? `https://avatar.vercel.sh/${user?.given_name}`
              }
            />
          </>
        ) : (
          <>
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button asChild variant={"secondary"}>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </>
        )}

        <div className="md:hidden ">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
