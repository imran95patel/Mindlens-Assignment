import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddQuestion(props) {
  const [formData, setFormData] = useState({
    questionname: "",
  });
  // Step 2: Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("questionname", formData.questionname);
    payload.append("categoryID", props.categoryID);
    console.log(payload);
    axios
      .post(`http://localhost:5050/api/saveQuesion`, payload)

      .then((res) => {
        toast.success("Question saved successfully!");
        console.log(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed to save Question.");
        console.log(err);
      });
  };

  const handleCancel = () => {
    setQuestion("");
    console.log("Cancelled");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm bg-opacity-50">
          <div className="w-[470px] bg-[#F4FAFF] rounded-md shadow-md p-6">
            <label
              className="block text-gray-700  font-semibold mb-4 text-base font-syne"
              htmlFor="category"
            >
              Add Question
            </label>
            <div className="mb-4">
              <label className="">Question</label>
            </div>
            <input
              className="w-full px-4 py-2 mb-4 leading-tight border rounded-md focus:outline-none"
              id="Question"
              type="text"
              placeholder="Question Text"
              name="questionname"
              value={formData.questionname}
              onChange={handleInputChange}
            />

            <div className="font-semibold text-sm/[16px] cursor-pointer text-[#2563CC] mb-3 ml-1">
              ADD OPTION
            </div>
            <div className="flex justify-center">
              <button
                className="h-9 w-52 mr-2 text-white bg-[#F9CE82] rounded-xl hover:bg-[#daa345] focus:outline-none "
                type="submit"
              >
                Save
              </button>
              <button
                className="h-9 w-40 text-black bg-white rounded-xl hover:bg-[#fbfafa] focus:outline-none border-2"
                onClick={props.handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddQuestion;
