import ScrollTranslateComponent from "../components/OnScroll";
import certificate from "../svg/certificate.svg";
import workshop from "../svg/workshop.svg";
import gift from "../svg/gift.svg";
import referral from "../svg/referral.svg";

export default function Incentives() {
  const incentives = [
    [
      "CERTIFICATE",
      "Certficate of completion as a Marketing Intern at Aavhan, IIT BOMBAY.",
      certificate,
    ],
    [
      "WORKSHOP",
      "Free coding and sports analytics workshops for top 10 CAs.",
      workshop,
    ],
    [
      "INTERNSHIP",
      "NGO interns/interview round for top performing CA's",
      certificate,
    ],
    [
      "College Thrill",
      "Enjoy 5-10% discount for your college students in the Aavhan Main Festival",
      referral,
    ],
    [
      "Gift Pack of Sponsors",
      "Chance to win glorious giveaways from noteworthy sponsors and Aavhan",
      gift,
    ],
    [
      "Referral And Many more",
      "10% discounts to students coming through CA program.",
      referral,
    ],
  ];
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
                <div className="text-xl font-bold">{incentive[0]}</div>
                {incentive[2] && (
                  <img
                    src={incentive[2]}
                    alt={incentive[0]}
                    className="h-32 m-auto"
                  />
                )}
                <div className="">{incentive[1]}</div>
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
