import { useState } from "react";

function Faq({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-lg px-8 py-5 select-none cursor-pointer"
      onClick={() => setOpen((val) => !val)}
    >
      <div className="text-slate-800 text-base font-bold flex flex-row justify-between">
        <span>{faq.question}</span>
        <span
          className="transition-all"
          style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
        >
          ^
        </span>
      </div>
      {open && <div className="text-black">{faq.answer}</div>}
    </div>
  );
}

export default function Faqs() {
  const faqs = [
    {
      question: "What kind of work am I required to do? ",
      answer:
        "You will be publicizing the events of  Aavhan, the annual sports fest of IIT Bombay in your college and will be assigned to do tasks designed to enhance your skills.",
      open: false,
    },
    {
      question: "What will I gain out of it? ",
      answer:
        "You will gain an experience which will help you develop your time management skills, team spirit and you will become a part of the sporting family of IIT Bombay. Also certificates from Aavhan IIT Bombay, gift packs, sports analysis workshops  & internship opportunities in various named NGOs will be given to the deserving Campus Ambassadors.",
      open: false,
    },
    {
      question: "How will we receive updates about tasks?",
      answer:
        "You will be informed about the task through the Campus Ambassador Dashboard, social media handles as well as WhatsApp groups",
      open: false,
    },
    {
      question: "Who can join the program?",
      answer:
        "Students from any college, stream, year of college can apply for the Campus Executive Internship Program.",
      open: false,
    },
  ];
  return (
    <div className="max-w-screen-lg w-full m-auto">
      <div className="text-white text-4xl font-bold text-center pb-3">FAQs</div>
      <div className="flex flex-col gap-2">
        {/* {incentives.map((incentive) => (
          <div className="bg-white rounded-lg px-8 py-5">
            <div className="text-slate-800 text-xl font-bold">
              {incentive[0]}
            </div>
            <div className="text-black">{incentive[1]}</div>
          </div>
        ))} */}
        {faqs.map((faq) => (
          <Faq faq={faq} />
        ))}
      </div>
    </div>
  );
}
