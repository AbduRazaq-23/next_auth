"use client";

import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col  justify-center items-center min-h-screen">
      <h1 className="text-7xl font-bold ">WelCome</h1>
      <p>AbduRazaq NextJs Developer</p>

      <div className="flex space-x-4 mt-10">
        <Link href={"/login"}>
          <button className=" border border-gray-500 rounded-md px-4 py-2">
            logIn
          </button>
        </Link>
        <Link href={"/signup"}>
          <button className=" border border-gray-500 rounded-md px-4 py-2">
            Signup
          </button>
        </Link>
      </div>
      <Toaster />
    </div>
  );
}
