import { Link } from "react-router-dom";
import Incentives from "../components/Incentives";
import Faqs from "../components/Faqs";
import Contact from "../components/Contact";
import AboutSection from "../components/AboutSection";
import LandingPage from "../components/LandingPage";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <div className="flex flex-col gap-10 my-10 cursor-default select-none sm:px-10 max-w-screen-lg m-auto">
        <AboutSection />
        <Incentives />
        <Faqs />
        <Contact />
      </div>
    </div>
  );
}
