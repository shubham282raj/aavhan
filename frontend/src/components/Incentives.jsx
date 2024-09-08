import ScrollTranslateComponent from "./OnScroll";

export default function Incentives() {
  const incentives = [
    [
      "CERTIFICATE",
      "Certficate of completion as a Marketing Intern at Aavhan, IIT BOMBAY.",
    ],
    ["WORKSHOP", "Free coding and sports analytics workshops for top 10 CAs."],
    ["INTERNSHIP", "NGO interns/interview round for top performing CA's"],
    [
      "College Thrill",
      "Enjoy 5-10% discount for your college students in the Aavhan Main Festival",
    ],
    [
      "Gift Pack of Sponsors",
      "Chance to win glorious giveaways from noteworthy sponsors and Aavhan",
    ],
    [
      "Referral And Many more",
      "10% discounts to students coming through CA program.",
    ],
  ];
  return (
    <div className="px-3">
      <div className="text-slate-800 text-4xl font-bold text-center pb-3">
        INCENTIVES
      </div>
      <div className="text-white text-center flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3">
        {incentives.map((incentive, index) => (
          <ScrollTranslateComponent
            element={
              <>
                <div className="text-xl font-bold">{incentive[0]}</div>
                <div className="">{incentive[1]}</div>
              </>
            }
            className="text-slate-800 bg-black bg-opacity-15 rounded-lg px-4 py-5 sm:w-[46%]"
            // from="translateY(0px) translateX(-100px)"
            // to="translateY(0px) translateX(0px)"
            opacity={true}
            time="1s"
          />
        ))}
      </div>
    </div>
  );
}
