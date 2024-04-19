import React, { useEffect, useState } from "react";
import group from "../assets/Images/Group3.png";
import group4 from "../assets/Images/Group4.png";
import presentation from "../assets/Images/presentation.png";
import group5 from "../assets/Images/Group5.png";
import group6 from "../assets/Images/Group6.png";
import group7 from "../assets/Images/Group7.png";
import Car from "../assets/Images/car-retro-2.png";
import axios from "axios";
const DisplayForm = () => {
  const [categories, setCategories] = useState([]);
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

  return (
    <>
      <form className="overflow-hidden">
        <div className="absolute top-5 left-40 text-5xl font-semibold ">
          Display From
        </div>

        {categories.map((category, index) => (
          <div key={index}>
            <h1 className="ml-40 mt-20 text-2xl text-black font-semibold  relative   ">
              {category.categoryName}
            </h1>

            <div className="relative  min-h- ${category.questions.length * 10 + 42}  ml-28 mr-28 mt-4 pb-4 rounded-xl border-2 border-[#ADADAD] left-10   ">
              {category.questions.map((question, idx) => (
                <div
                  className="relative  min-h-20 ml-20 mr-24  border-[#ADADAD] flex text-center justify-center "
                  key={idx}
                >
                  <div className="absolute  ml-8 top-10 left-0 mt-0 "></div>

                  <div className="absolute  ml-6 top-10 left-20 font-semibold text-sm/[16px] h-10 ">
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
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="ml-64 top-0 mt-[23vh] absolute">
          <img src={group} />
        </div>
        <div className="ml-64 top-0 mt-[33vh] absolute">
          <img src={group4} />
        </div>
        <div className="ml-64 top-0 mt-[64vh] absolute">
          <img src={presentation} />
        </div>
        <div className="ml-64 top-0 mt-[75vh] absolute">
          <img src={group5} />
        </div>
        <div className="ml-64 top-0 mt-[86vh] absolute">
          <img src={group6} />
        </div>
        <div className="ml-64 top-0 mt-[117vh] absolute">
          <img src={group7} />
        </div>
        <div className="ml-64 top-0 mt-[150vh] absolute">
          <img src={Car} />
        </div>
      </form>
      <div className="absolute mt-10 left-1/4 ml-60 ">
        <button className="h-10 w-40 border-2 mr-4 rounded-xl bg-[#F9CE82] shadow-md shadow-opacity-50">
          SUBMIT
        </button>
        <button className="h-10 w-28 border-2 rounded-xl shadow-md shadow-opacity-50">
          CANCEL
        </button>
      </div>
    </>
  );
};

export default DisplayForm;
