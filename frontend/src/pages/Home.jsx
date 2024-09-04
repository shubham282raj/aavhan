import { Link } from "react-router-dom";
import Incentives from "../components/Incentives";
import Faqs from "../components/Faqs";
import Contact from "../components/Contact";
import AboutSection from "../components/AboutSection";

export default function Home() {
  return (
    <div>
      <div className="relative w-full flex flex-col pt-12 gap-10 sm:gap-0 lg:flex-row select-none my-10 mb-16">
        <div className="flex flex-col gap-6 sm:gap-10 lg:justify-center md:pl-8">
          <div>
            <div className="text-7xl text-white font-bold">Aavhan Unify</div>
            <div className="text-3xl text-white mt-3">
              College Ambassador Program
            </div>
          </div>
          <Link
            to={"/register"}
            className="text-3xl font-semibold text-center w-fit px-5 py-5 rounded-xl text-white border hover:bg-white hover:text-slate-800  transition-all"
          >
            Register Now!
          </Link>
        </div>
        <img
          src="/sports_vector.png"
          alt="sports_vector_image"
          className="w-fit h-fit ml-auto lg:mt-auto"
        ></img>
      </div>
      <div className="flex flex-col gap-10 my-10 cursor-default select-none sm:px-10 max-w-screen-lg m-auto">
        <AboutSection />
        <Incentives />
        <Faqs />
        <Contact />
      </div>
    </div>
  );
}
