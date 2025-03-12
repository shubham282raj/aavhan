import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import Incentives from "./pages/Incentives";
import Structure from "./pages/Structure";

// Layout component including Navbar and Outlet for nested routes
const CaLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This will render the nested routes */}
  </>
);

export default function AppCA() {
  return (
    <Router>
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
    </Router>
  );
}
