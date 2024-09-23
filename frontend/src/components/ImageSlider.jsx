import { useEffect, useRef, useState } from "react";

export default function ImageSlider() {
  const images = [
    {
      url: "https://images.pexels.com/photos/28220698/pexels-photo-28220698/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      heading: "Image 1",
      description: "Description for image 1",
    },
    {
      url: "https://images.pexels.com/photos/27489977/pexels-photo-27489977/free-photo-of-milky-way.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      heading: "Image 2",
      description: "Description for image 2",
    },
    {
      url: "https://images.pexels.com/photos/28277461/pexels-photo-28277461/free-photo-of-a-road-in-the-middle-of-a-forest-with-fog.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      heading: "Image 3",
      description: "Description for image 3",
    },
    {
      url: "https://images.pexels.com/photos/28281605/pexels-photo-28281605/free-photo-of-a-red-staircase-leading-to-a-jungle.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      heading: "Image 4",
      description: "Description for image 4",
    },
  ];

  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((index) => (index == images.length - 1 ? 0 : index + 1));
  };
  const prevImage = () => {
    setImageIndex((index) => (index == 0 ? images.length - 1 : index - 1));
  };

  // image change on sliding gesture
  let lastXPos;
  const lastWheelTrigger = useRef(null);
  const threshold = 0;
  const handleDown = (xPos) => (lastXPos = xPos);
  const handleUp = (xPos, deltaX) => {
    if (!deltaX) deltaX = xPos - lastXPos;
    console.log(deltaX);
    Math.abs(deltaX) > threshold && (deltaX > 0 ? prevImage() : nextImage());
  };

  // image change on interval
  const imageChangeIntervalRef = useRef(null);
  function setImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
    imageChangeIntervalRef.current = setInterval(() => {
      nextImage();
    }, 4000);
  }
  function clearImageChangeInterval() {
    clearInterval(imageChangeIntervalRef.current);
  }
  useEffect(() => {
    setImageChangeInterval();
    lastWheelTrigger.current = Date.now();

    return clearImageChangeInterval;
  }, []);

  return (
    <div className="w-full px-3">
      <div className="text-2xl font-bold text-center mb-3">Facilities</div>
      <div className="relative max-w-screen-md mx-auto w-full aspect-[16/10] sm:aspect-video flex overflow-hidden rounded-md">
        <div
          className="z-10 absolute w-full h-full top-0 left-0"
          // slide gesture
          onMouseDown={(e) => handleDown(e.clientX)}
          onMouseUp={(e) => handleUp(e.clientX)}
          onTouchStart={(e) => handleDown(e.touches[0].clientX)}
          onTouchEnd={(e) => handleUp(e.changedTouches[0].clientX)}
          onWheel={(e) => {
            if (Date.now() - lastWheelTrigger.current < 1000) return;
            lastWheelTrigger.current = Date.now();
            handleUp(0, -e.deltaX);
          }}
          // onScroll={(e) => handleUp(0, e.deltaX)}
          // hover and interval image changing
          onMouseEnter={clearImageChangeInterval}
          onMouseLeave={setImageChangeInterval}
        ></div>
        {images.map((image, index) => (
          <div
            className="relative w-full h-full flex-shrink-0 flex-grow-0 select-none"
            style={{
              translate: `${-100 * imageIndex}%`,
              transition: "translate 400ms ease-out",
            }}
          >
            <img
              src={image.url}
              alt={`image ${index}`}
              className="w-full h-full object-cover"
            ></img>
            <div
              className="absolute z-10 w-[75%] left-1/2 -translate-x-1/2 bottom-10 text-white text-2xl font-bold"
              style={{
                transition: "all 1000ms ease-out",
                transform:
                  index == imageIndex
                    ? "translate(-50%, 0px)"
                    : "translate(-50%, 100px)",
              }}
            >
              {image.heading}
              <div className="text-base">{image.description}</div>
            </div>
          </div>
        ))}
        <button
          className="absolute z-20 select-none top-0 bottom-0 text-white text-3xl font-bold px-2 hover:bg-black hover:bg-opacity-35 hover:transition-all rounded-md left-0"
          onClick={prevImage}
        >
          &lt;
        </button>
        <button
          className="absolute z-20 select-none top-0 bottom-0 text-white text-3xl font-bold px-2 hover:bg-black hover:bg-opacity-35 hover:transition-all rounded-md right-0"
          onClick={nextImage}
        >
          &gt;
        </button>

        <div className="absolute z-10 left-1/2 -translate-x-1/2 bg-white bg-opacity-30 backdrop-blur-sm px-4 py-1.5 rounded-full bottom-3 flex justify-center items-center gap-2">
          {images.map((_, index) => (
            <button
              className="aspect-square bg-white border rounded-full flex-grow-0 flex-shrink-0"
              style={{
                width: index == imageIndex ? "13px" : "8px",
                transition: "all 400ms ease-out",
              }}
              onClick={() => setImageIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
