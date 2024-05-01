"use client";
import AdminListTable from "@/components/admin/AdminListTable";
import SideNav from "@/components/sidebar/SideNav";

export default function Page() {
  return (
    <>
      <div className=" px-6 py-10 sm:px-8 sm:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" col-span-3 space-y-10">
            <SideNav />
          </div>

          <div className="col-span-9">
            <AdminListTable />
          </div>
        </div>
      </div>
    </>
  );
}
