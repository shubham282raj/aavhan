import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false;

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

  return (
    <div className="bg-gray-200 py-3 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex justify-between w-full sm:w-auto">
        <span className="text-3xl font-bold tracking-tight">
          <Link to="/">Aavhan</Link>
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
          className={`flex flex-col justify-center items-center sm:flex sm:flex-row text-xl gap-5 ${
            toggleMenu ? "flex" : "hidden"
          }`}
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
  );
}
