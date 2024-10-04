import React, { useState } from "react";

const AddEmployeeForm = () => {
  const [username, setUsername] = useState();
  const [authorName, setAuthorName] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [formSubmitted, setFormSubmitted] = useState();
  const [toastMessage, setToastMessage] = useState();

  const handleAddEmployee = async (e) => {
    try {
      e.preventDefault();

      setFormSubmitted(true);

      let error, result;

      if (password === confirmpassword) {
        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiName: "addemployee",
            username,
            authorName,
            email,
            password,
          }),
        });

        ({ error, result } = await response.json());

        if (error === undefined) {
          setToastMessage("Author Added Successfully");
          setTimeout(async () => {
            setUsername("");
            setAuthorName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setFormSubmitted(false);
          }, 3000);
        }

        if (error !== undefined) {
          console.log("add Author error:", error);
        }
      }

      if (password !== confirmpassword) {
        setToastMessage("Password and Confirm Password does not match");
        setTimeout(() => {
          setUsername("");
          setAuthorName("")
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFormSubmitted(false);
          setToastMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("add Author operation error", error);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="first-letter:card w-full bg-base-100">
          <form className="card-body ">
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Add Author
            </h1>
            <div>
              <label className="form-control  w-full">
                <div className="label ">
                  <span className="label-text font-bold ">UserName</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>
              <label className="form-control  w-full">
                <div className="label ">
                  <span className="label-text font-bold ">Name of Author</span>
                </div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="John Deo"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>
              <label className="form-control  w-full">
                <div className="label">
                  <span className="label-text font-bold">Email</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold ">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold ">
                    Confirm Password
                  </span>
                </div>
                <input
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>
              <div className="flex justify-end col-span-2 mt-3">
                <button
                  onClick={(e) => handleAddEmployee(e)}
                  className="btn w-24 bg-[#dc2626] text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployeeForm;
