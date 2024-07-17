import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Enter all the required fields");
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/signup`,
        { name, email, password }
      );

      sessionStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful");

      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <Toaster />
      <form className="flex flex-col gap-5">
        <h1>Join us today!!</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-600 w-[300px]"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 w-[300px]"
        />
        <input
          type="password"
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
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Signup;
