import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTextArabic,
  selectTextTranslation,
  selectTranslation,
  selectBookmarks,
  showTranslation,
  hideTranslation,
} from "../reducers/firebaseSlice";

function Setting() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const bookmarks = useSelector(selectBookmarks);
  const translation = useSelector(selectTranslation);
  const textArabic = useSelector(selectTextArabic);
  const textTranslation = useSelector(selectTextTranslation);

  return (
    <div className="absolute right-0 top-9 bg-zinc-50 min-w-max py-4 px-4 w-72 flex flex-col gap-4 rounded-md shadow-md">
      <p className="font-medium">Appearance Setting</p>
      <hr />

      {user ? (
        <>
          <div className="flex flex-col items-start">
            <p>Translation</p>
            <div className="flex gap-3 items-center">
              <label htmlFor="show-translation">
                <input
                  type="radio"
                  id="show-translation"
                  name="translation"
                  className="mr-1"
                  defaultChecked={translation}
                  onClick={() => dispatch(showTranslation())}
                />
                Show
              </label>
              <label htmlFor="hide-translation">
                <input
                  type="radio"
                  id="hide-translation"
                  name="translation"
                  className="mr-1"
                  defaultChecked={!translation}
                  onClick={() => dispatch(hideTranslation())}
                />
                Hide
              </label>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="text-arabic" className="cursor-pointer">
              Text Arabic
            </label>
            <select
              name="text_arabic"
              id="text-arabic"
              className="cursor-pointer w-full bg-zinc-200 p-1 rounded-sm"
            >
              <option value="Small">Small</option>
              <option value="Regular">Regular</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="text-translation" className="cursor-pointer">
              Text Translation
            </label>
            <select
              name="text_translation"
              id="text-translation"
              className="cursor-pointer w-full bg-zinc-200 p-1 rounded-sm"
            >
              <option value="Small">Small</option>
              <option value="Regular">Regular</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
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
