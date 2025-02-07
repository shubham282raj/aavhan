import ScrollTranslateComponent from "./OnScroll";

export default function AboutSection() {
  const sections = [
    [
      <>ABOUT AAVHAN</>,
      <>
        "What we do in life echoes in eternity." Escape the urban rush and
        awaken your inner warrior at Aavhan 2023! With 6000+ athletes from 150+
        colleges, experience 3 days of exhilarating sports, camaraderie, and
        unforgettable moments at IIT Bombay. Don’t just spectate—be part of the
        ultimate sporting spectacle! 🏆
      </>,
    ],
    [
      <>What Is AAVHAN UNIFY!!</>,
      <>
        Aavhan Unify invites you to step into the heart of India's premier
        sports festival at IIT Bombay! Picture yourself as the driving force
        behind an electrifying celebration of athleticism, teamwork, and pure
        passion. As a College Ambassador, you'll be at the forefront, uniting
        students from all corners of the nation in the spirit of sportsmanship.
        This is your chance to make waves, ignite the fervor, and create
        unforgettable memories. Showcase your leadership skills, connect with
        sports enthusiasts, and be part of a dynamic team that brings the magic
        of sports to life. Together, we'll write history, one game at a time.
        Join Aavhan Unify – where you're not just an ambassador; you're a
        game-changer! 🏆🏅🚀 Gallery our reach and number of sports
      </>,
    ],
  ];

  const showOff = [
    ["500+", "Participants"],
    ["20+", "Sports"],
    ["150+", "Colleges"],
  ];

  return (
    <div>
      <div className="m-auto my-10 flex flex-col gap-10 px-3 max-w-screen-md">
        <div>
          <div className="text-black text-2xl font-bold text-center pb-2">
            {sections[0][0]}
          </div>

          <div className="text-black text-lg text-center">{sections[0][1]}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-full overflow-hidden">
          <div className="text-2xl font-bold mb-2">Our Reach</div>
          {showOff.map((element, index) => {
            return (
              <ScrollTranslateComponent
                element={
                  <div className="flex flex-col justify-items-center my-1">
                    <div className="text-xl font-bold w-48 text-center rounded-full py-2 shadow-inner shadow-neutral-700 bg-gray-200">
                      {element[0]}
                    </div>
                    <did className="text-center">{element[1]}</did>{" "}
                  </div>
                }
                from={index % 2 ? "translateX(-100%)" : "translateX(100%)"}
                to="translateX(0%)"
                opacity={false}
              />
            );
          })}
        </div>
        {/* <div>
          {
            <ScrollTranslateComponent
              element={
                <div className="text-black text-2xl font-bold text-center pb-2">
                  {sections[1][0]}
                </div>
              }
              from="translateY(0px) translateX(60px)"
              to="translateY(0px) translateX(0px)"
              opacity={false}
            />
          }

          <div className="text-black text-base text-center">
            {sections[1][1]}
          </div>
        </div> */}
      </div>
    </div>
  );
}
