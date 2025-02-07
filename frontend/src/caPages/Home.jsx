import Faqs from "../caComponents/Faqs";
import Contact from "../caComponents/Contact";
import AboutSection from "../caComponents/AboutSection";
import LandingPage from "../caComponents/LandingPage";
import layeredSVG from "../svg/layered.svg";
import Footer from "../caComponents/Footer";
import ImageSliderLoaders from "../caComponents/ImageSliderLoaders";
import ImageSlider2 from "../caComponents/ImageSlider2";
import Sponsors from "../caComponents/Sponsors";
import BelowLandingPage from "../caComponents/BelowLandingPage";

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
