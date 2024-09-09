import { useEffect, useRef, useState } from "react";
import ScrollTranslateComponent from "./OnScroll";

function Faq({ faq, open, setOpen, index }) {
  // const [open, setOpen] = useState(false);
  const faqRef = useRef();

  return (
    <div
      className="bg-white bg-opacity-20 rounded-lg px-5 sm:px-8 py-5 select-none cursor-pointer text-white"
      onClick={() => setOpen((val) => (val == index ? -1 : index))}
    >
      <div className="text-base font-bold flex flex-row justify-between relative">
        <span>{faq.question}</span>
        <span
          className="transition-all absolute right-0"
          style={{
            transform: open == index ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          ^
        </span>
      </div>
      <div
        className="mt-2 overflow-hidden"
        style={{
          maxHeight:
            open == index ? faqRef.current?.scrollHeight + "px" : "0px",
          transition: `all 0.3s ease-in-out`,
        }}
        ref={faqRef}
      >
        {faq.answer}
      </div>
    </div>
  );
}

export default function Faqs() {
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    console.log(open);
  }, [open]);
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
    <div className="w-full m-auto px-3 overflow-hidden">
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
        {faqs.map((faq, index) => (
          <ScrollTranslateComponent
            element={
              <Faq faq={faq} open={open} setOpen={setOpen} index={index} />
            }
            from={index % 2 ? "scale(0)" : "scale(0)"}
            className=""
            to="scale(1)"
          />
        ))}
      </div>
    </div>
  );
}
