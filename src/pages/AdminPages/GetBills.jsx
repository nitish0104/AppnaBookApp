import React, { useEffect, useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import CustomerCard from "../../components/cards/HomeCard";

import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContextAuth } from "../../context/ThemeContext";
import noItems from "../../images/noItems.svg";
import PageLoader from "../../components/PageLoader";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillPreviewModal from "../../Modal/BillPreviewModal";
const GetBills = () => {
  const { allCustomer } = ContextAuth();
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterResults, setFilterResults] = useState([]);
  const { isDarkMode } = ThemeContextAuth();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const finalData = businessBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      console.log(bill?.createdAt);
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: Number(moment(bill?.createdAt).format("x")),
      };
    });
    if (start && end) {
      let milisecondsStart = Number(moment(start).format("x"));
      let milisecondsEnd = Number(moment(end).format("x")) + 86400000;
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            milisecondsStart <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < milisecondsEnd
          );
        })
      );
    }
  };
  useEffect(() => {
    setLoading(true);
    try {
      axios("https://khatabook-one.vercel.app/getbusinessbill", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setBusinessBills(res?.data?.response);
          // console.log(res?.data?.response);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFilterResults(businessBills);
  }, [businessBills]);

  const handleButtonClick = (phoneNumber) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const contentRef = useRef(null);

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredDates, setFilteredDates] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showBillPreview, setShowBillPreview] = useState(false);
  const [customerID, setCustomerID] = useState("");

  const handleFilterChange = (event) => {
    setSelectedDate("");
    setFilteredDates("");
    setFilter(event.target.value);
    const finalData = businessBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: moment(bill?.createdAt).format("X"),
      };
    });
    if (event.target.value === "all") {
      setFilterResults(businessBills);
    } else if (event.target.value === "today") {
      const today = moment().format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === today;
        })
      );
    } else if (event.target.value === "yesterday") {
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === yesterday;
        })
      );
    } else if (event.target.value === "lastWeek") {
      const lastWeek = moment().subtract(1, "week").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastWeek <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastMonth") {
      const lastMonth = moment().subtract(1, "months").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastMonth <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastYear") {
      const lastYear = moment().subtract(1, "years").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastYear <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else {
      setFilterResults(businessBills);
    }
  };

  useEffect(() => {
    if (selectedDate?.length !== 0) {
      setFilter("all");
      let finalData = businessBills?.map((bills) => {
        let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD");
        return {
          ...bills,
          filterDate: finalDate,
        };
      });
      const filteredResults = finalData?.filter((data) => {
        return data?.filterDate === selectedDate;
      });
      setFilterResults(filteredResults);
    } else {
      setFilterResults(businessBills);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (filteredDates?.length !== 0) {
      setFilter("all");
      let finalData = businessBills?.map((bills) => {
        let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD");
        return {
          ...bills,
          filterDate: finalDate,
        };
      });
      const filteredResults = finalData?.filter((data) => {
        return data?.filterDate === filteredDates;
      });
      setFilterResults(filteredResults);
    } else {
      setFilterResults(businessBills);
    }
  }, [filteredDates]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClick = (_id) => {
    console.log(_id);
    setCustomerID(_id);
    setShowBillPreview(true);
  };

  return (
    <>
      <BillPreviewModal
        showModal={showBillPreview}
        setShowModal={setShowBillPreview}
        billID={customerID}
      />
      <LayoutMain>
        <Sidebar />
        <div className=" md:w-[70vw] w-[100vw]  flex justify-center items-center  my-9 mx-auto">
          <div>
            <div className="flex flex-col justify-center gap-y-2">
              <div className="flex justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Date"
                  selectsRange
                  dateFormat="dd/MMM/yyyy"
                  popperPlacement="bottom-start"
                  className="outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-fit w-fit "
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div>
                      <button onClick={decreaseMonth}>{"<"}</button>
                      <span>{moment(date).format("MMM yyyy")}</span>
                      <button onClick={increaseMonth}>{">"}</button>
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-center items-center gap-x-4 mb-4 px-9">
                <select
                  id="filter"
                  value={filter}
                  onChange={handleFilterChange}
                  className=" outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-1/2"
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastYear">Last Year</option>
                </select>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  className=" outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-1/2"
                />
              </div>
            </div>

            {!loading ? (
              <div ref={contentRef} data-aos="flip-right">
                {filterResults?.length > 0 ? (
                  <div className="md:grid md:grid-cols-2 md:gap-2 md:w-[50vw] gap-y-3 px-7 md:px-0 w-[100vw] pb-5">
                    {filterResults?.map((customer, index) => {
                      const dateObj = new Date(customer?.createdAt);
                      // console.log(customer);
                      return (
                        <CustomerCard
                          onClick={handleClick}
                          data={customer}
                          key={customer?.customerId?._id + index}
                          name={customer?.customerId?.customerName}
                          date={dateObj}
                          amount={customer?.grandtotal}
                          discount={customer?.discount}
                          id={customer?.customerId?._id}
                          billId={customer?._id}
                          mobileNumber={customer?.customerId?.customerNumber}
                          grandTotal={customer?.grandtotal}
                          time={moment(customer?.createdAt).format("h:mm a")}
                          paid={customer?.paid}
                          unPaid={customer?.unPaid}
                          div={
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-start "
                              phoneNumber={customer?.customerNumber}
                              message={message}
                              onClick={() => {
                                handleButtonClick(customer?.customerNumber);
                              }}
                            >
                              <BsWhatsapp className="text-2xl"></BsWhatsapp>
                            </button>
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className=" mt-36   px-8 ">
                    <div className="flex md:justify-around flex-col justify-center items-center md:flex-row">
                      <div className="w-[40%] md:w-[20%] ">
                        <img src={noItems} alt="" />
                      </div>

                      <div
                        className={`flex flex-col justify-center items-center   text-${
                          isDarkMode ? "black" : "gray-800"
                        } p-4`}
                      >
                        <span className="font-mono    text-xl">
                          Oop's! No Data Available.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <PageLoader className={"h-[60vh]"} />
            )}
          </div>
        </div>
        <Navigation />
      </LayoutMain>
    </>
  );
};

export default GetBills;
