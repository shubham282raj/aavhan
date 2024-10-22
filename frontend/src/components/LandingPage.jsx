import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ScrollTranslateComponent from "./OnScroll";
import { convertToDownloadLink } from "../functions/ImageUrl";
import { useQuery } from "react-query";
import { getSheet } from "../api-clients";

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

  const {
    data: sheets = {
      "Landing Page": [{ url: "/home2.jpg", brightness: "0.7" }],
    },
  } = useQuery({
    queryKey: "getSheetData_General",
    queryFn: () =>
      getSheet(
        "https://docs.google.com/spreadsheets/d/1fibIy-Ts1g5DCO6ETFEN40c7HSj456y04wFdpUvlGJI/export?format=xlsx"
      ),
  });

  const [imageIndex, setImageIndex] = useState(0);
  const imageChangeDirRef = useRef(null);
  const imageChangeIntervalRef = useRef(null);
  function setImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
    imageChangeIntervalRef.current = setInterval(() => {
      setImageIndex((index) => {
        if (index == 0) imageChangeDirRef.current = 1; // right direction
        else if (index >= sheets["Landing Page"].length - 1)
          imageChangeDirRef.current = 0;
        return imageChangeDirRef.current ? index + 1 : index - 1;
      });
    }, 5000);
  }
  function clearImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
  }

  useEffect(() => {
    intervalRef.current = setInterval(typingAnimationFunction, 100);
    setImageChangeInterval();
    imageChangeDirRef.current = 1;

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      clearImageChangeInterval();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbarMain");
      if (window.scrollY > window.innerHeight * 0.9) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.add("bg-slate-900");
      } else {
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-slate-900");
      }
    };

    const navbar = document.getElementById("navbarMain");
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-slate-900");
    setTimeout(() => {
      navbar.style.transition = "background-color .4s ease-out";
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      const navbar = document.getElementById("navbarMain");
      navbar.classList.add("bg-slate-900");
      navbar.classList.remove("bg-transparent");
      navbar.style.transition = "none";

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      <div className="h-full w-full absolute -z-10 bg-slate-900 flex">
        {sheets["Landing Page"].map((image, index) => (
          <img
            key={`home-page-image-${index}`}
            src={convertToDownloadLink(image.url)}
            alt="homeBG"
            className={
              "h-full w-full object-cover flex-grow-0 flex-shrink-0 brightness " +
              (index == imageIndex ? "scale-110" : "scale-100")
            }
            style={{
              translate: `${-100 * index}%`,
              opacity: index == imageIndex ? "1" : "0",
              transition: "opacity 800ms ease-in-out, transform 5000ms linear",
              filter: `brightness(${image.brightness})`,
            }}
          />
        ))}
      </div>
      <ScrollTranslateComponent
        element={
          <>
            <div className="text-white text-7xl md:text-9xl px-2 font-extrabold tracking-wider flex flex-col gap-1">
              <div>AAVHAN</div>
              <div>UNIFY</div>
            </div>
            <div className="text-white text-2xl md:text-3xl font-semibold flex flex-col gap-1 mb-5">
              College Ambassador Program
            </div>
            <div className="">
              <Link
                to={"/register"}
                className="inline-block bordr text-2xl px-6 py-3 text-white hover:bg-black hover:bg-opacity-40 transition-colors font-bold rounded border relative overflow-clip after:absolute after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-0 hover:after:w-4/5 after:bg-white after:bottom-2 after:rounded-full joinUsBtn"
              >
                <div className="absolute h-10 w-full rotate-45 top-0 left-0 bg-white bg-opacity-30 -z-10 animate-wiper"></div>
                Join Us!
              </Link>
            </div>
          </>
        }
        className="absolute top-1/2 left-1/2 text-center"
        from="translateX(-10%) translateY(-50%)"
        to="translateX(-50%) translateY(-50%)"
        opacity={true}
        time="1s"
      />
    </div>
  );
}
