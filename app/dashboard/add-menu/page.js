import React from "react";
import CommonButton from "@/app/_components/_common-button/CommonButton";
import { MdAddBusiness } from "react-icons/md";

const page = () => {
  return <>
  <div className="py-[100px] flex justify-center flex-col gap-5 items-center">
      <MdAddBusiness className="text-[100px] text-p-yellow"/>
      <h3 className="text-center uppercase font-semibold text-p-brown text-[18px] py-4">
          Start Adding your Menu items
        </h3>
<CommonButton title={"start now"} href={"/dashboard/add-menu/pizza"}/>
  </div>
  </>;
};

export default page;
