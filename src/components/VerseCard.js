import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import { selectIsPlaying, pause, play } from "../reducers/audioSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import {
  selectBookmarks,
  selectTextArabic,
  selectTextTranslation,
  selectTranslation,
  addBookmark,
  removeBookmark,
} from "../reducers/firebaseSlice";

function Verse({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapter, verse } = useParams();
  const isActive = item.id === parseInt(verse);
  const activeVerse = `${chapter}:${verse}`;
  const [user] = useAuthState(auth);

  const isPlaying = useSelector(selectIsPlaying);
  const translation = useSelector(selectTranslation);
  const textArabic = useSelector(selectTextArabic);
  const textTranslation = useSelector(selectTextTranslation);
  const bookmarks = useSelector(selectBookmarks);

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
    if (!user) return navigate("/login");
    const verse = verseKey.split(":")[1];

    navigate(`/${chapter}/${verse}`);
    dispatch(play());
  };

  const togglePause = () => {
    if (!user) return navigate("/login");
    dispatch(pause());
  };

  const handleRemoveBookmark = () => {
    if (!user) return navigate("/login");
    dispatch(removeBookmark(item.verse_key));
  };

  const handleAddBookmark = () => {
    if (!user) return navigate("/login");
    dispatch(addBookmark(item.verse_key));
  };

  const getTextArabic = () => {
    if (textArabic === "Extra Small") return "text-xl";
    if (textArabic === "Small") return "text-2xl";
    if (textArabic === "Regular") return "text-3xl";
    if (textArabic === "Large") return "text-4xl";
    if (textArabic === "Extra Large") return "text-5xl";
  };

  const getTextTranslation = () => {
    if (textTranslation === "Extra Small") return "text-xs";
    if (textTranslation === "Small") return "text-sm";
    if (textTranslation === "Regular") return "text-base";
    if (textTranslation === "Large") return "text-lg";
    if (textTranslation === "Extra Large") return "text-xl";
  };

  const isBookmarked = bookmarks.join(" ").match(item.verse_key)?.length;

  return (
    <div
      className={`${
        isActive ? "border-2 border-primary" : "border-2 dark:border-zinc-800"
      } flex flex-col gap-4 p-7 rounded-md bg-zinc-50 dark:bg-zinc-800`}
      id={item.verse_key}
    >
      <p
        className={`${getTextArabic()} text-right font-serif text-zinc-800 font-semibold leading-relaxed dark:text-zinc-300`}
      >
        {item.arabic}
      </p>
      {translation && (
        <p className={`${getTextTranslation()} mt-2 dark:text-zinc-300`}>
          {parse(item.translation)}
        </p>
      )}
      <hr className="border dark:border-zinc-900" />
      <div className="flex justify-between items-center">
        <p className="text-primary font-bold">{item.verse_key}</p>

        <div className="flex gap-3">
          {isPlaying && activeVerse === item.verse_key ? (
            <button onClick={togglePause}>
              <img
                src="/ic_pause_small.svg"
                alt="pause"
                className="dark:invert"
              />
            </button>
          ) : (
            <button onClick={() => togglePlay(item.verse_key)}>
              <img
                src="/ic_play_small.svg"
                alt="play"
                className="dark:invert"
              />
            </button>
          )}

          {isBookmarked ? (
            <button onClick={() => handleRemoveBookmark(item.verse_key)}>
              <img
                src="/ic_bookmark_filled.svg"
                alt="bookmark"
                className="dark:invert"
              />
            </button>
          ) : (
            <button onClick={() => handleAddBookmark(item.verse_key)}>
              <img
                src="/ic_bookmark_outline.svg"
                alt="bookmark"
                className="dark:invert"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verse;
