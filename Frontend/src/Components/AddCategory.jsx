import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory(props) {
  const [category, setCategory] = useState(""); // State to store the input value

  const [formData, setFormData] = useState({
    categoryname: "",
  });
  // Step 2: Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("category", formData.categoryname);
    axios
      .post(`http://localhost:5050/api/saveCategory`, payload)
      .then((res) => {
        toast.success("Category saved successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed to save category.");
        console.log(err);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="w-[470px] bg-[#F4FAFF] rounded-md shadow-md p-6">
          <label
            className="block text-gray-700  font-semibold mb-4 text-base font-syne"
            htmlFor="category"
          >
            Add Category
          </label>
          <div className="mb-4">
            <label className="">Category</label>
          </div>
          <input
            className="w-full px-4 py-2 mb-4 leading-tight border rounded-md focus:outline-none"
            id="category"
            type="text"
            placeholder="Category Text"
            name="categoryname"
            value={formData.categoryname}
            onChange={handleInputChange}
          />
          <div className="flex justify-center">
            <button
              className="h-9 w-52 mr-2 text-white bg-[#F9CE82] rounded-xl hover:bg-[#daa345] focus:outline-none "
              type="submit"
            >
              Save
            </button>
            <button
              className="h-9 w-40 text-black bg-white rounded-xl hover:bg-[#fbfafa] focus:outline-none border-2"
              onClick={props.closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddCategory;
