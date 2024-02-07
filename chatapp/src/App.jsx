import { useEffect, useState, useRef } from "react";
// import axios from 'axios';
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useSound from "use-sound";
import PING from "./assets/ping.mp3";
import alec from "./assets/alec.mp3";
import GIF from "./assets/rizz2.gif";
import EMOJI from "./assets/emoji.png";
import VIDEOBG from "./assets/bgvideo.mp4";
import MIC from "./assets/mic.png";
import SOUND from "./assets/sound.png";
import Help from "./Components/Help";
import Music from "./Components/Music";
import { FaMusic } from "react-icons/fa";
import SoundPanel from "./Components/SoundPanel";

const socket = io("https://rizzchat-server-rishabhmaindolas-projects.vercel.app/", {
  transports: ["websocket"],
});

const App = () => {
  const lastDiv = useRef(null);
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [emojiPanel, setEmojiPanel] = useState(false);
  const [soundPanel, setSoundPanel] = useState(false);
  const [musicPanel, setMusicPanel] = useState(false);

  const play = useSound(PING);

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
      if (message) {
      }
    });
    console.log(messages);

    socket.on("userList", (usernames) => {
      setUserList(usernames);
    });
  }, [messages]);

  useEffect(() => {
    lastDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const Start = () => {
    if (username == "") {
      toast.error("Please Enter your Username", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!username == "") {
      setChatActive(true);
      socket.emit("hasJoined", username);
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    const messageData = {
      message: newMessage,
      user: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (!newMessage == "") {
      socket.emit("send-message", messageData);
      setNewMessage("");
    } else {
      toast.warn("Message Cannot Be Empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setNewMessage("");
    setEmojiPanel(false);
  };

  const emojiPicker = () => {
    setEmojiPanel(!emojiPanel);
  };

  const soundPicker = () => {
    setSoundPanel(!soundPanel);
  };

  const toggleMusicPanel = () => {
    setMusicPanel(!musicPanel);
  };

  const Leave = () => {
    if (chatActive == true) socket.emit("hasLeft", username);
    setChatActive(false);
    socket.emit("online", {
      status: "offline",
    });
  };

  return (
    <div className="bg-image flex gap-5 justify-center items-center w-screen h-screen ">
      {chatActive ? (
        <>
          <div className="flex flex-col bg-white absolute top-5 left-5 rounded-md">
            {/* <div className="flex absolute bottom-10 right-5">
            <Help />
          </div> */}
            {musicPanel == false ? (
              <div className="flex bg-white rounded-md p-3 hover:bg-slate-400 hover:text-white">
                <button onClick={toggleMusicPanel}>
                  <FaMusic />
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full ">
                <button
                  onClick={toggleMusicPanel}
                  className="flex text-xl hover:text-slate-600 self-end px-2"
                >
                  x
                </button>
                <Music bgm={alec} />
              </div>
            )}
          </div>
          <div className="bg-white h-4/5 w-1/5 flex flex-col rounded-md text-center">
            <h1 className="bg-green-500  rounded-t-md">Active Users</h1>
            <ul className="text-black overflow-y-scroll">
              {userList.map((username) => (
                <li
                  className="flex items-center justify-center "
                  key={username}
                >
                  {username}{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md  w-[40vw] ">
            <div className="flex h-13 justify-between items-center">
              <h1 className="text-center font-bold ml-5 my-auto text-white text-2xl uppercase">
                Rizz Chat
              </h1>
              <h2 className="text-white text-lg">{username}</h2>
              <button
                onClick={Leave}
                className="text-white bg-red-500 rounded-md px-3 my-auto mr-5 text-md font-bold font-sans hover:bg-red-400 transition duration-300 "
              >
                Leave
              </button>
            </div>
            <div className="relative">
              <div className=" bg-white rounded-md overflow-scroll h-[80vh]">
                {messages.map((message, index) => {
                  return (
                    <div key={index}>
                      {message.user === "Admin" ? (
                        <div>
                          <h3 className="text-center cursor-pointer">
                            {message.message}
                          </h3>
                        </div>
                      ) : (
                        <div
                          className={`flex rounded-lg shadow-lg my-5 mx-3.5 w-fit cursor-pointer  
            ${username === message.user && "ml-auto flex-row-reverse "}`}
                        >
                          <div className="bg-green-500 flex justify-center items-center rounded-l-md ">
                            <h3 className="font-bold text-lg px-2">
                              {message.user.charAt(0).toUpperCase()}
                            </h3>
                          </div>
                          <div className="px-2 bg-white rounded-md ">
                            <h3 className="text-xs ">{message.user}</h3>
                            <span className="font-bold text-sm ">
                              {message.message}
                              <div>
                                {message.user !== username && (
                                  <audio src={PING} autoPlay />
                                )}
                              </div>
                            </span>
                            <h3 className="text-xs text-right">
                              {message.time}
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={lastDiv} />
                {emojiPanel && (
                  <div className="absolute bottom-0 mx-auto">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) => {
                        setNewMessage(
                          (prevMessage) => prevMessage + emoji.native
                        );
                      }}
                    />
                  </div>
                )}
                {soundPanel && (
                  <div>
                    <SoundPanel />
                  </div>
                )}
              </div>
            </div>
            <form
              className="flex relative gap-1 mt-5 justify-between "
              onSubmit={Submit}
            >
              <div className="flex bg-white w-full rounded-md items-center">
                <img
                  src={EMOJI}
                  onClick={emojiPicker}
                  className=" p-1 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="type your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full h-10 rounded-md outline-none px-3 py-2 "
                />
                <img
                  src={SOUND}
                  onClick={soundPicker}
                  className="p-1 cursor-pointer"
                />
                {/* <img src={MIC} className="p-1 cursor-pointer" /> */}
              </div>
              {/* {newMessage.length === 0 ? (
                <img
                  src={MICROPHONE}
                  className="p-1 cursor-pointer"
                  onKeyDown={handleVoiceNote}
                  onKeyUp={sendVoiceNote}
                  onMouseDown={startRecording}
                  onTouchStart={startRecording}
                  onMouseUp={stopRecording}
                  onTouchEnd={stopRecording}
                />
              ) : ( */}
              <button
                type="submit"
                className="px-3 py-2 bg-yellow-400 text-white rounded-md font-serif font-bold hover:bg-yellow-200 transition duration-300  "
              >
                Send
              </button>
              {/* )} */}
            </form>
            {/* </div> */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </>
      ) : (
        <div className="relative h-screen w-screen">
          <video
            src={VIDEOBG}
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute top-5 left-5">
            <Help />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="absolute bottom-10 w-full h-100vh flex flex-col gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Enter Your Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-center px-6 py-3 outline-none border-2 rounded-md"
            />
            <button
              className="bg-yellow-400 text-white px-4 py-3 text-xl rounded-md font-bold"
              onClick={Start}
            >
              Start Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
