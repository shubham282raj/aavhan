import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { convertToDownloadLink } from "../functions/ImageUrl";

export default function ImageScroller() {
  const images = useAppContext()?.genSheet?.["Facilities"];

  if (!images) {
    return <div></div>;
  }

  const [currImg, setCurrImg] = useState(0);

  const imageChangeIntervalRef = useRef(null);

  function setImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
    imageChangeIntervalRef.current = setInterval(() => {
      setCurrImg((val) => (val < images.length - 1 ? val + 1 : 0));
    }, 4000); // Adjust interval to your needs
  }

  function clearImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
  }

  useEffect(() => {
    setImageChangeInterval();
    return clearImageChangeInterval;
  }, [images]);

  return (
    <div className="rounded-lg aspect-[1.5] relative overflow-hidden">
      <div className="w-full h-full relative">
        {images.map((image, index) => (
          <div
            className={`w-full h-full absolute top-0 left-0 transition-all duration-1000 ease-in-out}`}
            style={{
              transform: `translate${
                Math.floor(Math.random() * 2) ? "Y" : "Y"
              }(${index > currImg ? 100 : 0}%) scale(${
                index > currImg ? 1 : 1
              })`,
            }}
          >
            <img
              className="w-full h-full object-cover object-center"
              key={index}
              src={convertToDownloadLink(image.url)}
              alt=""
              title={index}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute z-20 select-none top-0 bottom-0 text-white text-3xl font-bold px-2 hover:bg-black hover:bg-opacity-35 hover:transition-all rounded-md left-0"
        onClick={() =>
          setCurrImg((val) => (val > 0 ? val - 1 : images.length - 1))
        }
      >
        &lt;
      </button>
      <button
        className="absolute z-20 select-none top-0 bottom-0 text-white text-3xl font-bold px-2 hover:bg-black hover:bg-opacity-35 hover:transition-all rounded-md right-0"
        onClick={() =>
          setCurrImg((val) => (val < images.length - 1 ? val + 1 : 0))
        }
      >
        &gt;
      </button>
    </div>
  );
}
