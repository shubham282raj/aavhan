import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ScrollToHash from "./components/ScrollToHash";
import Gallery from "./pages/Gallery";
import OurTeam from "./pages/OurTeam";
import Register from "./pages/Register";
import MainFest from "./pages/MainFest";

const MainLayout = () => {
  useEffect(() => {
    // Select the .background element
    const bgElement = document.querySelector(".background");
    if (bgElement) {
      // Change background when MainLayout is mounted
      bgElement.style.backgroundImage =
        "url('https://raw.githubusercontent.com/shinchan282nohara/public/refs/heads/main/YSP_7455.jpg')";
      bgElement.style.filter = "brightness(0.7) contrast(1.2)";
    }

    // Revert to original background when leaving MainLayout
    return () => {
      if (bgElement) {
        bgElement.style.backgroundImage = "url('/whiteBG.jpg')";
        bgElement.style.filter = "";
      }
    };
  }, []);

  return (
    <div>
      <Navbar />
      <ScrollToHash />
      <Outlet />
    </div>
  );
};

export default function AppMain() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="team" element={<OurTeam />} />
        <Route path="mainfest" element={<MainFest />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
