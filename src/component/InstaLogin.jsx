const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
import { FaInstagram } from "react-icons/fa";
import AuroraBackground from "./Aurora";
import { Link } from "react-router-dom";

const LoginWithInstagram = () => {
  const handleLogin = () => {
    window.location.href = REDIRECT_URI;
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4"
      style={{}}
    >
      <AuroraBackground show={true} />
      <div className="bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center space-y-6 pb-5">
        <h1
          className="text-[70px] font-bolder text-white"
          style={{ fontFamily: "Cookie, cursive" }}
        >
          Welcome
        </h1>

        <button
          onClick={handleLogin}
          className="flex items-center justify-center  hover:opacity-90 transition duration-300 text-white font-semibold px-6 py-2 rounded-full shadow-lg cursor-pointer text-lg"
          style={{
            background:
              "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
          }}
        >
          <div className="flex pt-2 sm:pt-0 sm:flex-row flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <FaInstagram className=" mr-2  text-2xl" />
              Login with{" "}
            </div>
            <span
              className="ml-1 text-3xl font-light"
              style={{ fontFamily: "Cookie, cursive" }}
            >
              Instagram
            </span>
          </div>
        </button>
        <Link to={"/policy"}>
          <div className="text-gray-300">Privacy Policy</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginWithInstagram;
