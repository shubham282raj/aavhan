import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col pt-12 gap-10 sm:gap-0 lg:flex-row lg:min-h-[80vh] select-none">
      <div className="flex flex-col gap-6 sm:gap-10 lg:justify-center md:pl-8">
        <div className="text-7xl text-white font-bold">Aavhan Unify</div>
        <div className="text-3xl text-white">College Ambassador Program</div>
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
  );
}
