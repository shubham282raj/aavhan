import ScrollTranslateComponent from "../caComponents/OnScroll";
import certificate from "../svg/certificate.svg";
import workshop from "../svg/workshop.svg";
import gift from "../svg/gift.svg";
import referral from "../svg/referral.svg";
import { useAppContext } from "../contexts/AppContext";

export default function Incentives() {
  const incentives = useAppContext()?.genSheet?.["Incentives"] || [];

  return (
    <div className="px-3 mt-[80px] overflow-hidden py-2 max-w-screen-xl mx-auto">
      <div className="text-slate-800 text-4xl font-bold text-center pb-3">
        INCENTIVES
      </div>
      <div className="text-white text-center flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3">
        {incentives.map((incentive, index) => (
          <ScrollTranslateComponent
            element={
              <>
                <div className="text-xl font-bold">{incentive.heading}</div>
                {incentive.icon && (
                  <img
                    src={incentive.icon}
                    alt={incentive.heading}
                    className="h-32 m-auto"
                  />
                )}
                <div className="">{incentive.description}</div>
              </>
            }
            className="text-slate-800 bg-white bg-opacity-60 shadow-slate-400 shadow-md rounded-lg px-4 py-5 sm:w-[46%]"
            from={index % 2 ? "translateX(200px)" : "translateX(-200px)"}
            to="translateX(0px)"
            // opacity={true}
            // time="1s"
          />
        ))}
      </div>
    </div>
  );
}
