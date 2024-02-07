import React, { useEffect, useRef, useState } from "react";
import "./Music.css";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaVolumeDown,
} from "react-icons/fa";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#ccc",
  progressColor: "#0187ff",
  cursorColor: "transparent",
  responsive: true,
  height: 80,
  normalize: true,
  backend: "WebAudio",
  barWidth: 2,
  barGap: 3,
});

function formatTime(seconds) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

const Music = ({ bgm }) => {
  const waveFormRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");

  useEffect(() => {
    const options = formWaveSurferOptions(waveFormRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(bgm);

    wavesurfer.current.on("ready", () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(bgm.split("/").pop());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      wavesurfer.current.un("audioprocess");
      wavesurfer.current.un("ready");
      wavesurfer.current.destroy();
    };
  }, [bgm]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handleMute = () => {
    setMuted(!muted);
    wavesurfer.current.setVolume(muted ? volume : 0);
  };

  const handleVolumeUp = () => {
    setVolume(Math.min(volume + 0.1, 1));
    wavesurfer.current.setVolume(Math.min(volume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    setVolume(Math.max(volume - 0.1, 0));
    wavesurfer.current.setVolume(Math.max(volume - 0.1, 0));
  };

  return (
    <div className="music-container">
      <div id="waveform" ref={waveFormRef} style={{ width: "100%", cursor: "pointer" }}></div>
      <div className="controls">
        <div className="button-container">
          <button onClick={handlePlayPause}>
            {playing === false ? <FaPlay /> : <FaPause />}
          </button>
          <button onClick={handleMute}>
            {muted === false ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button onClick={handleVolumeUp}>
            <FaVolumeUp />
          </button>
          <button onClick={handleVolumeDown}>
            <FaVolumeDown />
          </button>
        </div>

        <div className="audio-info" >
          <span>{audioFileName}</span>
          <span>
           {formatTime(duration)} || {" "}
            {formatTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Music;