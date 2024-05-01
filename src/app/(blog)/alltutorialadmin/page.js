"use client";
import SideNav from "@/components/sidebar/SideNav";
import { useSession } from "next-auth/react";
import AllTutorialAdminTable from "@/components/admin/AllTutorialAdminTable";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }
  return (
    <>
      <div className=" px-6 py-10 sm:px-8 sm:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" col-span-3 space-y-10">
            <SideNav />
          </div>

          <div className="col-span-9">
            <AllTutorialAdminTable />
          </div>
        </div>
      </div>
    </>
  );
}
