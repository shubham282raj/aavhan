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
    <div className="">
      <div className="text-white text-4xl font-bold text-center pb-3">
        INCENTIVES
      </div>
      <div className="text-white text-center flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3">
        {incentives.map((incentive) => (
          <div className="bg-white rounded-lg px-8 py-5 sm:w-[46%]">
            <div className="text-slate-800 text-xl font-bold">
              {incentive[0]}
            </div>
            <div className="text-black">{incentive[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
