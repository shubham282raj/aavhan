import Faqs from "../components/Faqs";
import Contact from "../components/Contact";
import AboutSection from "../components/AboutSection";
import LandingPage from "../components/LandingPage";
import layeredSVG from "../svg/layered.svg";
import Footer from "../components/Footer";
import ImageSliderLoaders from "../components/ImageSliderLoaders";
import ImageSlider2 from "../components/ImageSlider2";
import Sponsors from "../components/Sponsors";
import BelowLandingPage from "../components/BelowLandingPage";

export default function Home() {
  return (
    <div className="relative">
      <LandingPage />
      {/* <BelowLandingPage /> */}
      <AboutSection />
      <Sponsors />
      <ImageSliderLoaders sheetName="Facilities" />
      <ImageSliderLoaders sheetName="Past Events" />
      {/* <ImageSlider2 /> */}
      <img
        src={layeredSVG}
        alt="layeredSVG"
        className="aspect-[3.6] object-cover object-bottom w-full relative -z-10 sm:-translate-y-10"
      />
      <div className="bg-slate-900 relative sm:-translate-y-16">
        <div className="m-auto max-w-screen-md">
          <Faqs />
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
}
