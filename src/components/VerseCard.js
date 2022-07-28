import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

function Verse({ item }) {
  const { chapter, verse } = useParams();
  const isActive = item.id === parseInt(verse);

  useEffect(() => {
    const activeId = document.getElementById(`${chapter}:${verse}`);

    window.scrollTo({
      top: parseInt(activeId.offsetTop) - 150,
      behavior: "smooth",
    });
  }, [chapter, verse]);

  return (
    <div
      className={`${isActive ? "bg-green-100" : ""} flex flex-col gap-2 p-4`}
      id={item.verse_key}
    >
      <p>{item.verse_key}</p>
      <p className="text-right font-serif text-4xl leading-relaxed">
        {item.arabic}
      </p>
      <p>{parse(item.translation)}</p>
    </div>
  );
}

export default Verse;
