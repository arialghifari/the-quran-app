import React from "react";
import { Link } from "react-router-dom";

function ChapterCard({ item }) {
  return (
    <Link to={`/${item.id}/1`} className="flex chapter-card">
      <div className="bg-zinc-50 chapter-card__number text-zinc-600 font-semibold w-14 flex items-center justify-center rounded-tl-md rounded-bl-md dark:bg-zinc-800">
        {item.id}
      </div>
      <div className="w-full uppercase bg-zinc-50 rounded-tr-md rounded-br-md p-5 flex justify-between flex-col gap-3 dark:bg-zinc-800">
        <div className="flex justify-between items-center">
          <p className="text-primary text-lg font-semibold">
            {item.name_simple}
          </p>
          <p className="text-primary text-xl font-bold">{item.name_arabic}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-zinc-500 font-medium dark:text-zinc-400">
            {item.translated_name.name}
          </p>
          <p className="text-zinc-500 font-medium capitalize dark:text-zinc-400">
            {item.verses_count} Ayahs
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ChapterCard;
