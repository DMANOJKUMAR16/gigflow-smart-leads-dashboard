import axios from "axios";

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: "manoj@example.com",
          password: "password123",
        },
        {
          withCredentials: true,
        }
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;