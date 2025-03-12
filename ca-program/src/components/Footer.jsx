import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getGeneralSheet, getSheet } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";

export default function Footer() {
  const links = useAppContext()?.genSheet?.["Social Media"] || [];

  return (
    <div className="w-full h-0 relative">
      <div className="absolute h-20 sm:bottom-0 w-full bg-slate-900">
        <div className="max-w-screen-lg h-full m-auto flex flex-col sm:flex-row gap-2 sm:justify-between items-center px-3">
          <div className="text-white text-lg">&#169; Aavhan, IIT Bombay</div>
          <div className="flex justify-center items-center gap-2 sm:gap-4">
            {links.map((link) => {
              return (
                <Link to={link["link"]} key={link["name"] + "-fotter"}>
                  <div
                    className="h-8 aspect-square flex justify-center items-center"
                    dangerouslySetInnerHTML={{ __html: link["imageURL"] }}
                  ></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
