import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Help = () => {
  const [viewHelp, setViewHelp] = useState(false);

  const toggleHelp = () => {
    setViewHelp(!viewHelp);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md items-center justify-center cursor-pointer shadow-xl">
        <h2
          onClick={toggleHelp}
          className="flex rounded-full self-start text-extrabold font-sans text-xl border-none hover:text-lg text-white"
        >
        <FaQuestionCircle className="h-7 w-7" />
        </h2>
      </div>
      <div>
      {viewHelp && (
        <div className="flex flex-col w-full gap-5 h-full p-4 rounded-md bg-white">
        <p className="text-xs">
        This is the Beta Version. For best use, open the interface on a Laptop or Desktop. The idea is to showcase yourself anonymously.
        </p>
        <p className="text-xs">
        Below mentioned are some of the features of this application.<br/>
        </p>
        <ul className="text-xs">
            <li>1. No login required.</li>
            <li>2. You can send Emoji's.</li>
            <li>3. Toggle music Play & Mute</li>
            {/* <li>4. Text to Speech messaging is also included. </li>
            <li>5. The joined users will bw refreshed after every one hour.</li>
            <li>6. </li> */}
        </ul>
        <p className="text-xs">
        Follow our Instagram Page for Visual Instructions and Updates.<br/>
       <a href="https://www.instagram.com/rizzchat.io/" target="_blank" rel="noreferrer noopener">Instagram</a>
        </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Help;
