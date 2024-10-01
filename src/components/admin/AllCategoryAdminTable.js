"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../../../CommonElements/CommonTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


const AllCategoryAdminTable = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Category Name",
        size: 200,
        Cell: ({ cell }) => {
          const slug = cell
            .getValue()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

          return (
            <div style={{ whiteSpace: "normal", wordBreak: "break-word",  }}>
              <Link
                href={`/categoryadmin/${slug}`}
                className="text-black-500 "
              >
                {cell.getValue()}
              </Link>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 100,
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button className="text-green-500" onClick={() => handleEdit(row)}>
              <PencilIcon className="h-5 w-5" />
            </button>
            <button className="text-red-500" onClick={() => handleDelete(row)}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories"); 
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoriesData(data); 
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // Handle Edit Button Click
  const handleEdit = (row) => {
    setSelectedId(row.original.id);
    setCategoryName(row.original.name);
    document.getElementById("edit_modal").showModal();
  };

  // Handle Delete Button Click
  const handleDelete = (row) => {
    setSelectedId(row.original.id);
    document.getElementById("delete_modal").showModal();
  };

  // Update Category
  const updateCategory = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      const response = await fetch(`/api/categories/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      // Refresh categories
      await fetchCategories();
      setFormSubmitted(false);
      setCategoryName("");
      document.getElementById("edit_modal").close();
    } catch (error) {
      setError(error.message);
      setFormSubmitted(false);
    }
  };

  // Delete Category
  const deleteCategory = async () => {
    setFormSubmitted(true);
    try {
      const response = await fetch(`/api/categories/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Refresh categories
      await fetchCategories();
      setFormSubmitted(false);
      document.getElementById("delete_modal").close();
    } catch (error) {
      setError(error.message);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Operation in progress...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

       <div>
        <CommonTable columns={columns} data={categoriesData} minRows={10} />
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Category</h3>
          <form onSubmit={updateCategory} className="mt-4">
            <label className="block mb-2">
              <span className="text-gray-700">Category Name</span>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="input input-bordered w-full mt-1"
              />
            </label>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-[#dc2626] hover:bg-[#dc2626] text-white"
                disabled={formSubmitted}
              >
                {formSubmitted ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setError("");
                  document.getElementById("edit_modal").close();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Category</h3>
          <p className="py-4">Are you sure you want to delete this category?</p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="modal-action">
            <button
              onClick={deleteCategory}
              className="btn bg-[#dc2626] hover:bg-[#dc2626] text-white"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Deleting..." : "Delete"}
            </button>
            <button
              className="btn"
              onClick={() => {
                setError("");
                document.getElementById("delete_modal").close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllCategoryAdminTable;
