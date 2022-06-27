import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<h1>LOGIN</h1>} />
    </Routes>
  );
};
