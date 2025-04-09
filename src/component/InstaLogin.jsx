// Replace with your actual App ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LoginWithInstagram = () => {
  console.log("Redirect URI:", REDIRECT_URI);
  const handleLogin = () => {
    const authURL = `${REDIRECT_URI}`;

    window.location.href = authURL;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Instagram
        </button>
      </div>
    </>
  );
};

export default LoginWithInstagram;
