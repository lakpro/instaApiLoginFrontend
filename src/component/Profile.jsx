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
      //   console.log("Response:", res);
      const data = await res.json();
      console.log("Profile data:", data);

      if (data?.error) {
        console.error("Error fetching profile:", data.error);
        //redirect to login page
        window.location.href = "/login";
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Delete cookie
      console.log("Logging out...");
      //   const res = await fetch(`${BACKEND_URL}/auth/logout`, {
      //     method: "GET",
      //     credentials: "include",
      //   });
      //   setProfile(null);
      window.location.replace(`${BACKEND_URL}/auth/logout`);
      //   console.log("Logout response:", res);
      // refresh the page to remove the cookie
      //   window.location.reload();
    } catch (err) {
      console.error("Error logging out:", err);
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
    //redirect to login page
    window.location.href = "/login";
    return (
      <div className="bg-black text-center mt-10">Failed to load profile.</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-screen bg-black my-6 py-3">
      <div className="flex flex-col sm:flex-row max-w-4xl items-center justify-center bg-[#111] p-4 rounded-2xl shadow-md">
        <div className="flex flex-col items-center justify-center p-3 sm:mr-4">
          <img
            src={profile.profile_picture_url}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </div>
        <div className="flex-1 text-white space-y-2">
          <div className="flex flex-col sm:flex-row ">
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-400">@{profile.username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-left cursor-pointer text-sm underline text-rose-500 hover:text-rose-300 pt-0 mt-0"
          >
            Logout
          </button>
          <div className="flex justify-between mt-2">
            <div className="flex pr-2 items-center ">
              <span className="font-semibold text-white pr-1">
                {profile.media_count}
              </span>
              <span className="text-gray-500">Posts</span>
            </div>
            <div className="flex px-2 items-center">
              <span className="font-semibold text-white pr-1">
                {profile.followers_count}
              </span>
              <span className="text-gray-500">Followers</span>
            </div>
            <div className="flex pl-2 items-center ">
              <span className="font-semibold text-white pr-1">
                {profile.follows_count}
              </span>
              <span className="text-gray-500">Following</span>
            </div>
          </div>

          {/* <p className="text-sm text-gray-500">ID: {profile.id}</p> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
