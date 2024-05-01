"use client";
import React from "react";
import { useState, useRef, useEffect, forwardRef } from "react";
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
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [published, setPublished] = useState("N");
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState();
  const [featuredPost, setFeaturedPost] = useState("");

  const { data: session, status } = useSession();

  const handleFeaturedPostChange = (event) => {
    setFeaturedPost(event.target.value);
  };

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

        if (error !== undefined) {
          console.log("Users Get error:", error);
        }
        setUsers(result);
      } catch (error) {
        console.error("Users Get operation error", error);
      }
    };
    fetchData();
  }, []);

  if (status === "loading") {
    return <div></div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const handleSelectChange = (event) => {
    setSelectedUserName(event.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleAddBlog = async (e) => {
    try {
      e.preventDefault();
      setFormSubmitted(true);

      setTimeout(async () => {
        const selectedUser = users.find(
          (user) => user.username === selectedUserName
        );
        setPublished("N");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("published", published);
        formData.append("authorId", selectedUser.id);
        formData.append("featuredPost", featuredPost);

        const response = await fetch("/api/addblog", {
          method: "POST",
          body: formData,
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("Blog Added error:", error);
        }
        setTitle("");
        setDesc("");
        setContent("");
        setImage("");
        setImageName("");
        window.location.href = "/allblogadmin";
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Blog addition operation error", error);
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
      <div className=" px-6 py-10 sm:px-8 sm:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" col-span-3 space-y-10">
            <SideNav />
          </div>

          <div className="col-span-9">
            <div className="card w-full bg-base-100 rounded-md">
              <form className="card-body">
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
                />

                <textarea
                  type="text"
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="textarea textarea-bordered placeholder-gray-500"
                  placeholder="Meta Description"
                ></textarea>

                <DynamicSunEditor
                  onChange={setContent}
                  setContents={content}
                  placeholder="Blog Content"
                  className="text-black"
                  height="300px"
                  setOptions={{
                    height: "100%", // Use px unit for height
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
                    font: ["Arial", "Courier New"], // Example: specify fonts
                    fontColor: "red", // Set font color
                    backgroundColor: "red", // Set background color
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
                >
                  <option disabled value="">
                    featured post?
                  </option>
                  <option>yes</option>
                  <option>no</option>
                  {featuredPost === "" && (
                    <option disabled style={{ display: "none" }}>
                      featured post?
                    </option>
                  )}
                </select>

                <select
                  onChange={handleSelectChange}
                  value={selectedUserName || ""}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Assign to Employee?
                  </option>
                  {users.map((user) => (
                    <option key={user.username}>{user.username}</option>
                  ))}
                  {selectedUserName === "" && (
                    <option disabled style={{ display: "none" }}>
                      Assign to Employee?
                    </option>
                  )}
                </select>

                <div className="flex justify-end">
                  <button
                    onClick={handleAddBlog}
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

export default AddBlog;
