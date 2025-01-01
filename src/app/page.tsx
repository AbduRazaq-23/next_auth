"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for the profile
interface Profile {
  firstName?: string; // Optional in case the API does not return it
  lastName?: string;
  email?: string;
}

export default function Home() {
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Render profile's firstName if available */}
        {profile?.firstName ? (
          <h1 className="text-2xl font-bold">Welcome, {profile.firstName}!</h1>
        ) : (
          <p>Loading profile...</p>
        )}
      </main>
    </div>
  );
}
