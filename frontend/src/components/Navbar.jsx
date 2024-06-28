import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function Navbar() {
  const { isLoggedIn } = useAppContext();

  const [toggleMenu, setToggleMenu] = useState(false);

  const navigationLinks = isLoggedIn
    ? [
        ["/", "Home"],
        ["/profile", "Profile"],
      ]
    : [
        ["/", "Home"],
        ["/register", "Join Us!"],
        ["/login", "Login"],
      ];

  const navbarRef = useRef();

  const navbarHeight = `sm:min-h-[70px] sm:max-h[70px]`;

  return (
    <div className="w-full">
      <div
        className={navbarHeight}
        style={{
          height: toggleMenu ? navbarRef.current.scrollHeight + "px" : "60px",
        }}
      ></div>
      <div className="absolute z-50 top-0 left-0 w-full bg-white">
        <div
          className={
            "max-w-screen-xl m-auto p-3 flex flex-col sm:flex-row justify-between items-center overflow-hidden transition-[max-height] " +
            navbarHeight
          }
          ref={navbarRef}
          style={{
            maxHeight: toggleMenu
              ? navbarRef.current.scrollHeight + "px"
              : "60px",
          }}
        >
          <div className="flex items-center justify-between w-full sm:w-auto">
            <span className="text-3xl font-bold tracking-tight">
              <Link to="/" className="flex h-[25px] gap-1">
                <img src="/logo.png" alt="logo" className="scale-150" />
                <img src="/text_logo.png" alt="textLogo" />
              </Link>
            </span>
            <div
              className="sm:hidden text-3xl cursor-pointer"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              &#9776;
            </div>
          </div>
          <div>
            <div
              className={`flex flex-col justify-center items-center sm:flex sm:flex-row text-xl gap-5 mt-1`}
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
