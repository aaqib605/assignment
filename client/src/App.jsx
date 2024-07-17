import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
