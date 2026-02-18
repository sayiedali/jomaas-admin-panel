"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddMenuNav = () => {
  const pathname = usePathname();

  const addMenuNav = [
    {
      navitem: "Pizza",
      path: "/dashboard/add-menu/pizza",
    },
    {
      navitem: "2 for 1 Pizzas",
      path: "/dashboard/add-menu/two-for-one-pizzas",
    },
    {
      navitem: "Donair",
      path: "/dashboard/add-menu/donair",
    },
    {
      navitem: "Wings",
      path: "/dashboard/add-menu/wings",
    },
    {
      navitem: "Poutines",
      path: "/dashboard/add-menu/poutines",
    },
    {
      navitem: "Chicken",
      path: "/dashboard/add-menu/chicken",
    },
    {
      navitem: "Panzarotti",
      path: "/dashboard/add-menu/panzarotti",
    },
    {
      navitem: "Garlic Fingers",
      path: "/dashboard/add-menu/garlic-fingers",
    },
    {
      navitem: "Burgers",
      path: "/dashboard/add-menu/burgers",
    },
    // {
    //   navitem: "Sides",
    //   path: "/dashboard/add-menu/sides",
    // },
    {
      navitem: "Salads",
      path: "/dashboard/add-menu/salads",
    },
    {
      navitem: "Speciality Pasta",
      path: "/dashboard/add-menu/speciality-pasta",
    },
    {
      navitem: "Sub",
      path: "/dashboard/add-menu/sub",
    },
    // {
    //   navitem: "Specials",
    //   path: "/dashboard/add-menu/specials",
    // },
    {
      navitem: "Beverages",
      path: "/dashboard/add-menu/beverages",
    },
    {
      navitem: "Sauce",
      path: "/dashboard/add-menu/sauce",
    },
  ];

  return (
    <div className="flex justify-center gap-3 flex-wrap mb-10">
      {console.log(pathname)}
      {addMenuNav.map((item, index) => (
        <Link
          className={`${
            pathname === item.path
              ? "text-p-yellow bg-p-red"
              : "bg-p-yellow text-p-red"
          } px-[15px] py-[10px] capitalize  hover:bg-p-red hover:text-p-yellow duration-300 rounded-lg `}
          href={item.path}
        >
          {item.navitem}
        </Link>
      ))}
    </div>
  );
};

export default AddMenuNav;
