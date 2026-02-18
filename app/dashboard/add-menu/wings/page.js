"use client";
import React, { useEffect, useState } from "react";
import { Select, Input } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

const WingsForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const [wingsData, setWingsData] = useState({
    name: "",
    description: "",
    image: "",
    pieces: "",
    tossedIn: [],
    prices: "",
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setWingsData({ ...wingsData, [field]: value });
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/wings",
        wingsData
      )
      .then((res) => {
        if (res.data.message === "Your Wings Item Successfully Created!!") {
          location.reload();
          toast.success(res.data.message);
          setWingsData({
            name: "",
            description: "",
            image: "",
            pieces: "",
            tossedIn: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding wings:", error);
        toast.error("Error adding wings. Please try again.");
      });
  };

  // delete wings function
  let handleDelete = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/deletewings", {
        id: _id,
      })
      .then(() => {
        location.reload();
      });
  };

  // get all wings
  let [allWings, setAllWings] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/add-menu/getwings")
      .then((res) => {
        setAllWings(res.data);
      });
  }, []);

  // tossedIn array
  const tossedInOptions = [
    "Screamin'Hot",
    "BBQ",
    "Honey Garlic",
    "Salt & Pepper",
    "Lemon Pepper",
    "Teriyaki",
    "Sweet Chili",
    "Mild Sauce",
  ];

  // edit functionalities
  let [edit, setEdit] = useState(false);
  let [editID, setEditID] = useState("");
  let [editItem, setEditItem] = useState();
  let handleEdit = (item, index) => {
    setUpdateButton(false);
    setEdit(true);
    setEditID(item._id);
    setEditItem(item);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    setWingsData({
      name: item.name,
      description: item.description,
      image: item.image,
      pieces: item.pieces,
      tossedIn: item.tossedIn,
      prices: item.prices,
    });
  };

  let handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setWingsData({
      name: "",
      description: "",
      image: "",
      pieces: "",
      tossedIn: [],
      prices: "",
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // update the wings data from database
  let handleUpdate = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/updatewings", {
        id: editID,
        updatedWings: wingsData,
      })
      .then((res) => {
        if (res.data.message === "Your Wings Item Successfully Updated!!") {
          location.reload();
          toast.success(res.data.message);
          setWingsData({
            name: "",
            description: "",
            image: "",

            pieces: "",

            tossedIn: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating wings:", error);
        toast.error("Error updating wings. Please try again.");
      });
  };

  // WINGS available status functionality
  let [availableBtn, setAvailableBtn] = useState(false);

  let handleNotAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/wingsstatus", {
        id: _id,
        status: "not-available",
      })
      .then(() => {
        location.reload();
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/wingsstatus", {
        id: _id,
        status: "available",
      })
      .then(() => {
        location.reload();
      });
  };

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

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-10">
      <ToastContainer />
      {editItem ? (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Update your wings item - {editItem.name} {` (${editItem.pieces})`}{" "}
          Pcs
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your wings items
        </h3>
      )}
      <Input
        placeholder="Wings Name"
        value={wingsData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input.TextArea
        placeholder="Wings Description"
        value={wingsData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={wingsData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <div className="flex gap-4">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Select Tossed In"
          onChange={(value) => handleChange(value, "tossedIn")}
          value={wingsData.tossedIn}
        >
          {tossedInOptions.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Pieces"
          type="number"
          value={wingsData.pieces}
          onChange={(e) => handleChange(e.target.value, "pieces")}
        />
      </div>
      <Input
        placeholder="Wings Price (CAD)"
        type="number"
        value={wingsData.prices}
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
          Manage your all wings items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allWings &&
            allWings.map(
              (item, index) =>
                item.branch === branch && (
                  <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                    <img src={item.image} className="w-full h-auto" />

                    <h4 className="text-[20px] text-p-red font-semibold capitalize ">
                      {item.name} ({item.pieces && item.pieces}Pcs)
                    </h4>
                    <p className="text-[12px] text-p-brown">
                      {item.description}
                    </p>
                    <div className="">
                      <h4 className="text-[17px] mb-2 text-p-red font-semibold capitalize ">
                        Tossed In
                      </h4>
                      <ul className="flex flex-wrap gap-3">
                        {item.tossedIn.map((item, index) => (
                          <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="">
                      <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                        Price (CAD)
                      </h4>
                      <p className="text-p-brown">{item.prices}</p>
                    </div>
                    <div className="text-end">
                      <small className="font-semibold text-p-brown">
                        created: {formatDateTime(item.createdAt)}
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

export default WingsForm;
