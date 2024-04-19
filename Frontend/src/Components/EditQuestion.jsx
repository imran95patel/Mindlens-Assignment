import React, { useState } from "react";

function EditQuestion(props) {
  const [category, setCategory] = useState("");

  const handleSave = () => {
    console.log("Category saved: ", category);
    props.closeModal(); // Close the modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSave();
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
    </div>
  );
}

export default EditQuestion;
