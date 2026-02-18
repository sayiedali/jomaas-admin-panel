"use client";

import React, { useState, useEffect } from "react";

import { LiaSearchSolid } from "react-icons/lia";
import { FaXmark } from "react-icons/fa6";
// import { FaCheck } from "react-icons/fa";
import axios from "axios";

const page = () => {
  let [allContact, setAllContact] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/contact/getcontact")
      .then((res) => {
        setAllContact(res.data);
      });
  }, []);
  //   delete contact

  let handleDelete = (item) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/contact/deletecontact",
        { id: item._id }
      )
      .then((res) => {
        location.reload();
      });
  };

  return (
    <div className="pt-[80px] p-[10px] w-full">
      <div className="customerOrder-head">
        <h2 className="text-3xl font-bold text-center mt-5 text-p-red">
          Contact Request
        </h2>
      </div>

      <div className="pendingOrder-main w-full">
        <div className="pendingOrder-inner flex  flex-col-reverse flex-wrap gap-[50px] justify-center items-center">
          {allContact.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-[25px] my-[15px] w-full"
            >
              {/* Sumon's code here */}
              <div className="blank"></div>
              <p className=" pb-[10px] font-bold text-p-blue">
                Name: {item.name}
              </p>
              <p className=" pb-[10px] font-bold text-p-blue">
                Email: {item.email}
              </p>
              <p className=" pb-[10px] font-bold text-p-blue">
                Phone: {item.phone}
              </p>
              <p className=" pb-[10px] font-bold text-p-blue">
                Message: {item.message}
              </p>
              <div className="btn-main flex gap-3 justify-end items-center">
                <div className="accept-btn-box relative"></div>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-[30px] py-[5px] rounded-lg bg-red-500 text-white font-semibold text-[18px] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
