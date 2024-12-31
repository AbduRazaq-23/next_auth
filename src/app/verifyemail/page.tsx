"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const verifyEmail = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const VerifyEmails = async () => {
    try {
      setLoading(true);
      await axios.post("/api/user/verifyemail", { token });
      console.log("verify email successfully");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [token]);

  return (
    <div className="w-full min-h-screen flex flex-col space-x-5 justify-center items-center">
      <p>{token}</p>
      <button
        onClick={() => VerifyEmails()}
        className="w-[70%] md:w-[50%]  bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      >
        {loading ? "VerifyEmail..." : "VerifyEmail"}
      </button>
    </div>
  );
};

export default verifyEmail;
