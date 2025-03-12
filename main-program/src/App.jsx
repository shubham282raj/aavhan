import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ScrollToHash from "./components/ScrollToHash";
import Gallery from "./pages/Gallery";
import OurTeam from "./pages/OurTeam";
import Register from "./pages/Register";
import MainFest from "./pages/MainFest";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <ScrollToHash />
      <Outlet />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="team" element={<OurTeam />} />
          <Route path="mainfest" element={<MainFest />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
