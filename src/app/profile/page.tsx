"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the type for the profile
interface Profile {
  firstName?: string; // Optional in case the API does not return it
  lastName?: string;
  email?: string;
}

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null); // Properly typed initial state

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get<{ data: Profile }>("/api/user/me");
        setProfile(res.data.data); // Correctly typed response
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);

  const handleLogOut = async () => {
    try {
      const res: any = await axios.get("/api/user/logout");
      console.log(res.message);
      router.push("/");
      toast.success("logout successfully", { position: "top-right" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-center mx-auto ">
        {/* Render profile's firstName if available */}
        {profile?.firstName && profile?.lastName ? (
          <h1 className="text-2xl font-bold">
            Welcome, {profile.firstName} {profile.lastName}!
          </h1>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      <button
        onClick={() => handleLogOut()}
        className="mt-10 border border-gray-500 rounded-md px-4 py-2"
      >
        logout
      </button>
    </div>
  );
}
