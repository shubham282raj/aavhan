import React from "react";
import { convertToDownloadLink } from "../functions/ImageUrl";

export default function BelowLandingPage() {
  return (
    <div className="bg-white py-10">
      <div className="flex flex-col max-w-screen-lg mx-auto">
        {[
          {
            image: convertToDownloadLink(
              "https://drive.google.com/file/d/1VKnzENAiSbi1TjQ5qOwq92HMo2QT3RYz/view?usp=drive_link"
            ),
            heading: "This is a heading",
            description:
              "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
          },
          {
            image: convertToDownloadLink(
              "https://drive.google.com/file/d/1I_QVQErcMcK7MPZFm4Z0M_jZxCwyqv6q/view?usp=drive_link"
            ),
            heading: "This is a heading",
            description:
              "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.",
          },
        ].map((ele, index) => (
          <div
            className="h-[50vh] flex"
            style={{ flexDirection: index % 2 == 0 ? "row" : "row-reverse" }}
          >
            <img src={ele.image} alt="" className="object-cover w-1/2" />
            <div className="flex flex-col text-center justify-center px-10">
              <div className="font-bold text-2xl">{ele.heading}</div>
              <div>{ele.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
