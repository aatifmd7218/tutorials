import Link from "next/link";

export default function Copyright() {
  return (
    <div className="border-t-2 border-gray-200 py-2">
      <div className="w-full mx-auto max-w-screen-xl py-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center ">
          © 2016-2023
          <Link
            prefetch={false}
            href="/"
            className="hover:text-red-600 font-medium hover:underline mx-2"
          >
            Blog.
          </Link>
          All rights reserved.
          <Link prefetch={false} href="/" className="font-bold text-gray-900">
            | Purchase
          </Link>
        </span>
        <ul className="flex flex-wrap items-center justify-center  mt-3 text-sm font-medium text-gray-500  sm:mt-0">
          <li>
            <Link
              prefetch={false}
              href="/"
              className="hover:text-red-600 font-medium hover:underline"
            >
              Security
            </Link>
            <span className="mx-2">|</span>
          </li>
          <li>
            <Link
              prefetch={false}
              href="/"
              className="hover:text-red-600 font-medium hover:underline "
            >
              Privacy & Cookie Policy
            </Link>
            <span className="mx-2">|</span>
          </li>
          <li>
            <Link
              prefetch={false}
              href="/"
              className="hover:text-red-600 font-medium hover:underline "
            >
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
