import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ScrollTranslateComponent from "./OnScroll";

export default function LandingPage() {
  const typingHeadArray = ["Be an Ambassador", "Be our Family"];
  const [typingHead, setTypingHead] = useState("");
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const iRef = useRef(0);
  const jRef = useRef(0);
  const incRef = useRef(true);

  const typingAnimationFunction = () => {
    if (incRef.current) {
      if (jRef.current < typingHeadArray[iRef.current].length) {
        jRef.current++;
      } else {
        incRef.current = false;
        clearInterval(intervalRef.current);
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(typingAnimationFunction, 100);
        }, 2000);
      }
    } else {
      if (jRef.current > 0) {
        jRef.current--;
      } else {
        incRef.current = true;
        if (iRef.current < typingHeadArray.length - 1) {
          iRef.current++;
        } else {
          iRef.current = 0;
        }
      }
    }
    setTypingHead(typingHeadArray[iRef.current].substring(0, jRef.current));
  };

  useEffect(() => {
    intervalRef.current = setInterval(typingAnimationFunction, 100);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="h-full w-full absolute -z-10 bg-slate-900">
        <img
          src="/home2.jpg"
          alt="homeBG"
          className="h-full w-full object-cover"
        />
      </div>
      <ScrollTranslateComponent
        element={
          <>
            <div className="text-white text-4xl xl:text-6xl font-bold flex flex-col gap-1">
              <div>AAVHAN</div>
              <div>UNIFY</div>
            </div>
            <div className="text-white text-xl xl:text-2xl font-semibold flex flex-col gap-1">
              College Ambassador Program
            </div>
          </>
        }
        className="absolute top-[27%] left-10 xl:top-[50%] xl:left-[20%]"
        from="translateX(-200px) translateY(-50%)"
        to="translateX(0%) translateY(-50%)"
        opacity={true}
        time="1s"
      />
      <div className="absolute bottom-[15%] left-10 xl:top-[50%] xl:bottom-auto xl:-translate-y-1/2 xl:left-auto xl:right-[20%] w-[350px]">
        <div className="text-white text-2xl xl:text-4xl font-bold flex flex-col gap-1 mb-2">
          {typingHead} &#8203;
        </div>
        <Link className="inline-block bordr text-4xl px-6 py-3 text-white hover:bg-black hover:bg-opacity-40 transition-colors font-bold rounded border relative overflow-clip after:absolute after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-0 hover:after:w-4/5 after:bg-white after:bottom-2 after:rounded-full joinUsBtn">
          <div className="absolute h-10 w-full rotate-45 top-0 left-0 bg-white bg-opacity-30 -z-10 animate-wiper"></div>
          Join Us!
        </Link>
      </div>
    </div>
  );
}
