"use client";
import { useMemo } from "react";
import React from "react";
import CommonTable from "../../../CommonElements/CommonTable";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { adminListData } from "../../../Data/adminListData";

const AdminListTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "NAME",
        size: 80,
      },

      {
        accessorKey: "email",
        header: "Email",
        size: 80,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 80,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <button className="mr-2">
              <EyeIcon className="h-5 w-5 text-blue-500" />
            </button>
            <button className="mr-2">
              <PencilIcon className="h-5 w-5 text-green-500" />
            </button>
            <button>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <div>
        <CommonTable columns={columns} data={adminListData} minRows={10} />
      </div>
    </>
  );
};

export default AdminListTable;
