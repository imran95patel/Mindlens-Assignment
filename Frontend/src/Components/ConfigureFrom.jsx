import React, { useState, useEffect } from "react";
import AddCategory from "../Components/AddCategory";
import AddQuestion from "../Components/AddQuestion";
import group from "../assets/Images/Group3.png";
import group4 from "../assets/Images/Group4.png";
import presentation from "../assets/Images/presentation.png";
import group5 from "../assets/Images/Group5.png";
import group6 from "../assets/Images/Group6.png";
import group7 from "../assets/Images/Group7.png";
import Car from "../assets/Images/car-retro-2.png";
import group8 from "../assets/Images/Group8.png";
import axios from "axios";
// import EditQuestion from "./EditQuestion";

const ConfigureForm = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(null);

  const closeModal = () => {
    setShowAddCategory(false);
  };

  const handleClose = () => {
    setShowAddQuestion(false);
  };

  const handleEdit = () => {
    setEditQuestion(false);
  };
  useEffect(() => {
    axios
      .get("/api/mergedData")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };
  const handleClick = (id) => {
    setShowAddQuestion(!showAddQuestion);
    setCategoryID(id);
    console.log("ffff", id);
  };

  return (
    <>
      <form className="overflow-hidden mt-40">
        <div className="absolute  left-40 text-5xl font-semibold  ">
          Configure From
        </div>
        {categories.map((category, index) => (
          <div key={category.categoryID}>
            <h1 className="ml-40 mt-20 text-2xl text-black font-semibold  relative  ">
              {category.categoryName}
            </h1>

            <div className="relative  min-h- ${category.questions.length * 10 + 42}  ml-28 mr-28 mt-4 pb-12 rounded-xl border-2 border-[#ADADAD] left-10   ">
              {category.questions.map((question, idx) => (
                <div
                  key={idx}
                  className="relative  min-h-20 ml-20 mr-24  border-[#ADADAD] flex text-center justify-center  "
                >
                  <div className="absolute top-8 right-4">
                    <img src={group8} onClick={handleEdit} />
                  </div>

                  <div className="absolute  ml-6 top-10 left-20 font-semibold text-sm/[16px] h-10 mt-0">
                    {question.questionName}
                  </div>
                  <div className="absolute top-6 left-1/3  mt-0">
                    {question.options.map((option, i) => (
                      <button
                        key={i}
                        className={`bg-gray-100 h-10 w-${
                          question.options.length > 4 ? 28 : 40
                        }   h-40px border-l-2 border-t-2 border-b-2 border-[#2563cc] hover:bg-indigo-600 ${
                          i === 0 ? "rounded-tl-xl rounded-bl-xl " : ""
                        } ${
                          i === question.options.length - 1
                            ? "rounded-tr-xl rounded-br-xl"
                            : ""
                        }`}
                      >
                        {option.OptionDescr}
                      </button>
                    ))}
                  </div>
                  {idx === category.questions.length - 1 ? (
                    <div className=" absolute top-24 left-8 font-semibold text-sm/[16px] cursor-pointer text-[#2563CC] ">
                      <p onClick={() => handleClick(category.categoryID)}>
                        ADD QUESTION
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
        <p
          className="h-10 w-40 absolute left-36 ml-3 mt-2 font-semibold text-sm/[16px] cursor-pointer text-[#2563CC]"
          onClick={() => setShowAddCategory(!showAddCategory)}
        >
          ADD CATEGORY
        </p>
      </form>
      <div className="ml-64 top-96 mt-[150vh] absolute">
        <img src={group} />
      </div>
      <div className="ml-64 top-96 mt-[160vh] absolute">
        <img src={group4} />
      </div>
      <div className="ml-64 top-96 mt-[195vh] absolute">
        <img src={presentation} />
      </div>
      <div className="ml-64 top-96 mt-[207vh] absolute">
        <img src={group5} />
      </div>
      <div className="ml-64 top-96 mt-[218vh] absolute">
        <img src={group6} />
      </div>
      <div className="ml-64 top-96 mt-[253vh] absolute">
        <img src={group7} />
      </div>
      <div className="ml-64 top-96 mt-[289vh] absolute">
        <img src={Car} />
      </div>
      <div className="absolute  mt-44 left-1/4 ml-60 ">
        <button className="h-10 w-40 border-2 mr-4 rounded-xl bg-[#F9CE82] shadow-md shadow-opacity-50">
          SAVE
        </button>
        <button className="h-10 w-28 border-2 rounded-xl shadow-md shadow-opacity-50">
          CANCEL
        </button>
        <div className="h-12"></div>
      </div>
      {showAddCategory && (
        <AddCategory
          showAddCategory={showAddCategory}
          closeModal={closeModal}
        />
      )}

      {showAddQuestion && (
        <AddQuestion
          showAddQuestion={showAddQuestion}
          handleClose={handleClose}
          categoryID={categoryID}
        />
      )}

      {/* {editQuestion && (
        <EditQuestion editQuestion={editQuestion} handleEdit={handleEdit} />
      )} */}
      {/* {showAddCategory && <AddCategory />} */}
      {/* {showAddQuestion && <AddQuestion />} */}
    </>
  );
};

export default ConfigureForm;
