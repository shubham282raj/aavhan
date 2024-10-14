import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getSheet } from "../api-clients";
import { convertToDownloadLink } from "../functions/ImageUrl";
import { useAppContext } from "../contexts/AppContext";

export default function ImageSlider2() {
  const { data: sheets = { Facilities: [] }, isError } = useQuery({
    queryKey: "getSheetData_General",
    queryFn: () =>
      getSheet(
        "https://docs.google.com/spreadsheets/d/1fibIy-Ts1g5DCO6ETFEN40c7HSj456y04wFdpUvlGJI/export?format=xlsx"
      ),
  });

  const { windowSize } = useAppContext();

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const primaryImgFraction = 0.4;

  const cycleImages = () => {
    setIndex((index) =>
      index >= sheets["Facilities"].length - 1 ? 0 : index + 1
    );
  };

  function setImageChangeInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      cycleImages();
    }, 4000);
  }
  function clearImageChangeInterval() {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    setImageChangeInterval();

    return clearImageChangeInterval;
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col sm:flex-row gap-2 justify-center items-center px-3">
      {sheets["Facilities"].map((image, idx) => (
        <div
          className="w-full sm:h-1/2 sm-w-auto overflow-hidden relative cursor-pointer"
          style={
            windowSize.width < 640
              ? {
                  height:
                    idx == index
                      ? `${primaryImgFraction * windowSize.height}px`
                      : `40px`,
                  transition: "all 1s ease-in-out",
                }
              : {
                  width:
                    idx == index
                      ? `${primaryImgFraction * windowSize.width}px`
                      : `40px`,
                  transition: "all 1s ease-in-out",
                }
          }
          onClick={() => setIndex(idx)}
          // onMouseOver={() => setIndex(idx)}
          onMouseEnter={clearImageChangeInterval}
          onMouseLeave={setImageChangeInterval}
        >
          <img
            src={convertToDownloadLink(image.url)}
            className="absolute h-full w-full object-cover rounded-2xl"
            style={{
              filter: idx == index ? "brightness(1)" : "brightness(0.5)",
              transition: "all 1s linear",
            }}
          ></img>
          <div
            className="text-white font-bold absolute w-max"
            style={
              windowSize.width < 640
                ? {
                    top: idx == index ? "80%" : "50%",
                    transform:
                      idx == index
                        ? "translate(10px, -50%)"
                        : "translate(10px, -50%)",
                    transition: "all 1s linear",
                  }
                : {
                    top: idx == index ? "75%" : "50%",
                    left: idx == index ? "40px" : "50%",
                    fontSize: idx == index ? "25px" : "100%",
                    transform:
                      idx == index
                        ? "rotate(0deg) translate(0%, -50%)"
                        : "rotate(-90deg) translate(-80%, -50%)",
                    transformOrigin: "top left",
                  }
            }
          >
            {image.heading}
            <div className="text-base">{idx == index && image.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
