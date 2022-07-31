import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_AUDIO_VERSE } from "../apis/quran";
import { pause, play, selectIsPlaying } from "../reducers/audioSlice";
import { useChapterRecitationQuery } from "../services/quranApi";

function AudioPlayer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapter, verse } = useParams();
  const verseInt = parseInt(verse);
  const [allRecitation, setAllRecitation] = useState([]);
  const [recitationPage, setRecitationPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const isPlaying = useSelector(selectIsPlaying);

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
        // dispatch(setAudioRef(document.querySelector("audio")));
        setLoading(false);
        // SETT THIS TO AUDIO AND CAN PLAY ANYWHERE
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRecitation]);

  const handlePrevAyah = () => {
    if (verseInt - 1 !== 0) navigate(`/${chapter}/${verseInt - 1}`);
  };

  const handleNextAyah = () => {
    if (verseInt + 1 <= allRecitation.length)
      navigate(`/${chapter}/${verseInt + 1}`);
  };

  const handleOnEnded = () => {
    if (verseInt + 1 <= allRecitation.length) {
      navigate(`/${chapter}/${verseInt + 1}`);
      dispatch(play());
    }

    if (verseInt >= allRecitation.length) togglePause();
  };

  const togglePlay = () => {
    dispatch(play());
  };

  const togglePause = () => {
    dispatch(pause());
  };

  useEffect(() => {
    if (!loading) {
      isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
    }
  }, [isPlaying, loading]);

  return (
    <div className="flex z-10 justify-center fixed bottom-3 left-0 right-0">
      {errorRecitation ? (
        <p>There was an error</p>
      ) : isLoadingRecitation || loading ? (
        <p>Loading...</p>
      ) : dataRecitation ? (
        <div className="container w-fit py-3 px-6 relative bg-zinc-50 shadow-md border rounded-full">
          <audio
            onEnded={handleOnEnded}
            autoPlay={isPlaying}
            ref={audioPlayer}
            src={`${BASE_AUDIO_VERSE}/${allRecitation[verse - 1].url}`}
            preload="metadata"
          ></audio>

          <div className="flex gap-14 justify-center z-10">
            <button onClick={handlePrevAyah}>
              <img src="/ic_prev.svg" alt="prev ayah" />
            </button>

            <button onClick={isPlaying ? togglePause : togglePlay}>
              {isPlaying ? (
                <img src="/ic_pause.svg" alt="pause" />
              ) : (
                <img src="/ic_play.svg" alt="play" />
              )}
            </button>

            <button onClick={handleNextAyah}>
              <img src="/ic_next.svg" alt="next ayah" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AudioPlayer;
