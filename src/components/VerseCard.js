import React from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

function Verse({ item }) {
  const { verse } = useParams();
  const currentState = item.id === parseInt(verse) ? "bg-green-100" : "";

  return (
    <div className={`${currentState} flex flex-col gap-2 p-4`}>
      <p>{item.verse_key}</p>
      <p className="text-right font-serif text-4xl leading-relaxed">
        {item.arabic}
      </p>
      <p>{parse(item.translation)}</p>
    </div>
  );
}

export default Verse;
