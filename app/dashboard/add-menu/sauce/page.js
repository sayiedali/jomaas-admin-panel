"use client";
import React, { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { InfinitySpin } from "react-loader-spinner";

const { Option } = Select;

const SauceForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const [sauceData, setSauceData] = useState({
    name: "",
    description: "",
    image: "",
    prices: "",
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setSauceData({ ...sauceData, [field]: value });
  };

  const handleSubmit = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/sauce", sauceData)
      .then((res) => {
        if (res.data.message === "Your Sauce Item Successfully Created!!") {
          location.reload();
          toast.success(res.data.message);
          setSauceData({
            name: "",
            description: "",
            image: "",
            prices: 0,
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding donair:", error);
        toast.error("Error adding donair. Please try again.");
      });
  };

  // delete donair function
  let handleDelete = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/deletesauce", {
        id: _id,
      })
      .then(() => {
        location.reload();
      });
  };

  // get all donairs
  let [allSauce, setAllsauce] = useState([]);
  useEffect(() => {
    axios.get("https://jomaas-backend.onrender.com/api/v1/add-menu/getsauce").then((res) => {
      setAllsauce(res.data);
    });
  }, []);

  // date format function
  const formatDateTime = (createdAt) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  // edit functionalities
  let [edit, setEdit] = useState(false);
  let [editID, setEditID] = useState("");
  let [editItem, setEditItem] = useState();
  let handleEdit = (item, index) => {
    setUpdateButton(false);
    setEdit(true);
    setEditID(item._id);
    setEditItem(item.name);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    setSauceData({
      name: item.name,
      description: item.description,
      image: item.image,
      prices: item.prices,
    });
  };

  let handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setSauceData({
      name: "",
      description: "",
      image: "",
      prices: "",
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // update the donair data from database
  let handleUpdate = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/updatesauce", {
        id: editID,
        updatedSauce: sauceData,
      })
      .then((res) => {
        if (res.data.message === "Your Sauce Item Successfully Updated!!") {
          location.reload();
          toast.success(res.data.message);
          setSauceData({
            name: "",
            description: "",
            image: "",
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating sauce:", error);
        toast.error("Error updating sauce. Please try again.");
      });
  };

  // DOANIR available status functionality

  let [availableBtn, setAvailableBtn] = useState(false);

  let handleNotAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/saucestatus", {
        id: _id,
        status: "not-available",
      })
      .then(() => {
        location.reload();
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/saucestatus", {
        id: _id,
        status: "available",
      })
      .then(() => {
        location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-10">
      <ToastContainer />
      {editItem ? (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Update your Sauce item - {editItem}
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your Sauce items
        </h3>
      )}
      <Input
        placeholder="Sauce Name"
        value={sauceData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input.TextArea
        placeholder="Sauce Description"
        value={sauceData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={sauceData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Input
        placeholder="Sauce Price (CAD)"
        type="number"
        value={sauceData.prices}
        onChange={(e) => handleChange(e.target.value, "prices")}
      />

      <div className="flex justify-center">
        {edit ? (
          <div className="flex gap-3">
            {updateButton && (
              <CommonButton title={"Update"} onClick={handleUpdate} />
            )}
            <CommonButton title={"Cancel Edit"} onClick={handleCancelEdit} />
          </div>
        ) : (
          <CommonButton title={"Submit"} onClick={handleSubmit} />
        )}
      </div>
      <div className="mt-10 w-full">
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Manage your all Sauce items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allSauce &&
            allSauce.map(
              (item, index) =>
                item.branch === branch && (
                  <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                    <img src={item.image} className="w-full h-auto" />

                    <h4 className="text-[20px] mt-3 text-p-red font-semibold capitalize ">
                      {item.name}
                    </h4>
                    <p className="text-[12px] text-p-brown">
                      {item.description}
                    </p>

                    <div className="">
                      <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                        Price (CAD)
                      </h4>
                      <p className="text-p-brown">{item.prices}</p>
                    </div>
                    <div className="text-end">
                      <small className="font-semibold text-p-brown">
                        Created: {formatDateTime(item.createdAt)}
                      </small>
                      <br />
                      <small className="font-semibold text-p-brown">
                        Last Update: {formatDateTime(item.updatedAt)}
                      </small>
                    </div>
                    <div className="flex justify-center gap-3 mt-5">
                      {edit && item._id === editID ? (
                        <InfinitySpin
                          visible={true}
                          width="200"
                          color="#005B89"
                          ariaLabel="infinity-spin-loading"
                        />
                      ) : (
                        <>
                          <div
                            onClick={() => handleEdit(item, index)}
                            className="p-2 rounded-xl text-white cursor-pointer duration-300 hover:opacity-[0.7] bg-green-700"
                          >
                            Edit
                          </div>
                          <div
                            onClick={() => handleDelete(item._id)}
                            className="p-2 rounded-xl text-white cursor-pointer duration-300 hover:opacity-[0.7] bg-red-500"
                          >
                            Delete
                          </div>
                          {item.isAvailable === "not-available" ? (
                            <div
                              onClick={() => handleAvailable(item._id)}
                              className="p-2 rounded-xl text-white cursor-pointer duration-300 hover:opacity-[0.7] bg-p-blue"
                            >
                              Available
                            </div>
                          ) : (
                            <div
                              onClick={() => handleNotAvailable(item._id)}
                              className="p-2 rounded-xl text-white cursor-pointer duration-300 hover:opacity-[0.7] bg-p-red"
                            >
                              Not Available
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SauceForm;
