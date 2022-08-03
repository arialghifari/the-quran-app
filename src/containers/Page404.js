import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectDarkmode } from "../reducers/firebaseSlice";

function Page404() {
  window.scrollTo(0, 0);
  const darkmode = useSelector(selectDarkmode);

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkmode]);

  return (
    <div className="flex justify-center mt-16 mb-32">
      <div className="flex flex-col max-w-sm">
        <img src="/404.png" alt="404 Not Found" className="dark:invert" />
        <Link
          to="/"
          className="p-2 bg-primary hover:bg-primary/80 text-center rounded-md text-zinc-50 dark:text-zinc-200"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default Page404;
