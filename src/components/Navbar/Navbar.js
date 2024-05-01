"use client";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

//import NavHoverDropdown from "./NavHoverDropdown";
import { navigationItems } from "./navigationItems";

import MobileNavbar from "./MobileNavbar";
import Link from "next/link";

export default function Navbar() {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };
  const pathname = usePathname(null);

  useEffect(() => {
    const parentItem = navigationItems.find((item) =>
      item.sublinks.some((sublink) => sublink.href === pathname)
    );

    if (parentItem) {
      navigationItems.map((item) => (item.current = false));
      parentItem.current = true;
    }
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("session");
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <Disclosure as="nav">
          {({ open }) => (
            <div>
              <div className="h-20 flex items-center justify-between  px-2 sm:px-0">
                <div className="flex items-center flex-shrink-0 ">
                  {/* Mobile menu button */}
                  <div className="flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-full font-bold bg-gray-200 p-4 text-gray-900 hover:bg-gray-100 hover:text-gray-900 border-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-7 w-7"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars2Icon
                          className="block h-7 w-7"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  <Link prefetch={false} href="/">
                    <h1 className="text-gray-700 hover:text-blue-500 text-2xl font-bold ml-4  md:ml-0 cursor-pointer">
                      Main
                    </h1>
                  </Link>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {/* <NavHoverDropdown items={navigationItems} /> */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li
                          style={{
                            display: "inline-block",
                            marginRight: "30px",
                          }}
                        >
                          <Link prefetch={false} href="/">
                            <b>Home</b>
                          </Link>
                        </li>
                        <li
                          style={{
                            display: "inline-block",
                            marginRight: "30px",
                          }}
                        >
                          <Link prefetch={false} href="/blog">
                            <b>Blog</b>
                          </Link>
                        </li>
                        <li
                          style={{
                            display: "inline-block",
                            marginRight: "30px",
                          }}
                        >
                          <Link prefetch={false} href="/tutorial">
                            <b>Tutorial</b>
                          </Link>
                        </li>
                        <li style={{ display: "inline-block" }}>
                          <Link prefetch={false} href="/contactus">
                            <b>Contact</b>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navbar */}
              <MobileNavbar navigationItems={navigationItems} open={open} />
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
