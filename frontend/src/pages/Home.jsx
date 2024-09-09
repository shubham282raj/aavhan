import Faqs from "../components/Faqs";
import Contact from "../components/Contact";
import AboutSection from "../components/AboutSection";
import LandingPage from "../components/LandingPage";
import layeredSVG from "../svg/layered.svg";

export default function Home() {
  return (
    <div className="relative">
      <LandingPage />
      <AboutSection />
      <img
        src={layeredSVG}
        alt="layeredSVG"
        className="aspect-[3.6] object-cover object-bottom w-full relative sm:-translate-y-10"
      />
      <div className="bg-slate-900 relative sm:-translate-y-16">
        <div className="m-auto max-w-screen-lg">
          <Faqs />
          <Contact />
        </div>
      </div>
    </div>
  );
}
