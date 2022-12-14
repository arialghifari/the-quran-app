import React from "react";

function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <div className="py-6 text-zinc-500 mt-8">
      @ {getYear()} The Quran App by{" "}
      <a
        href="https://github.com/arialghifari"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-400"
      >
        Ari Alghifari
      </a>
      . All rights reserved.
    </div>
  );
}

export default Footer;
