"use client";
import React, { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

const { Option } = Select;

const GarlicFingersForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const [garlicFingersData, setGarlicFingersData] = useState({
    description: "",
    image: "",
    comesWith: [],
    prices: {
      small: "",
      medium: "",
      large: "",
      extralarge: "",
    },
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });
  const comesWith = ["MARINARA SAUCE","SWEET SAUCE"];
  const handleChange = (value, field) => {
    setUpdateButton(true);
    setGarlicFingersData({ ...garlicFingersData, [field]: value });
  };

  const handlePriceChange = (value, size) => {
    setUpdateButton(true);
    setGarlicFingersData({
      ...garlicFingersData,
      prices: {
        ...garlicFingersData.prices,
        [size]: value,
      },
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/garlicfingers",
        garlicFingersData
      )
      .then((res) => {
        if (res.data.message === "Your Garlic Fingers Item Successfully Created!") {
          location.reload();
          toast.success(res.data.message);
          setGarlicFingersData({
            description: "",
            image: "",
            comesWith: [],
            prices: {
              small: "",
              medium: "",
              large: "",
              extralarge: "",
            },
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding garlic fingers:", error);
        toast.error("Error adding garlic fingers. Please try again.");
      });
  };

  let handleDelete = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/deletegarlicfingers", {
        id: _id,
      })
      .then(() => {
        location.reload();
      });
  };

  let [allGarlicFingers, setAllGarlicFingers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/add-menu/getgarlicfingers")
      .then((res) => {
        setAllGarlicFingers(res.data);
      });
  }, []);

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

  let [edit, setEdit] = useState(false);
  let [editID, setEditID] = useState("");
  let [editItem, setEditItem] = useState();

  let handleEdit = (item, index) => {
    setUpdateButton(false);
    setEdit(true);
    setEditID(item._id);
    setEditItem(item);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setGarlicFingersData({
      description: item.description,
      image: item.image,
      comesWith: item.comesWith,
      prices: {
        small: item.prices.small,
        medium: item.prices.medium,
        large: item.prices.large,
        extralarge: item.prices.extralarge,
      },
    });
  };

  let handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setGarlicFingersData({
      description: "",
      image: "",
      comesWith: [],
      prices: {
        small: "",
        medium: "",
        large: "",
        extralarge: "",
      },
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  let handleUpdate = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/updategarlicfingers", {
        id: editID,
        updatedGarlicFingers: garlicFingersData,
      })
      .then((res) => {
        if (res.data.message === "Your Garlic Fingers Item Successfully Updated!") {
          location.reload();
          toast.success(res.data.message);
          setGarlicFingersData({
            description: "",
            image: "",
            comesWith: [],
            prices: {
              small: "",
              medium: "",
              large: "",
              extralarge: "",
            },
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating garlic fingers:", error);
        toast.error("Error updating garlic fingers. Please try again.");
      });
  };

  let handleNotAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/garlicfingersstatus", {
        id: _id,
        status: "not-available",
      })
      .then(() => {
        location.reload();
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/garlicfingersstatus", {
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
          Update your garlic fingers item - Garlic Fingers
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your garlic fingers items
        </h3>
      )}
      <Input
        placeholder="Garlic Fingers Description"
        value={garlicFingersData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={garlicFingersData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Comes With"
        onChange={(value) => handleChange(value, "comesWith")}
        value={garlicFingersData.comesWith}
      >
        {comesWith.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
        {/* Add options for "Comes With" here */}
      </Select>
      <p className="text-p-red">Add Prices (CAD)</p>
      <div className="flex flex-wrap gap-1">
        <Input
          placeholder="Small Garlic Fingers Price"
          type="number"
          className="w-[49%]"
          value={garlicFingersData.prices.small}
          onChange={(e) => handlePriceChange(e.target.value, "small")}
        />
        <Input
          placeholder="Medium Garlic Fingers Price"
          type="number"
          className="w-[49%]"
          value={garlicFingersData.prices.medium}
          onChange={(e) => handlePriceChange(e.target.value, "medium")}
        />
        <Input
          placeholder="Large Garlic Fingers Price"
          type="number"
          className="w-[49%]"
          value={garlicFingersData.prices.large}
          onChange={(e) => handlePriceChange(e.target.value, "large")}
        />
        <Input
          placeholder="Extra Large Garlic Fingers Price"
          type="number"
          className="w-[49%]"
          value={garlicFingersData.prices.extralarge}
          onChange={(e) => handlePriceChange(e.target.value, "extralarge")}
        />
      </div>

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
          Manage your all garlic fingers items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allGarlicFingers.map(
            (item, index) =>
              item.branch === branch && (
                <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                  <img src={item.image} className="w-full h-auto" />

                  <h4 className="text-[20px] text-p-red mt-3 font-semibold capitalize ">
                    Garlic Fingers
                  </h4>
                  <div className="">
                    <h4 className="text-[17px] mb-2 text-p-red font-semibold capitalize ">
                      Comes With
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {item.comesWith.map((comesWithItem, index) => (
                        <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                          {comesWithItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="">
                    <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                      Prices (CAD)
                    </h4>
                    <ul>
                      <li className="text-p-brown">
                        <span className="font-semibold">Small:</span>{" "}
                        {item.prices.small}
                      </li>
                      <li className="text-p-brown">
                        <span className="font-semibold">Medium:</span>{" "}
                        {item.prices.medium}
                      </li>
                      <li className="text-p-brown">
                        <span className="font-semibold">Large:</span>{" "}
                        {item.prices.large}
                      </li>
                      <li className="text-p-brown">
                        <span className="font-semibold">Extra Large:</span>{" "}
                        {item.prices.extralarge}
                      </li>
                    </ul>
                  </div>
                  <div className="text-end">
                    <small className="font-semibold text-p-brown">
                      Created: {formatDateTime(item.createdAt)}
                    </small><br />
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
                      <div className="flex flex-wrap gap-3">
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
                      </div>
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

export default GarlicFingersForm;
