import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function Navbar() {
  const location = useLocation();
  const firstParam = location.pathname.split("/")[1];
  const { isLoggedIn } = useAppContext();

  const [toggleMenu, setToggleMenu] = useState(false);

  const navigationLinks = isLoggedIn
    ? [
        ["", "Home"],
        ["incentives", "Incentives"],
        ["leaderboard", "Leaderboard"],
        ["tasks", "Tasks"],
        ["profile", "Profile"],
      ]
    : [
        ["", "Home"],
        ["incentives", "Incentives"],
        ["leaderboard", "Leaderboard"],
        ["register", "Join Us!"],
        ["login", "Login"],
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
              <Link to="/" className="flex h-[25px] gap-6">
                <img src="/logo.png" alt="logo" className="scale-150" />
                <img
                  src="/text_logo.png"
                  alt="textLogo"
                  className="scale-[1.30] translate-y-1"
                />
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
                    onClick={() => {
                      setToggleMenu(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "instant",
                      });
                    }}
                    className="relative"
                  >
                    {link[1]}
                    <div
                      className={
                        "group absolute box-content px-1 w-full h-full top-0 left-1/2 -translate-x-1/2 scale-y-125"
                      }
                    >
                      <div
                        style={{
                          transition: "ease-in-out 0.3s",
                        }}
                        className={
                          "absolute left-0 bottom-0 w-0 h-1 bg-white opacity-0 rounded-lg group-hover:w-full group-hover:opacity-70"
                        }
                      ></div>
                      <div
                        style={{
                          transition: "ease-in-out 0.3s",
                        }}
                        className={
                          "absolute left-0 bottom-0 w-full h-1 bg-white rounded-lg " +
                          (firstParam == link[0] ? "opacity-20" : " opacity-0")
                        }
                      ></div>
                    </div>
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
