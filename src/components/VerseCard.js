import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import { selectIsPlaying, pause, play } from "../reducers/audioSlice";
import { useSelector, useDispatch } from "react-redux";

function Verse({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapter, verse } = useParams();
  const isPlaying = useSelector(selectIsPlaying);
  const isActive = item.id === parseInt(verse);
  const activeVerse = `${chapter}:${verse}`;

  useEffect(() => {
    const activeId = document.getElementById(activeVerse);

    if (parseInt(verse) === 1)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (parseInt(verse) !== 1)
      window.scrollTo({
        top: parseInt(activeId.offsetTop) - 150,
        behavior: "smooth",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVerse, isPlaying]);

  const togglePlay = (verseKey) => {
    const verse = verseKey.split(":")[1];

    navigate(`/${chapter}/${verse}`);
    dispatch(play());
  };

  const togglePause = () => {
    dispatch(pause());
  };

  return (
    <div
      className={`${
        isActive ? "border-2 border-primary" : "border-2"
      } flex flex-col gap-4 p-7 rounded-md bg-zinc-50`}
      id={item.verse_key}
    >
      <p className="text-right font-serif text-zinc-800 font-semibold text-3xl leading-relaxed">
        {item.arabic}
      </p>
      <p className="mt-2">{parse(item.translation)}</p>
      <hr className="border" />
      <div className="flex justify-between items-center">
        <p className="text-primary font-bold">{item.verse_key}</p>

        <div className="flex gap-3">
          {isPlaying && activeVerse === item.verse_key ? (
            <button onClick={togglePause}>
              <img src="/ic_pause_small.svg" alt="pause" />
            </button>
          ) : (
            <button onClick={() => togglePlay(item.verse_key)}>
              <img src="/ic_play_small.svg" alt="play" />
            </button>
          )}

          <button>
            <img src="/ic_bookmark_outline.svg" alt="bookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verse;
