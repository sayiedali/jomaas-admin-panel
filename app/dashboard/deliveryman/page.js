"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  let dataUser = useSelector((data) => data.userData.userInfo?.branchName);

  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [editButtonIndex, setEditButtonIndex] = useState("");

  const [deliveryManInfo, setDeliveryManInfo] = useState();
  const [deliveryManName, setDeliveryManName] = useState("");
  const [deliveryManPhone, setDeliveryManPhone] = useState("");

  let [deliveryManDetail, setDeliveryManDetail] = useState([]);

  let [deliveryManDetailId, setDeliveryManDetailId] = useState("");
  let [deliveryManDetailName, setDeliveryManDetailName] = useState("");
  let [deliveryManDetailPhone, setDeliveryManDetailPhone] = useState("");

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://jomaasbackendai.onrender.com/api/v1/delivery/getAllDeliveryMan/${dataUser}`,
    };

    axios
      .request(config)
      .then((response) => {
        if ("data" in response.data) {
          setDeliveryManDetail(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNameChange = (e) => {
    setDeliveryManName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setDeliveryManPhone(e.target.value);
  };

  // Add
  const handleSubmit = () => {
    const deliveryManObj = {
      name: deliveryManName,
      phone: deliveryManPhone,
      branch: dataUser,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://jomaasbackendai.onrender.com/api/v1/delivery/createDeliveryMan",
      headers: {
        "Content-Type": "application/json",
      },
      data: deliveryManObj,
    };

    axios
      .request(config)
      .then((response) => {
        if ("error" in response.data) {
          toast.error(response.data.error);
        } else if ("success" in response.data) {
          setDeliveryManName("");
          setDeliveryManPhone("");
          setDeliveryManDetail((prev) => [...prev, response.data.data]);
          toast.success(response.data.success);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit
  const handleEdit = (deliveryManName, deliveryManPhone, info, id) => {
    setDeliveryManInfo(info);
    setEditButtonClicked(true);
    setEditButtonIndex(id);
    setDeliveryManName(deliveryManName);
    setDeliveryManPhone(deliveryManPhone);
  };

  // delete
  const handleDelete = (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://jomaasbackendai.onrender.com/api/v1/delivery/deleteDeleveryMan/${id}`,
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setDeliveryManDetail((el) =>
            el.filter((e) => e._id != response.data.data._id),
          );
          toast.success(response.data.success);
        } else if ("error" in response.data) {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update
  const handleUpdate = () => {
    const deliveryManObj = {
      name: deliveryManName,
      phone: deliveryManPhone,
      id: deliveryManInfo._id,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://jomaasbackendai.onrender.com/api/v1/delivery/updateDeliveryMan",
      headers: {
        "Content-Type": "application/json",
      },
      data: deliveryManObj,
    };

    axios
      .request(config)
      .then((response) => {
        if ("error" in response.data) {
          toast.error(response.data.error);
        } else if ("success" in response.data) {
          setDeliveryManName("");
          setDeliveryManPhone("");

          setEditButtonIndex("");
          setEditButtonClicked(false);
          setDeliveryManInfo();

          setDeliveryManDetail((el) => {
            let updateData = el.map((e) => {
              if (e._id == response.data.data._id) {
                return response.data.data;
              }
              return e;
            });

            return updateData;
          });

          toast.success(response.data.success);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pt-[80px] p-[10px] w-full">
      <ToastContainer position="top-center" />

      <div className="deliveryMan-head mb-[50px]">
        <h2 className="mt-5 text-3xl font-bold text-center text-p-red">
          Manage Delivery Man
        </h2>
      </div>

      <div className="flex flex-col gap-4 customer-main">
        <div className="form-input-name flex flex-col gap-2 w-[50%] mx-auto">
          <label htmlFor="Name">Name: </label>
          <input
            type="text"
            placeholder="Enter Delivery Man's Name Here"
            className="border rounded-lg py-[10px] px-3"
            value={deliveryManName}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-input-id flex flex-col gap-2 w-[50%] mx-auto">
          <label htmlFor="ID">Phone Number: </label>
          <input
            type="text"
            placeholder="Enter Delivery Man's Phone Number Here"
            className="border rounded-lg py-[10px] px-3"
            value={deliveryManPhone}
            onChange={handlePhoneChange}
          />
        </div>
        {editButtonClicked ? (
          <button
            className="bg-p-red btn py-[15px] px-[20px] rounded-lg w-[50%] mx-auto font-bold text-[20px] text-p-yellow text-center cursor-pointer"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-p-red btn py-[15px] px-[20px] rounded-lg w-[50%] mx-auto font-bold text-[20px] text-p-yellow text-center cursor-pointer"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        )}
      </div>

      <div className="w-full pendingOrder-main">
        <div className="deliveryMan-head mt-[100px] mb-[50px]">
          <h2 className="mt-5 text-3xl font-bold text-center text-p-red">
            Manage your Delivery Man
          </h2>
        </div>

        <div className="pendingOrder-inner flex flex-col flex-wrap gap-[50px] justify-center items-center">
          {deliveryManDetail.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-[25px] my-[15px] w-full"
            >
              {/* Sumon's code here */}
              <div className="blank"></div>

              <p className="text-center pb-[30px] font-bold text-[50px] text-p-blue">
                Name: {item.name}
              </p>
              <p className="text-center pb-[30px] font-bold text-[50px] text-p-blue">
                Phone: {item.phone}
              </p>
              <div className="flex items-center justify-end gap-3 btn-main">
                {editButtonIndex === index ? (
                  ""
                ) : (
                  <div className="flex gap-3">
                    <button
                      className="edit-btn  px-[30px] py-[10px]  rounded-lg bg-green-500 text-white cursor-pointer"
                      onClick={() =>
                        handleEdit(item.name, item.phone, item, index)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="px-[30px] py-[10px] rounded-lg bg-red-500 text-white cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
