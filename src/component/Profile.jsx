import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with your backend route to fetch Instagram user info
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile from backend...");
      const res = await fetch(`${BACKEND_URL}/profile/me`, {
        method: "GET",
        credentials: "include", // needed if using httpOnly cookie
      });
      console.log("Response:", res);
      const data = await res.json();
      console.log("Profile data:", data);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching profile...");
    fetchProfile();
  }, []);

  if (loading) {
    console.log("Loading profile...");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!profile) {
    console.log("No profile data found.");
    return <div className="text-center mt-10">Failed to load profile.</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <img
        src={profile.profile_picture_url}
        alt="Profile"
        className="w-32 h-32 rounded-full shadow-md"
      />
      <h2 className="text-2xl font-semibold">@{profile.username}</h2>
      <p className="text-gray-600">{profile.name}</p>
      <p className="text-sm text-gray-500">ID: {profile.id}</p>
    </div>
  );
};

export default UserProfile;
