import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTextArabic,
  selectTextTranslation,
  selectTranslation,
  selectDarkmode,
  updateTextArabic,
  updateTextTranslation,
  toggleDarkmode,
  toggleTranslation,
} from "../reducers/firebaseSlice";
import { doc, updateDoc } from "firebase/firestore";

function Setting() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const darkmode = useSelector(selectDarkmode);
  const translation = useSelector(selectTranslation);
  const textArabic = useSelector(selectTextArabic);
  const textTranslation = useSelector(selectTextTranslation);

  const handleTextArabic = async (value) => {
    await updateDoc(doc(db, "users", user.uid), {
      text_arabic: value,
    });

    dispatch(updateTextArabic(value));
  };

  const handleTextTranslation = async (value) => {
    await updateDoc(doc(db, "users", user.uid), {
      text_translation: value,
    });

    dispatch(updateTextTranslation(value));
  };

  const handleTranslation = async (value) => {
    await updateDoc(doc(db, "users", user.uid), {
      translation: !value,
    });

    dispatch(toggleTranslation(!value));
  };

  const handleDarkmode = async (value) => {
    await updateDoc(doc(db, "users", user.uid), {
      darkmode: !value,
    });

    dispatch(toggleDarkmode(!value));
  };

  return (
    <div className="absolute right-0 top-9 bg-zinc-50 min-w-max py-4 px-4 w-72 flex flex-col gap-4 rounded-md shadow-md dark:bg-zinc-800 dark:text-zinc-300">
      <p className="font-medium">Display Setting</p>
      <hr className="dark:border-zinc-600" />

      {user ? (
        <>
          <div className="flex flex-col items-start">
            <label htmlFor="text-arabic">Text Arabic Size</label>
            <select
              onChange={(e) => handleTextArabic(e.target.value)}
              name="text_arabic"
              id="text-arabic"
              className="cursor-pointer w-full bg-zinc-200 p-1 rounded-sm dark:bg-zinc-700"
              defaultValue={textArabic}
            >
              <option value="Extra Small">Extra Small</option>
              <option value="Small">Small</option>
              <option value="Regular">Regular</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="text-translation">Text Translation Size</label>
            <select
              onChange={(e) => handleTextTranslation(e.target.value)}
              name="text_translation"
              id="text-translation"
              className="cursor-pointer w-full bg-zinc-200 p-1 rounded-sm dark:bg-zinc-700"
              defaultValue={textTranslation}
            >
              <option value="Extra Small">Extra Small</option>
              <option value="Small">Small</option>
              <option value="Regular">Regular</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="translation"
              name="translation"
              defaultChecked={translation}
              onClick={() => handleTranslation(translation)}
            />
            <label htmlFor="translation" className="cursor-pointer">
              Show Translation
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="darkmode"
              name="darkmode"
              defaultChecked={darkmode}
              onClick={() => handleDarkmode(darkmode)}
            />
            <label htmlFor="darkmode" className="cursor-pointer">
              Dark Mode
            </label>
          </div>
        </>
      ) : (
        <>
          <p>
            You have to{" "}
            <Link to="/login" className="underline underline-offset-2">
              Login
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Setting;
