import { api } from "../../lib/axios";

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      await api.post(
        "/auth/login",
        {
          email:
            "manoj@example.com",

          password:
            "password123",
        }
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <button
        onClick={handleLogin}
        className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-xl"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;