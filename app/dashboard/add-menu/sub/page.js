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

const SubForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const toppings = ["MAYO", "MUSTARD","SWEET SAUCE","GARLIC","SOUR CREAM","TZATZIKI"];
  const servedWith = [
    "SALAMI",
    "CHEESE",
    "LETTUCE",
    "TOMATO",
    "ONIONS",
    "HAM",
    "TURKEY CHEESE",
    "PEPPERONI",
    "DONAIR",
    "PIZZA SAUCE",
    "COOCKED ONIONS",
    "PINEAPPLE",
  ];
  const [subData, setSubData] = useState({
    name: "",
    description: "",
    image: "",
    servedWith: [],
    toppings: [],
    prices: "",
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setSubData({ ...subData, [field]: value });
  };

  const handleSubmit = () => {
    // Validate the form data here if needed

    // Send data to the backend using Axios
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/sub", subData)
      .then((res) => {
        if (res.data.message === "Your Sub Item Successfully Created!!") {
          location.reload();
          toast.success(res.data.message);
          setSubData({
            name: "",
            description: "",
            image: "",
            servedWith: [],
            toppings: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error adding sub item:", error);
        toast.error("Error adding sub item. Please try again.");
      });
  };

  // Read sub items
  let [allSubs, setAllSubs] = useState([]);
  useEffect(() => {
    axios.get("https://jomaas-backend.onrender.com/api/v1/add-menu/getsubs").then((res) => {
      setAllSubs(res.data);
    });
  }, []);

  // Delete sub item
  let handleDelete = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/deletesub", { id: _id })
      .then(() => {
        location.reload();
      });
  };

  // Update or edit sub item
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

    setSubData({
      name: item.name,
      description: item.description,
      image: item.image,
      servedWith: item.servedWith,
      toppings: item.toppings,
      prices: item.prices,
    });
  };

  let handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setSubData({
      name: "",
      description: "",
      image: "",
      servedWith: [],
      toppings: [],
      prices: "",
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // Update the sub data from the database
  let handleUpdate = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/updatesub", {
        id: editID,
        updatedSub: subData,
      })
      .then((res) => {
        if (res.data.message === "Your Sub Item Successfully Updated!!") {
          location.reload();
          toast.success(res.data.message);
          setSubData({
            name: "",
            description: "",
            image: "",
            servedWith: [],
            toppings: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error updating sub item:", error);
        toast.error("Error updating sub item. Please try again.");
      });
  };
  //   date format function
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

  // Sub available status functionality
  let handleNotAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/substatus", {
        id: _id,
        status: "not-available",
      })
      .then(() => {
        location.reload();
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/substatus", {
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
          Update your sub item - {editItem.name}
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your sub items
        </h3>
      )}
      <Input
        placeholder="Sub Name"
        value={subData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input.TextArea
        placeholder="Sub Description"
        value={subData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={subData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Served With"
        onChange={(value) => handleChange(value, "servedWith")}
        value={subData.servedWith}
      >
        {servedWith.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <div className="">
      <small className="text-p-red">You can skip Topped With items if you dont want to serve anything on top of your sub.</small>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Topped With"
        onChange={(value) => handleChange(value, "toppings")}
        value={subData.toppings}
      >
        {toppings.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      </div>
      <Input
        placeholder="Prices (CAD)"
        type="number"
        value={subData.prices}
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
          Manage all your sub items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allSubs.map(
            (item, index) =>
              item.branch === branch && (
                <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                  <img src={item.image} className="w-full h-auto" />

                  <h4 className="text-[20px] text-p-red mt-3 font-semibold capitalize ">
                    {item.name}
                  </h4>
                  <p className="text-[12px] text-p-brown">{item.description}</p>
                  <div className="">
                    <h4 className="text-[17px] mb-2 text-p-red font-semibold capitalize ">
                      Served With
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {item.servedWith.map((item, index) => (
                        <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {item.toppings.length === 0 || !item.toppings ? (
                    ""
                  ) : (
                    <div className="">
                      <h4 className="text-[17px] mb-2 text-p-red font-semibold capitalize ">
                        Topped With
                      </h4>
                      <ul className="flex flex-wrap gap-3">
                        {item.toppings.map((item, index) => (
                          <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="">
                    <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                      Prices (CAD)
                    </h4>
                    <ul>
                      <li className="text-p-brown">
                        
                        {item.prices}
                      </li>
                    </ul>
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

export default SubForm;
