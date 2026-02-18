"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Nav from "../_components/_nav/Nav";
import TopNav from "../_components/_topNav/TopNav";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:8000");

export default function DashboardLayout({ children }) {
  let data = useSelector((state) => state);
  let router = useRouter();
  useEffect(() => {
    if (!data.userData.userInfo) {
      router.push("/");
    }
  }, []);


  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <TopNav />
      <div className="flex ">
        <Nav />
        {children}
      </div>
    </section>
  );
}
