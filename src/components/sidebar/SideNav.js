import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SideNav() {
  const [userRole, setUserRole] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserRole(session.user.name);
    }
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        {userRole === "admin" && (
          <Link
            prefetch={false}
            href="/addemployeeadmin"
            className=" block bg-[#8a8883] text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-facebook text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> Add Author</span>
            </div>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            prefetch={false}
            href="/allemployeeadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Authors</span>
            </div>
          </Link>
        )}
        <Link
          prefetch={false}
          href="/addblog"
          className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            {/* <i className="bi bi-instagram text-2xl font-bold"></i> */}
            <span className="text-base font-semibold"> Add Blog</span>
          </div>
        </Link>
        {userRole === "admin" && (
          <Link
            prefetch={false}
            href="/allblogadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Blog</span>
            </div>
          </Link>
        )}
        {userRole === "employee" && (
          <Link
            prefetch={false}
            href="/allblogemployee"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Blog</span>
            </div>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/addtutorialadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> Add Tutorial</span>
            </div>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/alltutorialadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Tutorial</span>
            </div>
          </Link>
        )}
        {userRole === "employee" && (
          <Link
            href="/alltutorialemployee"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Tutorial</span>
            </div>
          </Link>
        )}
        
        {userRole === "admin" && (
          <Link
            href="/addcategoryadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> Add Category</span>
            </div>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/allcategoryadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> All Categories</span>
            </div>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/addfaviconadmin"
            className=" block bg-[#8a8883]  text-white  px-4 py-2  rounded-md"
          >
            <div className="flex justify-start items-center space-x-2">
              {/* <i className="bi bi-linkedin text-2xl font-bold"></i> */}
              <span className="text-base font-semibold"> Add Favicon</span>
            </div>
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className=" w-full block bg-[#F44F54]  text-white   px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            {/* <i className="bi bi-youtube text-2xl font-bold"></i> */}
            <span className="text-base font-semibold"> Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
