import React from "react";
import ChapterCard from "./ChapterCard";

function ChapterList({ item }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {item.chapters.map((item) => (
        <ChapterCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ChapterList;
