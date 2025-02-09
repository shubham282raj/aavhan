import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./caComponents/Navbar";
import Home from "./caPages/Home";
import Login from "./caPages/Login";
import Register from "./caPages/Register";
import Profile from "./caPages/Profile";
import Tasks from "./caPages/Tasks";
import Leaderboard from "./caPages/Leaderboard";
import Admin from "./caPages/Admin";
import Incentives from "./caPages/Incentives";
import Structure from "./caPages/Structure";

// Layout component including Navbar and Outlet for nested routes
const CaLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This will render the nested routes */}
  </>
);

export default function AppCA() {
  return (
    <Routes>
      <Route path="/" element={<CaLayout />}>
        <Route index element={<Home />} />
        <Route path="incentives" element={<Incentives />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
        <Route path="structure" element={<Structure />} />
      </Route>
    </Routes>
  );
}
