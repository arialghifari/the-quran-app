import React from "react";
import BookmarkCard from "./BookmarkCard";

function BookmarkList({ item }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-1">
      {item.map((bookmark) => (
        <div className="whitespace-nowrap">
          <BookmarkCard key={bookmark} item={bookmark} />
        </div>
      ))}
    </div>
  );
}

export default BookmarkList;
