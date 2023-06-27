import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { ThemeContextAuth } from "../../context/ThemeContext";

import ImageUploadComponent from "../../components/Input/ImageInput";

const Main = () => {
  const initialstate = {
    BusinessName: "",
    BusinessType: "",
    gstNo: "",
    location: "",
  };
  const { isDarkMode } = ThemeContextAuth();
  const [formState, setformState] = useState(initialstate);
  const [isEditable, setisEditable] = useState(false);

  const handleEditClick = () => {
    setisEditable(true);
  };
  const handleSaveChangesClick = () => {
    setisEditable(false);
  };
  const handleChange = (e) => {
    setformState((prevdata) => ({
      ...prevdata,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <LayoutManin>
        <Sidebar />
        <div
          className={` overflow-auto md:overflow-y-hidden w-screen min-h-screen h-auto  rounded-t-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } `}
        >
          <div className="overflow-y-auto  md:overflow-hidden flex-col justify-center items-center pt-2">
            <ImageUploadComponent></ImageUploadComponent>
            <div className="md:grid md:grid-cols-2 md:px-36">
              <div className="flex items-center gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Business Name
                  </label>
                  <div className="pl-1 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <AiOutlineShop className="text-2xl bg-transparent " />
                    <input
                      className=" py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="BusinessName"
                      type="text"
                      name="name"
                      value={formState.BusinessName}
                      onChange={handleChange}
                      placeholder="Enter Business Name"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-4 justify-center gap-x-2">
                <div className="md:w-[30vw]">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Business Type
                  </label>

                  <div className=" pl-1 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <IoBusinessOutline className="text-2xl bg-transparent " />
                    <input
                      className=" py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="BusinessType"
                      type="text"
                      name="name"
                      value={formState.BusinessType}
                      onChange={handleChange}
                      placeholder="Enter Business Type"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="gstNo"
                  >
                    GST Number
                  </label>
                  <div className=" pl-1 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <HiOutlineReceiptTax className="text-2xl bg-transparent " />
                    <input
                      className=" py-2 px-1 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="gstNo"
                      type="text"
                      name="name"
                      value={formState.gstNo}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Location
                  </label>
                  <div className=" pl-1 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <IoLocation className="text-2xl bg-transparent " />
                    <input
                      className=" py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="location"
                      type="text"
                      name="name"
                      value={formState.location}
                      onChange={handleChange}
                      placeholder="Enter Location"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center pt-4 md:pt-16 gap-x-16 justify-center ">
              <div className="flex gap-x-10 md:w-[30%] w-[70vw]">
                {isEditable ? (
                  <div className=" w-[100%] flex justify-center">
                    <button
                      type="button"
                      onClick={handleSaveChangesClick}
                      className="px-4 py-1.5 text-xl bg-green-500 text-white rounded-md hover:bg-green-600 w-[40%]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="w-[100%] flex justify-center">
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="px-4 py-1.5 text-xl bg-blue-500 text-white rounded-md hover:bg-indigo-600 w-[40%]"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Navigation />
      </LayoutManin>
    </>
  );
};

export default Main;
