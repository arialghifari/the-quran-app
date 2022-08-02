import React from "react";
import BookmarkCard from "./BookmarkCard";

function BookmarkList({ item }) {
  const newItem = item.values();
  const reverseItem = [...newItem].reverse();

  return (
    <div className="flex gap-4 overflow-x-auto py-1">
      {reverseItem.map((bookmark) => (
        <BookmarkCard key={bookmark} item={bookmark} />
      ))}
    </div>
  );
}

export default BookmarkList;
