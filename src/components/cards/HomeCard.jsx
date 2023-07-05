import React, { useState } from "react";
import Modal from "../Modal/CustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const CustomerCard = ({
  name,
  date,
  mobileNumber,
  amount,
  items,
  div,
  ref,
  id
}) => {
  const navigate = useNavigate()
  const { isDarkMode } = ThemeContextAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorChange, setcolorChange] = useState(false);

  const handleColorChange = () => {
    setcolorChange(!colorChange);
  };
  const handleCardClick = () => {
    // setIsModalOpen(true);
navigate(`/customer-details/${id}`)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`bg-${isDarkMode ? "blue-200" : "cyan-50"} text-${
          isDarkMode ? "white" : "gray-800"
        } p-4 rounded-lg  shadow-md shadow-blue-300 transform  perspective-100    overflow-hidden border m-2`}
      >
        <div
          className=" py-4 flex justify-between items-center gap-x-4 "
          ref={ref}
        >
          <div className="text-start w-6/12">
            <button onClick={handleCardClick}>
              <div className="font-bold text-xl mb-2">{name}</div>

              <p className=" font-semibold mb-2 text-start">{mobileNumber}</p>
            </button>
          </div>
          <div className="w-1/12">{div}</div>
          <div className="flex flex-col justify-center items-center w-5/12">
            <button
              // className="text-3xl text-center mb-2 font-bold text-green-500"
              className={
                colorChange
                  ? "text-3xl text-center mb-2 font-bold text-red-500"
                  : "text-3xl text-center mb-2 font-bold text-green-500"
              }
              onClick={handleColorChange}
            >
              &#8377;{amount}
            </button>

            <div>
              <div>{date}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Purchased Items</h2>

          <ul>
            {items.map((item, index) => (
              <li className="text-lg text text-center text-black" key={index}>
                {item}
              </li>
            ))}
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Edit Items
          </button>
        </Modal>
      )}
    </>
  );
};

export default CustomerCard;
