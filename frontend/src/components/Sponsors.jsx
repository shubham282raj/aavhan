import { useQuery } from "react-query";
import { getSheet } from "../api-clients";
import { useState } from "react";
import ScrollTranslateComponent from "./OnScroll";

export default function Sponsors() {
  const {
    data: sponsors = [1, 2, 3, 4, 5, 6],
    isError,
    isSuccess,
  } = useQuery({
    queryKey: "getSheetData_General",
    queryFn: () =>
      getSheet(
        "https://docs.google.com/spreadsheets/d/1fibIy-Ts1g5DCO6ETFEN40c7HSj456y04wFdpUvlGJI/export?format=xlsx"
      ),
    select: (data) => data["Sponsors"],
  });

  const countInit = 6;
  const [count, setCount] = useState(countInit);

  return (
    <div className="mx-auto">
      <div className="text-2xl font-bold text-center mb-3">Sponsers</div>
      <div className="flex gap-4 flex-wrap justify-center max-w-screen-md mx-auto">
        {sponsors.slice(0, count).map((sponsor, index) => (
          <ScrollTranslateComponent
            className="w-1/4 sm:w-36 aspect-square rounded-full overflow-hidden bg-white flex-shrink-0 flex-grow-0 shadow-xl shadow-gray-400"
            element={
              <>
                <img
                  src={sponsor.url}
                  alt={sponsor.heading}
                  className="w-full h-full object-contain hover:scale-110 transition-transform"
                />
              </>
            }
            from={"translateY(50%)"}
            to="translateY(0%)"
            time=".5s"
            opacity={true}
          />
        ))}
      </div>
      <button
        className="block mx-auto m-4 border px-3 py-2 rounded-lg bg-white bg-opacity-70 font-semibold"
        onClick={() =>
          setCount((count) =>
            count == countInit ? sponsors.length : countInit
          )
        }
      >
        See More
      </button>
    </div>
  );
}