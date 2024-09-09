import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function Navbar() {
  const { isLoggedIn } = useAppContext();

  const [toggleMenu, setToggleMenu] = useState(false);

  const navigationLinks = isLoggedIn
    ? [
        ["/", "Home"],
        ["/incentives", "Incentives"],
        ["/leaderboard", "Leaderboard"],
        ["/tasks", "Tasks"],
        ["/profile", "Profile"],
      ]
    : [
        ["/", "Home"],
        ["/incentives", "Incentives"],
        ["/leaderboard", "Leaderboard"],
        ["/register", "Join Us!"],
        ["/login", "Login"],
      ];

  const navbarHeight = `md:min-h-[70px] md:max-h[70px]`;

  return (
    <div className="w-full">
      {/* <div
        className={navbarHeight}
        style={{
          height: "60px",
        }}
      ></div> */}
      <div className="fixed max-h-screen z-50 top-0 left-0 w-full bg-slate-900 text-white font-bold md:font-normal">
        <div
          className={
            "max-w-screen-xl m-auto p-3 flex flex-col md:flex-row justify-between items-center overflow-hidden transition-[max-height] " +
            navbarHeight
          }
        >
          <div className="flex items-center justify-between w-full md:w-auto">
            <span className="text-3xl font-bold tracking-tight">
              <Link to="/" className="flex h-[25px] gap-1">
                <img src="/logo.png" alt="logo" className="scale-150" />
                <img src="/text_logo.png" alt="textLogo" className="invert" />
              </Link>
            </span>
            <div
              className="md:hidden text-3xl cursor-pointer h-8 flex flex-col justify-center items-center w-8 relative "
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <div
                className="rounded-full h-[2.5px] bg-white absolute w-full"
                style={{
                  transform: toggleMenu
                    ? "rotate(-45deg)"
                    : "translate(0, -8px)",
                  transition: "all 0.3s ease",
                }}
              ></div>
              <div
                className="rounded-full h-[2.5px] bg-white absolute w-full"
                style={{
                  maxWidth: toggleMenu ? "0" : "100%",
                  transition: "all 0.3s ease",
                }}
              ></div>
              <div
                className="rounded-full h-[2.5px] bg-white absolute w-full"
                style={{
                  transform: toggleMenu ? "rotate(45deg)" : "translate(0, 8px)",
                  transition: "all 0.3s ease",
                }}
              ></div>
            </div>
          </div>
          <div
            className={
              "md:block md:w-auto md:h-auto md:static md:bg-transparent md:z-auto absolute -z-10 top-0 w-screen h-screen backdrop-blur-md bg-black bg-opacity-25 transition-all md:translate-x-0" +
              (toggleMenu ? " translate-x-[0%]" : " translate-x-[100%]") +
              " md:translate-x-0"
              // (toggleMenu ? " " : " hidden")
            }
            style={{
              transition: "transform 0.3s ease",
              // transform: toggleMenu ? "translateX(0%)" : "translateX(100%)",
            }}
          >
            <div
              className={`h-[80%] md:h-auto flex flex-col justify-center items-center md:flex md:flex-row text-xl gap-7 md:gap-5 mt-2`}
            >
              {navigationLinks.map((link, index) => {
                return (
                  <Link
                    to={link[0]}
                    key={index}
                    onClick={() => setToggleMenu(false)}
                  >
                    {link[1]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
