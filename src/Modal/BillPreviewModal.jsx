import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const BillPreviewModal = ({ showModal, setShowModal, billID }) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[500]"></div>
      )}
      {showModal && (
        <section className="h-[90vh] overflow-y-auto w-[100vw] md:w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[1000]">         
          <div className="fixed top-5 right-5 flex justify-end md:px-5 py-4 text-red-500">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="ml-auto"
            >
              <AiOutlineClose />
            </button>
          </div>
          {/* for developement */}
          {/* <iframe
            className="w-full h-[90vh]"
            src={`http://localhost:3000/invoice/${billID}?show=false`}
            frameborder="0"
          ></iframe>{" "} */}
          <iframe
            className="w-full h-full"
            src={`https://shopconnect.vercel.app/invoice/${billID}?show=false`}
            frameborder="0"
          ></iframe>
        </section>
      )}
    </>
  );
};

export default BillPreviewModal;
