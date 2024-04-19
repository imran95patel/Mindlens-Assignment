import React from "react";
import house from "../assets/Images/house.png";
import toolBox from "../assets/Images/tool-box.png";
import checkList from "../assets/Images/task-checklist.png";
import group1 from "../assets/Images/Group1.png";
import line from "../assets/Images/Line.png";
import file from "../assets/Images/common-file-text.png";
import group2 from "../assets/Images/Group2.png";
import calendar from "../assets/Images/calendar.png";
import cog from "../assets/Images/cog.png";
import profile from "../assets/Images/Profile.png";
import vector from "../assets/Images/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <>
      <div className="   fixed left-24 top-20">
        <img className="absolute -z-10" src={vector} alt="" />
        <FontAwesomeIcon
          icon={faAngleRight}
          className="w-5 h-5 mt-2 -ml-1"
          style={{ color: "#FF6E6E" }}
        />
      </div>
      <div className="fixed left-0 bottom-0 top-0  pt-6 bg-white  w-24 pl-6 shadow-xl  ">
        <div className=" flex mb-9 w-9 bg-black text-white py-3 px-6 justify-center rounded-full  ">
          Logo
        </div>

        <div
          className=" w-full bg-[FF6E6E]
         "
        >
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img
              className=" absolute top-3 left-3 w-7 h-6"
              src={house}
              alt=""
            />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md ">
            <img
              className=" absolute top-3 left-3 w-7 h-6"
              src={toolBox}
              alt=""
            />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md ">
            <img
              className="absolute top-3 left-3 w-7 h-6"
              src={checkList}
              alt=""
            />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img
              className="absolute top-3 left-3 w-7 h-6"
              src={group1}
              alt=""
            />
          </div>
          <div className="p-2 ">
            <img src={line} alt="" />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img className="absolute top-3 left-3 w-7 h-6" src={file} alt="" />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img
              className="absolute top-3 left-3 w-7 h-6"
              src={group2}
              alt=""
            />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img
              className="absolute top-3 left-3 w-7 h-6"
              src={calendar}
              alt=""
            />
          </div>
          <div className=" p-2">
            <img src={line} alt="" />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img className="absolute top-3 left-3 w-7 h-6" src={cog} alt="" />
          </div>
          <div className=" relative mb-3 hover:bg-[#FFE8E8] h-12 w-12 rounded-md">
            <img
              className="absolute top-3 left-3 w-7 h-6"
              src={profile}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
