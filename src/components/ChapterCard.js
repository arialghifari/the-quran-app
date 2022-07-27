import React from "react";
import { Link } from "react-router-dom";

function ChapterCard({ item }) {
  return (
    <>
      <Link to={`/${item.id}/1`} className="bg-green-200">
        <p>{item.id}</p>
        <p>{item.name_arabic}</p>
        <p>{item.name_simple}</p>
      </Link>
    </>
  );
}

export default ChapterCard;
