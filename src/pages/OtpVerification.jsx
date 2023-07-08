import React, { useEffect, useState } from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_logo from "../images/temp_logo.svg";
import LoginWithOTP from "../components/Button/LoginWithOTP";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const VerifyOTP = () => {
  const { mobileNo, setmobileNo } = ContextAuth();

  const navigate = useNavigate();

  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);
  // const stringOTP = otp.join("");
  // Function to handle input change for mobile number

  // const handleChange = (e, index) => {
  //   const { value } = e.target;

  //   if (value.length <= 1 && /^\d*$/.test(value)) {
  //     const newOtp = [...otp];
  //     newOtp[index] = value;
  //     setOTP(newOtp);

  //     if (index < 5 && value !== "") {
  //       const nextInput = document.getElementById(`otp-input-${index + 1}`);
  //       nextInput.focus();
  //     }
  //   }
  // };

  // Function to start the timer
  const startTimer = () => {
    setTimerActive(true);
    setTimer(60);
  };

  // Function to handle form submission
  const handleSubmitotp = async (e) => {
    console.log(otp);
    setLoading(true);

    e.preventDefault();
    try {
      await axios(
        "https://khatabook-one.vercel.app/verifyotp",
        {
          method: "POST",
          data: {
            otp: otp,
            mobileNo: mobileNo,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(res.data.response);
          localStorage.setItem("token", res.data.response);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }

    console.log(otp);
    // Perform mobile number verification here

    // Start the timer
    // startTimer();
  };
  useEffect(() => {
    toast.success("OTP send !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: false,
      theme: "light",
    });
    AOS.init();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [timer]);

  return (
    <LayoutManin>
      <div
        className="w-screen h-screen   md:flex md:items-center md:justify-center "
        data-aos="zoom-in"
      >
        <div className="flex justify-center items-center bg-[#F1F1F1]  w-[100%] h-[35%] md:gap-6 md:w-[50%] md:h-screen ">
          <img
            src={temp_logo}
            alt="logo"
            className=" px-4 h-[60%] md:h-[40%]"
          />
        </div>
        <div className="flex  flex-col  justify-center items-center md:w-[50%] md:h-screen  w-[100%] h-[50%] mt-2 md:mt-0">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-center">Verification</h1>
            <h1 className="font-semibold">Please Verify to your Shop</h1>
          </div>
          <div className="flex flex-col items-center justify-center md:w-full">
            <div className="flex flex-col md:gap-3  gap-1 mt-4 md:w-[50%]">
              {isTimerActive ? (
                <div className="md:mt-4 mt-2 text-lg text-center mr-2 ">
                  <button
                    onClick={startTimer}
                    className="text-blue-500 hover:underline mt-4 mr-4"
                  >
                    Resend
                  </button>
                  <p>
                    OTP in {timer} {timer === 1 ? "Second" : "Seconds"}
                  </p>
                </div>
              ) : (
                <p>otp sent</p>
              )}
              <div className="flex justify-center space-x-2">
                <div className="mt-4">
                  <Input
                    type={"text"}
                    className={"pl-2 text-center"}
                    Label={"OTP"}
                    id={"otp"}
                    maxLength={"6"}
                    value={otp}
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                  ></Input>
                </div>
              </div>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center py-2 px-4 rounded-full   mt-4 ${
                  !loading ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={handleSubmitotp}
              >
                {!loading ? "Verify Otp" : <Spinner />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </LayoutManin>
  );
};

export default VerifyOTP;
