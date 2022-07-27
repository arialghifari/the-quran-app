import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useNavigate } from "react-router-dom";
import { BASE_AUDIO_VERSE } from "../apis/quran";

function AudioPlayer({ allRecitation, chapter, verse }) {
  const navigate = useNavigate();

  const handleOnEnded = () => {
    if (verse <= allRecitation.length - 1)
      navigate(`/${chapter}/${parseInt(verse) + 1}`);
  };

  return (
    <>
      <ReactAudioPlayer
        src={`${BASE_AUDIO_VERSE}/${allRecitation[verse - 1].url}`}
        autoPlay
        controls
        onEnded={handleOnEnded}
      />
    </>
  );
}

export default AudioPlayer;
