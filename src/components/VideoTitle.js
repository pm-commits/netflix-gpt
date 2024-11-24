import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-2">
        <button className="bg-white text-black px-10 py-2 rounded-md text-2xl  hover:opacity-70">
          ▶️ Play
        </button>
        <button className="bg-gray-500 px-8 py-2 rounded-md text-lg hover:opacity-70">
          <span className="border-2 rounded-full border-white px-2">i</span>{" "}
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
// backdrop-blur-sm
