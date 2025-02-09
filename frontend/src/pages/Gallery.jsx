import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { convertToDownloadLink } from "../functions/ImageUrl";

function SubGallery({ objKey, item }) {
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-center items-center gap-8 px-20 w-full">
          <div className="border flex-1"></div>
          <div className="text-white text-3xl flex-shrink-0">{objKey}</div>
          <div className="border flex-1"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {item.map((image, idx) => (
            <div className="w-52 flex-shrink-0 aspect-[4/3] hover:scale-150 transition-transform duration-100 hover:duration-300 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={convertToDownloadLink(image)}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Gallery() {
  let gallery = useAppContext()?.genSheet?.["Gallery"] || [];
  const [modGal, setModGal] = useState({});

  function convertGallery(data) {
    const result = {
      "Past Events": [],
      Facilities: [],
    };

    data.forEach((item) => {
      result["Past Events"].push(item["Past Events"]);
      result["Facilities"].push(item["Facilities"]);
    });

    return result;
  }

  useEffect(() => {
    setModGal(convertGallery(gallery));
  }, [gallery]);

  return (
    <div className="w-screen min-h-screen relative flex flex-col gap-10 justify-center items-center pt-[100px]">
      <div className="h-full w-full absolute -z-10 bg-black bg-opacity-40 backdrop-blur-sm "></div>
      {Object.keys(modGal).map((key, index) => (
        <SubGallery objKey={key} item={modGal[key]} />
      ))}
    </div>
  );
}
