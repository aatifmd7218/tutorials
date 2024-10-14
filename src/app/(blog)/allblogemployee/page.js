"use client";
import AllBlogEmployeeTable from "@/components/employee/AllBlogEmployeeTable";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "employee") {
    return <div>Access Denied</div>;
  }
  return (
    <div>
      <AllBlogEmployeeTable />
    </div>
  );
}
