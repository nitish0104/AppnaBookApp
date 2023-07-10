import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextAuth } from "../../context/Context";

import { useRef } from "react";

import { AiOutlinePrinter } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import { ThemeContextAuth } from "../../context/ThemeContext";

const ShowSingleBill = () => {
  const [singleBill, setSingleBill] = useState();
  const [itemsSingeBill, setitemsSingeBill] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { business, formState } = ContextAuth();
  const { isDarkMode } = ThemeContextAuth();

  const contentRef = useRef(null);
  useEffect(() => {
    // window.addEventListener('afterprint', (e) => {
    //   const originalContents = document.body.innerHTML;
    //   document.body.innerHTML = originalContents;
    // })
    // window.addEventListener('beforeprint', (e) => {
    //   const printContents = document.getElementById("myDiv").innerHTML;
    //   document.body.innerHTML = printContents;
    // })
    setLoading(true);
    try {
      axios(`https://khatabook-one.vercel.app/getcustomerbill/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setSingleBill(res?.data?.response);
          console.log(res?.data?.response);
          setLoading(false);
          setitemsSingeBill(res?.data?.response?.items);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(business);
  const printableRef = useRef(null);


  return (
    <>
      <div
        className={`min-h-screen h-fit  ${isDarkMode ? "bg-gray-800 " : "bg-white "
          }`}
      >
        <div id="print">
          <Sidebar/>
          <Link
            to={`/customer-details/${singleBill?.customerId?._id}`}
            className={`flex items-center justify-center w-12 h-12 rounded-full border mt-3 ml-3  ${isDarkMode ? "text-white" : "text-gray-800 "
              } `}
          >
            <div className="  text-3xl ">
              <BiArrowBack />
            </div>
          </Link>
        </div>
        <div
          id="myDiv"
          className={`container mx-auto px-4 md:w-[70%] w-screen py-4  `}
        >
          <div className="bg-white rounded-lg shadow-lg pb-4">
            <div className="flex justify-between bg-blue-500 text-white px-6 py-4 items-center">
              <h1 className="text-2xl font-bold">Bill</h1>
              {/* <p className='font-bold text-2xl'>Date: {format(new Date(singleBill?.createdAt), "dd/MMM/yyyy")}</p> */}
              <p className="">
                Date:{" "}
                {moment(singleBill?.createdAt).format("DD MMM, YYYY  h:mm a")}
              </p>
            </div>
            <div className="flex justify-between px-6 py-4">
              <div>
                <span>
                  <h2 className="text-xl font-bold">
                    {singleBill?.businessId?.businessName}
                  </h2>
                </span>
                <h2 className="text-lg font-bold">{business?.businessType}</h2>
                <p>{singleBill?.businessId?.location}</p>

                <p>{singleBill?.businessId?.phoneNo}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {singleBill?.customerId?.customerName}
                </h2>
                <p>{singleBill?.customerId?.customerNumber}</p>
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-gray-200 text-gray-800 text-center">
                <tr>
                  <th className="sticky left-0 w-20  py-2 px-4  ">Items</th>
                  <th className="  py-2 px-4 ">Quantity</th>
                  <th className="  py-2 px-4 ">Individual Price</th>
                  <th className="  py-2 px-4 ">Total </th>
                </tr>
              </thead>
              <tbody>
                {itemsSingeBill?.map((items) => {
                  return (
                    <tr className="text-center">
                      <td className="sticky left-0 w-2/5  bg-white px-2 border whitespace-nowrap">
                        {items?.item}
                      </td>
                      <td className=" py-2  w-1/5 border whitespace-nowrap">
                        {items?.qty}
                      </td>
                      <td className=" py-2  w-1/5 border  whitespace-nowrap text-sm">
                        {items?.price} Rs
                      </td>
                      <td className=" py-2 w-1/5 border whitespace-nowrap text-sm">
                        {items?.cost} Rs
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-200 text-gray-800 ">
                <tr className="w-[50vw]">
                  <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                    Subtotal:
                  </td>
                  <td className="py-2 text-sm">{singleBill?.grandtotal} Rs</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                    Discount:
                  </td>
                  <td className="py-2  border-b border-black text-sm">
                    {singleBill?.discount} Rs
                  </td>
                </tr>

                <tr>
                  <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                    Total:
                  </td>
                  <td className="py-2  font-bold text-sm ">
                    {singleBill?.grandtotal - singleBill?.discount} Rs
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="px-4 pt-4 ">
              <p className="text-center font-bold text-xl">
                Thanks, Visit Again!
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4 mr-6 mb-3 ">
            <button
              onClick={(e) => {
                document.title = `ShopConnect - ${singleBill?.customerId?.customerName}`
                e.target.style.opacity = 0;
                document.getElementById("print").style.display = "none"
                window.print()
                e.target.style.opacity = 1;
                document.getElementById("print").style.display = ""
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-28 flex gap-4 justify-center items-center"
            >
              <AiOutlinePrinter /> Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSingleBill;
