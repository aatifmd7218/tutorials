"use client";
import React, { useState, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import SideNav from "@/components/sidebar/SideNav";
import { useSession } from "next-auth/react";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [published, setPublished] = useState("N");
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [featuredPost, setFeaturedPost] = useState("");

  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { error, result } = await response.json();

        if (error) {
          console.log("Users Get error:", error);
        } else {
          setUsers(result);
        }
      } catch (error) {
        console.error("Users Get operation error", error);
      }
    };
    fetchData();
  }, []);

  // Determine if user is admin or employee
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      if (session.user.name === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setSelectedUserName(session.user.username); // Automatically assign to self
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const handleSelectChange = (event) => {
    setSelectedUserName(event.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setImage(selectedFile);
        setImageName(selectedFile.name);
    } else {
        setImage(null);
        setImageName("");
    }
};

  const handleFeaturedPostChange = (event) => {
    setFeaturedPost(event.target.value);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      
      setTimeout(async () => {
        // If admin, find the selected user
        // If employee, assign to self
        const selectedUser = isAdmin
          ? users.find((user) => user.username === selectedUserName)
          : session.user; // Assign to self


          if (!selectedUser) { // Added check for selectedUser
            console.log("Invalid user type or no user selected.");
            setFormSubmitted(false);
            return;
          }


        setPublished("N"); // Or set to "Y" based on your requirement

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }
        formData.append("published", published);
        formData.append("authorId", selectedUser.id);
        formData.append("featuredPost", featuredPost);

        const response = await fetch("/api/addblog", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const { error, result } = await response.json();

        if (error) {
          console.log("Blog Added error:", error);
        } else {
          // Reset form fields
          setTitle("");
          setDesc("");
          setContent("");
          setImage(null);
          setImageName("");
          setFeaturedPost("");
          setSelectedUserName(isAdmin ? "" : session.user.username);
          window.location.href = "/allblogadmin"; // Redirect after success
        }
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Blog addition operation error", error);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Blog Assigned to employee</span>
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
              <form className="card-body" onSubmit={handleAddBlog}>
                <h1 className="pt-4 text-center text-3xl font-semibold">
                  Add Blog Details
                </h1>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title"
                  className="mt-8 input input-bordered w-full placeholder-gray-500"
                  required
                />

                <textarea
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="textarea textarea-bordered placeholder-gray-500"
                  placeholder="Meta Description"
                  required
                ></textarea>

                <DynamicSunEditor
                  onChange={setContent}
                  setContents={content}
                  placeholder="Blog Content"
                  className="text-black"
                  height="300px"
                  setOptions={{
                    height: "100%",
                    buttonList: [
                      ["undo", "redo"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["removeFormat"],
                      ["outdent", "indent"],
                      ["fullScreen", "showBlocks", "codeView"],
                      ["preview", "print"],
                      ["link", "image", "video"],
                      [
                        "font",
                        "fontSize",
                        "formatBlock",
                        "align",
                        "list",
                        "table",
                      ],
                      ["fontColor", "hiliteColor", "horizontalRule"],
                    ],
                    font: ["Arial", "Courier New"],
                    fontColor: "red",
                    backgroundColor: "red",
                  }}
                />

                <label
                  htmlFor="image"
                  className="p-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
                >
                  <span>{imageName ? imageName : "Upload Blog Image"}</span>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <select
                  onChange={handleFeaturedPostChange}
                  value={featuredPost || ""}
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled value="">
                    Featured post?
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {isAdmin && (
                  <select
                    onChange={handleSelectChange}
                    value={selectedUserName || ""}
                    className="select select-bordered w-full"
                    required
                  >
                    <option disabled value="">
                      Assign to Employee?
                    </option>
                    {users.map((user) => (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-[#dc2626] w-20 text-white"
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? "Saving..." : "Save"}
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

export default AddBlog;
