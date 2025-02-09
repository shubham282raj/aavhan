import React from "react";
import ScrollTranslateComponent from "../caComponents/OnScroll";
import { Link } from "react-router-dom";
import ImageSliderLoaders from "../caComponents/ImageSliderLoaders";
import { useAppContext } from "../contexts/AppContext";
import ImageScroller from "../components/ImageScroller";
import aavhanLogo from "/logo.png";
import aavhanTextLogo from "/text_logo.png";
import Footer from "../caComponents/Footer";

export default function Home() {
  const mainFestSheet = useAppContext()?.genSheet?.["Main Fest"] || [];
  const contactUs = useAppContext()?.genSheet?.["Contact Us"] || [];
  const links = useAppContext()?.genSheet?.["Social Media"] || [];

  const showOff = [
    ["500+", "Participants"],
    ["15+", "Sports"],
    ["150+", "Colleges"],
  ];

  return (
    <div className="">
      <div className="w-screen h-screen relative">
        <div
          className="h-screen w-screen absolute"
          style={{
            backgroundImage:
              "url(https://raw.githubusercontent.com/shinchan282nohara/public/main/DINA1754.JPG)",
            backgroundSize: "cover",
            backgroundRepeat: "space",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        ></div>
        <div>
          <ScrollTranslateComponent
            element={
              <>
                <div className="text-white text-7xl md:text-9xl px-2 font-extrabold tracking-wider flex flex-col gap-1">
                  <div>AAVHAN</div>
                </div>
                <div className="text-white text-2xl md:text-3xl font-semibold flex flex-col gap-1 mb-5">
                  2024-25 | IIT Bombay
                </div>
                <div className="">
                  <Link
                    to={"#mainfest"}
                    className="inline-block bordr text-2xl px-6 py-3 text-white hover:bg-black hover:bg-opacity-40 transition-colors font-bold rounded border relative overflow-clip after:absolute after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-0 hover:after:w-4/5 after:bg-white after:bottom-2 after:rounded-full joinUsBtn"
                  >
                    <div className="absolute h-10 w-full rotate-45 top-0 left-0 bg-white bg-opacity-30 -z-10 animate-wiper"></div>
                    Main Fest
                  </Link>
                </div>
              </>
            }
            className="w-full h-full flex justify-center items-center flex-col absolute top-1/2 left-1/2 text-center"
            from="translateX(-10%) translateY(-50%)"
            to="translateX(-50%) translateY(-50%)"
            opacity={true}
            time="1s"
          />
        </div>
      </div>
      <div
        id="aboutus"
        className="w-screen h-screen flex flex-col justify-center items-center"
      >
        <div className="pt-20 text-white text-3xl">About Us</div>
        <div className="flex max-w-screen-lg justify-center items-center">
          <div className="flex-1 flex-shrink-0">
            {/* <ImageSliderLoaders
              sheetName="Facilities"
              size={null}
              showName={0}
            /> */}
            <ImageScroller />
          </div>
          <div className="text-white p-10 flex-1 flex-shrink-0">
            <div className="backdrop-blur-[2px]">
              What we do in life echoes in eternity." Escape the urban rush and
              awaken your inner warrior at Aavhan 2023! With 6000+ athletes from
              150+ colleges, experience 3 days of exhilarating sports,
              camaraderie, and unforgettable moments at IIT Bombay. Don't just
              spectate—be part of the ultimate sporting spectacle! 🏆
            </div>
            <div className="flex justify-between max-w-screen-sm w-full px-10 pt-14">
              {showOff.map((element, index) => (
                <div className="flex flex-col text-center text-white">
                  <div className="text-lg font-bold w-20 aspect-square flex justify-center items-center relative">
                    <div className="absolute -z-10 w-full h-full border-2 border-zinc-300 rounded-full bg-black bg-opacity-25"></div>
                    {element[0]}
                  </div>
                  <div>{element[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        id="mainfest"
        className="w-screen min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-30"
      >
        <div className="text-white text-3xl font-semibold pb-2 underline-offset-8">
          Main Fest : Aavhan 2025
          <div className="border-white border my-1"></div>
        </div>
        <div className="text-white max-w-screen-sm text-center">
          Join the excitement at Aavhan Main Fest with 15+ sports including
          football, basketball, and cricket. Compete with teams from across
          India for thrilling matches and epic finals. Don’t miss out on the
          ultimate sports showdown!
        </div>
        <div className="flex gap-5 flex-wrap justify-center items-center my-2">
          <Link
            className="bg-green-600 text-white py-2 w-32 text-center text-lg rounded-lg hover:scale-110 transition-transform"
            to="mainfest"
          >
            Know More
          </Link>
          <Link
            className="bg-green-600 text-white py-2 w-32 text-center text-lg rounded-lg hover:scale-110 transition-transform"
            to="register"
          >
            Register
          </Link>
        </div>
        <div className="border-white border w-[50vw] mt-2 mb-3"></div>
        <div className="text-white text-xl font-semibold">
          We've got more than just sports
        </div>
        <div className="flex flex-row gap-5 flex-wrap justify-center items-center py-2">
          {mainFestSheet.map((element, index) => (
            <div className="text-white w-[40%] bg-white bg-opacity-10 flex flex-col gap-2 rounded-md py-3 px-3 text-center">
              <div className="text-xl">{element.title}</div>
              <div className="">{element.description}</div>
              <Link
                className="w-fit px-8 bg-orange-600 mx-auto rounded-md border-zinc-400 py-1 hover:px-12 transition-all"
                to={element.buttonLink}
              >
                {element.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen min-h-screen relative flex flex-col gap-5 justify-center items-center">
        <div
          className="h-full w-full absolute -z-10"
          style={{
            backgroundImage:
              "url(https://raw.githubusercontent.com/shinchan282nohara/public/main/DINA1931.JPG)",
            backgroundSize: "cover",
            backgroundRepeat: "space",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="pt-20 text-white text-3xl">
          Contact Us
          <div className="border-white border my-1"></div>
        </div>
        <div className="flex gap-5">
          {contactUs.map((element, index) => (
            <button className="p-1.5 text-white flex justify-center items-center group relative">
              <img className="w-8 aspect-square" src={element.icon} alt="" />
              <div className="absolute -bottom-5 h-0 group-hover:h-7 overflow-hidden transition-all duration-300">
                {element.name}
              </div>
            </button>
          ))}
        </div>

        <form className="text-white flex flex-col w-full max-w-screen-sm px-10 gap-5">
          <div className="text-center text-lg w-fit mx-auto">
            Write to us
            <div className="border-white border-t"></div>
          </div>
          <input
            className="px-3 py-1 rounded-sm bg-opacity-20 backdrop-blur-sm bg-white placeholder-white placeholder-opacity-60"
            type="text"
            placeholder="Name..."
          />
          <input
            className="px-3 py-1 rounded-sm bg-opacity-20 backdrop-blur-sm bg-white placeholder-white placeholder-opacity-60"
            type="text"
            placeholder="Email..."
          />
          <textarea
            className="px-3 py-1 rounded-sm bg-opacity-20 backdrop-blur-sm bg-white placeholder-white placeholder-opacity-60 resize-none"
            rows="6"
            placeholder="Write here..."
          ></textarea>
          <button className="mx-auto bg-orange-600 w-fit py-1.5 px-5 rounded-sm hover:px-16 transition-all duration-500">
            Send
          </button>
        </form>
      </div>
      <div className="bg-black w-full min-h-72 py-10 flex flex-col justify-end gap-10">
        <div className="flex justify-center items-center gap-8 max-w-screen-md mx-auto">
          <div className="w-32 flex-shrink-0 flex flex-col justify-center items-center">
            <img src={aavhanLogo} alt="" />
            <img src={aavhanTextLogo} alt="" />
          </div>
          <div className="text-white">
            Aavhan IIT Bombay is the institute’s annual sports festival,
            fostering sportsmanship, fitness, and competitive spirit through
            tournaments, workshops, and events that unite athletes and
            enthusiasts from across the country.
          </div>
        </div>
        <div className="max-w-screen-lg w-full h-full m-auto flex flex-col sm:flex-row gap-2 sm:justify-between items-center px-3">
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
