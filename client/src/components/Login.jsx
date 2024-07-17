import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Invalid credentials");
    }

    const { jwtToken } = JSON.parse(sessionStorage.getItem("user"));

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/login`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(data);

      if (jwtToken) {
        toast.success("Successfully signed in");
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <Toaster />
      <form className="flex flex-col gap-5">
        <h1>Welcome Back</h1>
        <input
          type="text"
          name="name"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 w-[300px]"
        />
        <input
          type="password"
          name="name"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-600 w-[300px]"
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-[100px] border border-gray-600"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
