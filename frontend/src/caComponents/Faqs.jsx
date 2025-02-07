import { useEffect, useRef, useState } from "react";
import ScrollTranslateComponent from "./OnScroll";
import { useAppContext } from "../contexts/AppContext";

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

  const faqs = useAppContext()?.genSheet?.["FAQs"] || [];

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
