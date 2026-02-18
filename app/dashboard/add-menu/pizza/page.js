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

const PizzaForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBracnh] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const [pizzaData, setPizzaData] = useState({
    name: "",
    description: "",
    image: "",
    toppings: [],
    prices: {
      small: "",
      medium: "",
      large: "",
      extralarge: "",
    },
    // branch: Cookies.get("adminData")
    //   ? JSON.parse(Cookies.get("adminData")).branchName
    //   : "",
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setPizzaData({ ...pizzaData, [field]: value });
  };

  const handlePriceChange = (value, size) => {
    setUpdateButton(true);
    setPizzaData({
      ...pizzaData,
      prices: {
        ...pizzaData.prices,
        [size]: value,
      },
    });
  };

  const handleSubmit = () => {
    // Validate the form data here if needed

    // Send data to the backend using Axios
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/pizza",
        pizzaData
      )
      .then((res) => {
        if (res.data.message === "Your Pizza Item Successfully Created!!") {
          location.reload();
          toast.success(res.data.message);
          setPizzaData({
            name: "",
            description: "",
            image: "",
            toppings: [],
            prices: {
              small: "",
              medium: "",
              large: "",
              extralarge: "",
            },
            // branch: Cookies.get("adminData")
            //   ? JSON.parse(Cookies.get("adminData")).branchName
            //   : "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error adding pizza:", error);
        toast.error("Error adding pizza. Please try again.");
      });
  };
  //   delete product function
  let handleDelete = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/deletepizza", {
        id: _id,
      })
      .then(() => {
        location.reload();
      });
  };

  //   get all pizza
  let [allPizza, setAllPizza] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/add-menu/getpizza")
      .then((res) => {
        setAllPizza(res.data);
      });
  }, []);

  //   topping array
  const toppings = [
    "HAM",
    "SALAMI",
    "PEPPERONI",
    "BACON",
    "GROUND BEEF",
    "SAUSAGE",
    "EXTRA CHEESE",
    "FETA CHEESE",
    "ROASTED GARLIC",
    "CHEDDAR",
    "PINEAPPLE",
    "GREEN PEPPERS",
    "FRESH TOMATOES",
    "COOKED TOMATOES",
    "HOT BANANA PEPPERS",
    "ONIONS",
    "RED ONIONS",
    "BLACK OLIVES",
    "GREEN OLIVES",
    "MUSHROOM",
    "SPINACH",
    "JALAPENO",
    "SHRIMP",
    "CRAB",
    "CHICKEN",
    "DONAIR MEAT",
    "BBQ SAUCE",
    "CHICKEN BREAST",
    "SWEET SAUCE",
    "WHITE SAUCE",
    "HOT SAUCE",
    "SALSA SAUCE BASE",
    "SUN DRIED TOMATOES",
    "SOUR CREAM",
    "BLUE CHEESE",
    "GARLIC BUTTER BASE",
    "PESTO SAUCE BASE"
    
  ];

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

    setPizzaData({
      name: item.name,
      description: item.description,
      image: item.image,
      toppings: item.toppings,
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
    setPizzaData({
      name: "",
      description: "",
      image: "",
      toppings: [],
      prices: {
        small: "",
        medium: "",
        large: "",
        extralarge: "",
      },
      // branch: Cookies.get("adminData")
      //   ? JSON.parse(Cookies.get("adminData")).branchName
      //   : "",
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // update the pizza data from database
  let handleUpdate = () => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/updatepizza", {
        id: editID,
        updatedPizza: pizzaData,
      })
      .then((res) => {
        if (res.data.message === "Your Pizza Item Successfully Updated!!") {
          location.reload();
          toast.success(res.data.message);
          setPizzaData({
            name: "",
            description: "",
            image: "",
            toppings: [],
            prices: {
              small: "",
              medium: "",
              large: "",
              extralarge: "",
            },
            // branch: Cookies.get("adminData")
            //   ? JSON.parse(Cookies.get("adminData")).branchName
            //   : "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error updating pizza:", error);
        toast.error("Error updating pizza. Please try again.");
      });
  };

  // pizza available status functionality

  

  let handleNotAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/pizzastatus", {
        id: _id,
        status: "not-available",
      })
      .then(() => {
        location.reload()
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post("https://jomaas-backend.onrender.com/api/v1/add-menu/pizzastatus", {
        id: _id,
        status: "available",
      })
      .then(() => {
        location.reload()
      });
  };

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-10">
      <ToastContainer />
      {editItem ? (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Update your pizza item - {editItem.name}
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your pizza items
        </h3>
      )}
      <Input
        placeholder="Pizza Name"
        value={pizzaData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input.TextArea
        placeholder="Pizza Description"
        value={pizzaData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={pizzaData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Select Toppings"
        onChange={(value) => handleChange(value, "toppings")}
        value={pizzaData.toppings}
      >
        {toppings.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <p className="text-p-red">Add Prices (CAD)</p>
      <div className="flex flex-wrap gap-1">
        <Input
          placeholder="Small Pizza Price"
          type="number"
          className="w-[49%]"
          value={pizzaData.prices.small}
          onChange={(e) => handlePriceChange(e.target.value, "small")}
        />
        <Input
          placeholder="Medium Pizza Price"
          type="number"
          className="w-[49%]"
          value={pizzaData.prices.medium}
          onChange={(e) => handlePriceChange(e.target.value, "medium")}
        />
        <Input
          placeholder="Large Pizza Price"
          type="number"
          className="w-[49%]"
          value={pizzaData.prices.large}
          onChange={(e) => handlePriceChange(e.target.value, "large")}
        />
        <Input
          placeholder="Extra Large Pizza Price"
          type="number"
          className="w-[49%]"
          value={pizzaData.prices.extralarge}
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
          manage your all pizza items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allPizza.map(
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
                      Toppings
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {item.toppings.map((item, index) => (
                        <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                          {item}
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
                        <span className="font-semibold">Extralarge:</span>{" "}
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

export default PizzaForm;
