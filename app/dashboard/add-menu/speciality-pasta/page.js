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

const SpecialityPastaForm = () => {
  const data = useSelector((state) => state);
  const [branch, setBranch] = useState(
    data.userData.userInfo && data.userData.userInfo.branchName
  );
  const [updateButton, setUpdateButton] = useState(false);
  const [specialityPastaData, setSpecialityPastaData] = useState({
    name: "",
    description: "",
    image: "",
    servedWith: [],
    prices: {
      medium: "",
      large: "",
    },
    branch: data.userData.userInfo && data.userData.userInfo.branchName,
  });

  const servedWithOptions = ["GARLIC TOAST"];

  const handleChange = (value, field) => {
    setUpdateButton(true);
    setSpecialityPastaData({ ...specialityPastaData, [field]: value });
  };

  const handlePriceChange = (value, size) => {
    setUpdateButton(true);
    setSpecialityPastaData({
      ...specialityPastaData,
      prices: {
        ...specialityPastaData.prices,
        [size]: value,
      },
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/specialtypasta",
        specialityPastaData
      )
      .then((res) => {
        if (
          res.data.message ===
          "Your Specialty Pasta Item Successfully Created!!"
        ) {
          location.reload();
          toast.success(res.data.message);
          setSpecialityPastaData({
            name: "",
            description: "",
            image: "",
            servedWith: [],
            prices: {
              medium: "",
              large: "",
            },
            branch:
              data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding speciality pasta:", error);
        toast.error("Error adding speciality pasta. Please try again.");
      });
  };

  const handleDelete = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/deletespecialtypasta",
        {
          id: _id,
        }
      )
      .then(() => {
        location.reload();
      });
  };

  const [allSpecialityPastas, setAllSpecialityPastas] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/getspecialtypastas"
      )
      .then((res) => {
        setAllSpecialityPastas(res.data);
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

  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [editItem, setEditItem] = useState();

  const handleEdit = (item, index) => {
    setUpdateButton(false);
    setEdit(true);
    setEditID(item._id);
    setEditItem(item);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setSpecialityPastaData({
      name: item.name,
      description: item.description,
      image: item.image,
      servedWith: item.servedWith,
      prices: {
        medium: item.prices.medium,
        large: item.prices.large,
      },
    });
  };

  const handleCancelEdit = () => {
    setUpdateButton(false);
    setEdit(false);
    setEditID("");
    setEditItem("");
    setSpecialityPastaData({
      name: "",
      description: "",
      image: "",
      servedWith: [],
      prices: {
        medium: "",
        large: "",
      },
      branch: data.userData.userInfo && data.userData.userInfo.branchName,
    });
  };

  const handleUpdate = () => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/updatespecialtypasta",
        {
          id: editID,
          updatedSpecialtyPasta: specialityPastaData,
        }
      )
      .then((res) => {
        if (
          res.data.message ===
          "Your Specialty Pasta Item Successfully Updated!!"
        ) {
          location.reload();
          toast.success(res.data.message);
          setSpecialityPastaData({
            name: "",
            description: "",
            image: "",
            servedWith: [],
            prices: {
              medium: "",
              large: "",
            },
            branch:
              data.userData.userInfo && data.userData.userInfo.branchName,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating speciality pasta:", error);
        toast.error("Error updating speciality pasta. Please try again.");
      });
  };

   // panzarotti available status functionality
   let handleNotAvailable = (_id) => {
    axios
      .post(
        "https://jomaas-backend.onrender.com/api/v1/add-menu/specialtypastastatus",
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
        "https://jomaas-backend.onrender.com/api/v1/add-menu/specialtypastastatus",
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
          Update your speciality pasta item - {editItem.name}
        </h3>
      ) : (
        <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Add your speciality pasta items
        </h3>
      )}
      <Input
        placeholder="Speciality Pasta Name"
        value={specialityPastaData.name}
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <Input
        placeholder="Speciality Pasta Description"
        value={specialityPastaData.description}
        onChange={(e) => handleChange(e.target.value, "description")}
      />
      <Input
        placeholder="Image URL"
        value={specialityPastaData.image}
        onChange={(e) => handleChange(e.target.value, "image")}
      />
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Served With"
        onChange={(value) => handleChange(value, "servedWith")}
        value={specialityPastaData.servedWith}
      >
        {servedWithOptions.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
        {/* Add options for "Served With" here */}
      </Select>
      <p className="text-p-red">Add Prices (CAD)</p>
      <div className="flex flex-wrap gap-1">
        <Input
          placeholder="Medium Speciality Pasta Price"
          type="number"
          className="w-[49%]"
          value={specialityPastaData.prices.medium}
          onChange={(e) => handlePriceChange(e.target.value, "medium")}
        />
        <Input
          placeholder="Large Speciality Pasta Price"
          type="number"
          className="w-[49%]"
          value={specialityPastaData.prices.large}
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
          Manage your all speciality pasta items from here
        </h3>
        <div className="mt-5 w-full flex justify-center flex-wrap flex-col-reverse md:flex-row gap-5">
          {allSpecialityPastas.map(
            (item, index) =>
              item.branch === branch && (
                <div className="w-full p-3 md:w-[32%] bg-p-yellow flex flex-col gap-y-3">
                  <img src={item.image} className="w-full h-auto" />

                  <h4 className="text-[20px] text-p-red mt-3 font-semibold capitalize ">
                    {item.name}
                  </h4>
                  <small className="text-p-brown">{item.description}</small>
                  <div className="">
                    <h4 className="text-[17px] mb-2 text-p-red font-semibold capitalize ">
                      Served With
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {item.servedWith.map((servedWithItem, index) => (
                        <li className="p-1 rounded-lg text-[10px] text-white bg-green-700">
                          {servedWithItem}
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
                        <span className="font-semibold">Medium:</span>{" "}
                        {item.prices.medium}
                      </li>
                      <li className="text-p-brown">
                        <span className="font-semibold">Large:</span>{" "}
                        {item.prices.large}
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

export default SpecialityPastaForm;
