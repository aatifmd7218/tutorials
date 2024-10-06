  "use client";
  import SideNav from "@/components/sidebar/SideNav";
  import React, { useState } from "react";
  import { useSession } from "next-auth/react";

  const Page = () => {
    
    const [categoryName, setCategoryName] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { data: session, status } = useSession();

    if (status === "loading") {
      return <div></div>;
    }

    if (!session || session.user.name !== "admin") {
      return <div>Access Denied</div>;
    }
    
    const handleAddCategory = async (e) => {
      e.preventDefault();
      const slug = categoryName.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

      const isActive = true;

      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoryName,         
            slug, 
            isActive
          }),
        });

        if (response.ok) {
          setFormSubmitted(true); 
          setCategoryName(""); 
        } else {
          console.error("Failed to add category");
        }
      } catch (error) {
        console.error("Error while adding category:", error);
      }
    };
    

    return (
      <>
        {formSubmitted && (
          <div className="toast toast-top toast-end z-50">
            <div className="alert alert-info">
              <span>Category added successfully</span>
            </div>
          </div>
        )}
        <div className="px-6 py-10 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-3 space-y-10">
              <SideNav />
            </div>
            <div className="col-span-9">
              <div className="card w-full bg-base-100 rounded-md">
                <form className="card-body" onSubmit={handleAddCategory}>
                  <h1 className="pt-4 text-center text-3xl font-semibold">
                    Add Category
                  </h1>

                  <div className="mt-6">
                    <label htmlFor="category" className="text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)} 
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit" 
                      className="btn bg-[#dc2626] w-20 text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Page;
