import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

export default function MobileNavbar({ navigationItems, open }) {
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const parentItem = navigationItems.find((item) =>
            item.sublinks.some((sublink) => sublink.href === pathname)
        );

        if (parentItem) {
            navigationItems.map((item) => item.current = false)
            parentItem.current = true;
        }

    }, [pathname])

    const isActive = (path) => {
        return pathname === path
    }

    const handleSublinkClick = (sublink) => {
        // Set the current state of the parent item to true
        const parentItem = navigationItems.find((item) => item.sublinks.includes(sublink));
        if (parentItem) {
            parentItem.current = true;
        }
    };


    return (

        <div className={` md:hidden block bg-gray-100 fixed w-full top-20 overflow-y-auto bottom-0 py-6 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
            {navigationItems.map((item, index) => (

                <div key={index} >
                    <h1 className={`${item.current || isActive(item.href) ? "text-indigo-600" : "text-gray-700"} py-2 pl-7  flex justify-between items-center md:pr-0 pr-5 hover:bg-indigo-500 hover:text-white font-bold `}
                        onClick={() => {
                            setShow(!show)
                            setLabel(item.label)
                        }}>
                        {item.label}
                        <span className={`text-sm font-bold md:hidden inline`}>
                            {
                                label === item.label && show ? <ChevronUpIcon className="w-8 h-8 " /> : <ChevronDownIcon className="w-8 h-8 " />
                            }
                        </span>
                    </h1>
                    <div
                        className={`${label === item.label && show ? "md:hidden" : "hidden"} flex flex-col bg-gray-200  transition duration-500 `}
                    >
                        {item.sublinks.map((sublink, index) => (
                            <Disclosure.Button as={Link} href={sublink.href} key={index} onClick={() => handleSublinkClick(sublink)} className={`${isActive(sublink.href) ? "text-indigo-600 font-bold" : "text-gray-700"} py-3 pl-14 hover:font-bold  hover:bg-indigo-500 hover:text-white`}>
                                {sublink.name}
                            </Disclosure.Button>
                        ))}
                    </div>
                </div>

            ))}

        </div>

    )
}
