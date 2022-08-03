import React from "react";

function Loading() {
  return (
    <div className="text-center z-50 fixed top-0 left-0 right-0 bg-zinc-200 w-full h-screen flex flex-col items-center justify-center gap-2 dark:bg-zinc-900">
      <img src="/logo.svg" alt="The Quran App logo" className="w-20 animate-pulse logo rounded-full" />
    </div>
  );
}

export default Loading;
