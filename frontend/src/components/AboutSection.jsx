import React from "react";

export default function AboutSection() {
  const sections = [
    [
      <>ABOUT AAVHAN</>,
      <>
        “What we do in life, echoes in Eternity” <br></br> Elude the labyrinth
        of urban life, inspire the warrior within at Aavhan 2023. <br></br>
        Aavhan, where the spirit of sport meets the grandeur of camaraderie!
        Imagine a colossal gathering of over 6000 spirited individuals, hailing
        from 150+ top-notch colleges, converging at IIT Bombay. For three
        exhilarating days, we celebrate athleticism, perseverance, and pure
        euphoria, with a breathtaking lineup of 20+ sports. It's more than a
        fest; it's an unforgettable sporting spectacle, where champions are
        born, memories are etched, and bonds are forged. Don't just spectate,
        participate in the essence of Aavhan! 🏆
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

  return (
    <div>
      <div className="m-auto flex flex-col gap-10">
        {sections.map((section) => (
          <div>
            <div className="text-white text-4xl font-bold text-center pb-2">
              {section[0]}
            </div>
            <div className="text-white text-lg text-center">{section[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
