"use client";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const PoutineForm = () => {
  const data = useSelector((state) => state);
  const [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  const [updateButton, setUpdateButton] = useState(false);
  const [poutineData, setPoutineData] = useState({
    name: "",
    description: "",
    image: "", // Add image property for Poutine
    prices: {
      medium: "",
      large: "",
    },
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setPoutineData({ ...poutineData, [field]: value });
  };

  const handlePriceChange = (value, size) => {
    setUpdateButton(true);
    setPoutineData({
      ...poutineData,
      prices: {
        ...poutineData.prices,
        [size]: value,
      },
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/poutines",
        poutineData
      )
      .then((res) => {
        if (res.data.message === "Your Poutine Item Successfully Created!!") {
          location.reload();
          toast.success(res.data.message);
          setPoutineData({
            name: "",
            description: "",
            image: "",
            prices: {
              medium: "",
              large: "",
            },
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding poutine:", error);
        toast.error("Error adding poutine. Please try again.");
      });
  };

  // delete poutine function
  const handleDelete = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/deletepoutine",
        {
          id: _id,
        }
      )
      .then(() => {
        location.reload();
      });
  };

  // get all poutines
  const [allPoutines, setAllPoutines] = useState([]);
  useEffect(() => {
    axios
      .get("https://jomaas-backend.onrender.com/api/v1/add-menu/getpoutines")
      .then((res) => {
        setAllPoutines(res.data);
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

  // edit functionalities
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [editItem, setEditItem] = useState();
  const handleEdit = (item, index) => {
    setUpdateButton(false);
    setEdit(true);
    setEditID(item._id);
    setEditItem(item);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    setPoutineData({
      name: item.name,
      description: item.description,
      prices: {
        medium: item.prices.medium,
        large: item.prices.large,
      },
      image: item.image, // Set image for editing
    });
  };

  const handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setPoutineData({
      name: "",
      description: "",
      prices: {
        medium: "",
        large: "",
      },
      image: "", // Reset image on cancel
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  // update the poutine data from database
  const handleUpdate = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/updatepoutine",
        {
          id: editID,
          updatedPoutine: poutineData,
        }
      )
      .then((res) => {
        if (res.data.message === "Your Poutine Item Successfully Updated!!") {
          location.reload();
          toast.success(res.data.message);
          setPoutineData({
            name: "",
            description: "",
            prices: {
              medium: "",
              large: "",
            },
            image: "", // Reset image after update
            branch: data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating poutine:", error);
        toast.error("Error updating poutine. Please try again.");
      });
  };

  // POUTINE available status functionality
  const [availableBtn, setAvailableBtn] = useState(false);

  const handleNotAvailable = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/poutinestatus",
        {
          id: _id,
          status: "not-available",
        }
      )
      .then(() => {
        location.reload();
      });
  };

  const handleAvailable = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/poutinestatus",
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
          Update your poutine item - {editItem.name}
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your poutine items
        </h3>
      )}
      <Input
        placeholder="Poutine Name"
        value={poutineData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input.TextArea
        placeholder="Poutine Description"
        value={poutineData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Poutine Image URL"
        value={poutineData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />

      <p className="text-p-red">Add Prices (CAD)</p>
      <div className="flex flex-wrap gap-1">
        <Input
          placeholder="Medium Poutine Price"
          type="number"
          className="w-[49%]"
          value={poutineData.prices.medium}
          onChange={(e) => handlePriceChange(e.target.value, "medium")}
        />
        <Input
          placeholder="Large Poutine Price"
          type="number"
          className="w-[49%]"
          value={poutineData.prices.large}
          onChange={(e) => handlePriceChange(e.target.value, "large")}
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
          Manage your all poutine items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allPoutines &&
            allPoutines.map(
              (item, index) =>
                item.branch === branch && (
                  <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                    <img src={item.image} alt={item.name} />

                    <h4 className="text-[20px] text-p-red font-semibold capitalize ">
                      {item.name}
                    </h4>
                    <p className="text-[12px] text-p-brown">
                      {item.description}
                    </p>
                    <div className="">
                      <h4 className="text-[17px]  text-p-red font-semibold capitalize ">
                        Price (CAD)
                      </h4>
                      <p className="text-p-brown ">
                        <span className="font-semibold">Medium:</span>
                        {item.prices.medium}
                      </p>
                      <p className="text-p-brown ">
                        <span className="font-semibold">Large:</span>
                        {item.prices.large}
                      </p>
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

export default PoutineForm;
