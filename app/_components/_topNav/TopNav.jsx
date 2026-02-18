"use client";
import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { activeUser } from "@/app/_slices/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Switch } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopNav = () => {
  let data = useSelector((state) => state);
  let disp = useDispatch();
  let router = useRouter();

  const [shopToggle, setShopToggle] = useState(false);

  let handlelogout = () => {
    Cookies.remove("adminData");
    disp(activeUser(null));
    router.push("/");
  };

  const handleShopToggle = (data) => {
    setShopToggle(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://jomaasbackendai.onrender.com/api/v1/jomaas/shop/toggle",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "user",
        password: "postToken",
      },
      data: { isActive: data },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setShopToggle(response?.data?.success);

          if (response?.data?.success) {
            toast.success("Shop is now On");
          } else {
            toast.success("Shop is now Off");
          }
        } else {
          setShopToggle(!data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://jomaasbackendai.onrender.com/api/v1/jomaas/shop/status",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setShopToggle(response?.data?.success);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return (
    <div className="fixed py-[20px] px-[10px] shadow-lg bg-p-yellow w-full flex items-center z-[9999] justify-end top-0 right-0">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex items-center gap-2 px-3 py-1 mr-5 font-semibold border text-p-red rounded-3xl">
        Turn on your shop
        <Switch
          checked={shopToggle}
          className="!bg-[#d1d1d1] shadow-inner"
          onChange={(tf) => handleShopToggle(tf)}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <span className="font-semibold text-p-brown">
          Jomaa's Pizza & Donair,{" "}
          {data.userData.userInfo && data.userData.userInfo.branchName}-Branch.
        </span>
        <div className="border-l border-p-red pl-[10px]  cursor-pointer flex items-center font-bold underline text-p-red">
          <div onClick={handlelogout} className="flex items-center gap-x-1">
            <IoMdLogOut className="text-[20px]" /> <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
