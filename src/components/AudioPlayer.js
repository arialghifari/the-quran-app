import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_AUDIO_VERSE } from "../apis/quran";
import { useChapterRecitationQuery } from "../services/quranApi";

function AudioPlayer() {
  const navigate = useNavigate();
  const { chapter, verse } = useParams();
  const varseInt = parseInt(verse);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allRecitation, setAllRecitation] = useState([]);
  const [recitationPage, setRecitationPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const audioPlayer = useRef();

  const {
    data: dataRecitation,
    error: errorRecitation,
    isLoading: isLoadingRecitation,
  } = useChapterRecitationQuery({ id: chapter, page: recitationPage });

  useEffect(() => {
    if (
      dataRecitation &&
      recitationPage <= dataRecitation.pagination.total_pages
    ) {
      dataRecitation.audio_files.map((item) =>
        setAllRecitation((prev) => [
          ...prev,
          { url: item.url.replace("mp3", "ogg").replace("mp3", "ogg") },
        ])
      );

      if (dataRecitation.pagination.next_page) {
        setRecitationPage(recitationPage + 1);
      } else {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRecitation]);

  const handlePrevAyah = () => {
    if (varseInt - 1 !== 0) navigate(`/${chapter}/${varseInt - 1}`);
  };

  const handleNextAyah = () => {
    if (varseInt + 1 <= allRecitation.length)
      navigate(`/${chapter}/${varseInt + 1}`);
  };

  const handleOnEnded = () => {
    if (varseInt + 1 <= allRecitation.length)
      navigate(`/${chapter}/${varseInt + 1}`);

    if (varseInt >= allRecitation.length) setIsPlaying(false);
  };

  const togglePlayPause = () => {
    !isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex z-10 px-3 justify-center bg-gray-200 fixed bottom-0 left-0 right-0">
      {errorRecitation ? (
        <p>There was an error</p>
      ) : isLoadingRecitation || loading ? (
        <p>Loading...</p>
      ) : dataRecitation ? (
        <div className="container p-4">
          <audio
            onEnded={handleOnEnded}
            autoPlay={isPlaying}
            ref={audioPlayer}
            src={`${BASE_AUDIO_VERSE}/${allRecitation[verse - 1].url}`}
            preload="metadata"
          ></audio>

          <div className="flex gap-6 justify-center">
            <button onClick={handlePrevAyah}>
              <img src="/ic_left.svg" alt="prev ayah" />
            </button>

            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <img src="/ic_pause.svg" alt="pause" />
              ) : (
                <img src="/ic_play.svg" alt="play" />
              )}
            </button>

            <button onClick={handleNextAyah}>
              <img src="/ic_right.svg" alt="next ayah" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AudioPlayer;
