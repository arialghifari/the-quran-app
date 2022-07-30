import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

function Verse({ item }) {
  const { chapter, verse } = useParams();
  const isActive = item.id === parseInt(verse);

  useEffect(() => {
    const activeId = document.getElementById(`${chapter}:${verse}`);

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
  }, [chapter, verse]);

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
          <button>
            <img src="/ic_play_small.svg" alt="play" />
          </button>
          <button>
            <img src="/ic_bookmark_outline.svg" alt="bookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verse;
