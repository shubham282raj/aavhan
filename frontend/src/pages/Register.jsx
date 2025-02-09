import React from "react";

export default function Register() {
  return (
    <div
      id="mainfestregister"
      className="relative w-screen min-h-screen flex flex-col gap-3 justify-center items-center pt-[100px] pb-24"
    >
      <div className="bg-black bg-opacity-10 w-full h-full absolute -z-10 top-0 left-0"></div>
      <div className="text-white text-3xl">
        Register
        <div className="border-white border my-1"></div>
      </div>
      <p className="text-lg text-white max-w-screen-md px-10">
        Whether you're a lone warrior or part of an unstoppable squad, this is
        your chance to compete, learn, and leave your mark. Challenge yourself,
        showcase your skills, and join a community of passionate players. **Sign
        up now**—your journey starts here!
      </p>
      <div className="w-full max-w-screen-lg px-10">
        <iframe
          src="https://konfhub.com/widget/test-event-7d5fdc2f?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=572148&ticketCl=572148&btnColor=fb5850&fontFamily=Prompt&borderRadius=10"
          id="konfhub-widget"
          title="Register for Test Event"
          width="100%"
          height="700"
          className="rounded-lg bg-white"
        ></iframe>
      </div>
    </div>
  );
}
