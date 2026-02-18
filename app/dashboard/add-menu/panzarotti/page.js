"use client";
import React, { useEffect, useState } from "react";
import { Select, Input } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

const { Option } = Select;

const PanzarottiForm = () => {
  let data = useSelector((state) => state);
  let [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  let [updateButton, setUpdateButton] = useState(false);
  const [panzarottiData, setPanzarottiData] = useState({
    description: "",
    image: "",
    toppings: [],
    comesWith: [],
    prices: "",
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setPanzarottiData({ ...panzarottiData, [field]: value });
  };

  const handleSubmit = () => {
    // Validate the form data here if needed

    // Send data to the backend using Axios
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/panzarotti",
        panzarottiData
      )
      .then((res) => {
        if (
          res.data.message === "Your Panzarotti Item Successfully Created!!"
        ) {
          location.reload();
          toast.success(res.data.message);
          setPanzarottiData({
            description: "",
            image: "",
            toppings: [],
            comesWith: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error adding panzarotti:", error);
        toast.error("Error adding panzarotti. Please try again.");
      });
  };

  // delete panzarotti function
  let handleDelete = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/deletepanzarotti",
        {
          id: _id,
        }
      )
      .then(() => {
        location.reload();
      });
  };

  // get all panzarotti
  let [allPanzarotti, setAllPanzarotti] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/add-menu/getpanzarotti")
      .then((res) => {
        setAllPanzarotti(res.data);
      });
  }, []);
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

  // comesWith array
  const comesWith = ["MARINARA SAUCE"];
  
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

    setPanzarottiData({
      description: item.description,
      image: item.image,
      toppings: item.toppings,
      comesWith: item.comesWith,
      prices: item.prices,
    });
  };

  let handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setPanzarottiData({
      description: "",
      image: "",
      toppings: [],
      comesWith: [],
      prices: "",
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // update the panzarotti data from the database
  let handleUpdate = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/updatepanzarotti",
        {
          id: editID,
          updatedPanzarotti: panzarottiData,
        }
      )
      .then((res) => {
        if (
          res.data.message === "Your Panzarotti Item Successfully Updated!!"
        ) {
          location.reload();
          toast.success(res.data.message);
          setPanzarottiData({
            description: "",
            image: "",
            toppings: [],
            comesWith: [],
            prices: "",
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
        // Clear all fields after submission
      })
      .catch((error) => {
        console.error("Error updating Panzarotti:", error);
        toast.error("Error updating Panzarotti. Please try again.");
      });
  };

  // panzarotti available status functionality
  let handleNotAvailable = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/panzarottistatus",
        {
          id: _id,
          status: "not-available",
        }
      )
      .then(() => {
        location.reload();
      });
  };

  let handleAvailable = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/panzarottistatus",
        {
          id: _id,
          status: "available",
        }
      )
      .then(() => {
        location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-10">
      <ToastContainer />
      {editItem ? (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Update your Panzarotti item - {editItem.toppings.length } Toppings
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your Panzarotti items
        </h3>
      )}
      <Input
        placeholder="Panzarotti Description"
        value={panzarottiData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={panzarottiData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Toppings"
        onChange={(value) => handleChange(value, "toppings")}
        value={panzarottiData.toppings}
      >
        {toppings.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Comes with"
        onChange={(value) => handleChange(value, "comesWith")}
        value={panzarottiData.comesWith}
      >
        {comesWith.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <p className="text-p-red">Add Prices (CAD)</p>
      <div className="flex flex-wrap gap-1">
        <Input
          placeholder="Panzarotti Price"
          type="number"
          value={panzarottiData.prices}
          onChange={(e) => handleChange(e.target.value, "prices")}
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
          Manage your all Panzarotti items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allPanzarotti.map(
            (item, index) =>
              item.branch === branch && (
                <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                  <img src={item.image} className="w-full h-auto" />

                  <h4 className="text-[20px] mt-3 text-p-red font-semibold capitalize ">
                    {item.toppings.length} Toppings
                  </h4>
                  <p className="text-[12px] text-p-brown">{item.description}</p>
                  {item.toppings.length !== 0 && (
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
                  )}
                  <div className="">
                    <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                      Comes With
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {item.comesWith.map((item, index) => (
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
                      <li className="text-p-brown">{item.prices}</li>
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

export default PanzarottiForm;
