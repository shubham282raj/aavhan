export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="h-full w-full absolute -z-10">
        <img
          src="/home1.jpg"
          alt="homeBG"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute top-[15%] left-10">
        <div className="text-white text-4xl font-bold flex flex-col gap-1">
          <div>AAVHAN</div>
          <div>UNIFY</div>
        </div>
        <div className="text-white text-xl font-semibold flex flex-col gap-1">
          College Ambassador Program
        </div>
      </div>
    </div>
  );
}
