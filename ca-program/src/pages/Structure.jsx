import React from "react";
import ImageSlider2 from "../components/ImageSlider2";

export default function Structure() {
  return (
    <div className="px-3 mt-[100px] overflow-hidden py-2 max-w-screen-xl mx-auto">
      <div className="text-slate-800 text-4xl font-bold text-center pb-3">
        STRUCTURE
      </div>
      <div className="max-w-screen-lg mx-auto">
        {[1, 2, 3].map((element, index) => (
          <div
            className={
              `flex items-center border py-5 px-5 my-2 max-w-screen-md mx-auto border-black rounded-xl gap-4 ` +
              (false && " flex-row-reverse ")
            }
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FUNpkbm3tJHYt4I6WjtOtdizk-LcgPi0YA&s"
              alt=""
              className="w-20 aspect-square"
            />
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              dolorem ratione quas accusamus odit aspernatur. Ut et alias eaque
              tempora, cumque error, repellat, quaerat rem ex cum amet ipsa
              minus.
            </div>
          </div>
        ))}
      </div>
      <div className="text-slate-800 text-4xl font-bold text-center pb-3">
        Role of CA??
      </div>
    </div>
  );
}
