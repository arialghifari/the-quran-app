import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChapterTranslationQuery,
  useChapterVersesQuery,
} from "../services/quranApi";
import VerseCard from "./VerseCard";
import {
  selectBookmarks,
  selectTextArabic,
  selectTextTranslation,
} from "../reducers/firebaseSlice";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

function VerseList() {
  const { chapter } = useParams();
  const [chapterDetail, setChapterDetail] = useState([]);

  const [user] = useAuthState(auth);
  const translation = useSelector(selectTextTranslation);
  const textArabic = useSelector(selectTextArabic);
  const textTranslation = useSelector(selectTextTranslation);
  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    const updateFirebase = async () => {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          bookmarks: bookmarks,
          text_arabic: textArabic,
          text_translation: textTranslation,
          translation: translation,
        });
      }
    };

    updateFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarks]);

  const {
    data: dataChapterVerses,
    error: errorChapterVerses,
    isLoading: isLoadingChapterVerses,
  } = useChapterVersesQuery(chapter);
  const {
    data: dataTranslation,
    error: errorTranslation,
    isLoading: isLoadingTranslation,
  } = useChapterTranslationQuery(chapter);

  useEffect(() => {
    if (dataChapterVerses && dataTranslation) {
      let detailArabic = [];

      dataChapterVerses.verses.map((item, index) =>
        detailArabic.push({
          id: index + 1,
          arabic: item.text_uthmani,
          verse_key: item.verse_key,
        })
      );

      let detailWithTranslation = detailArabic.map((item, i) => ({
        ...item,
        translation: dataTranslation.translations[i]?.text,
      }));

      setChapterDetail(detailWithTranslation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChapterVerses, dataTranslation]);

  return (
    <>
      {errorChapterVerses || errorTranslation ? (
        <p className="text-center">There was an error</p>
      ) : isLoadingChapterVerses || isLoadingTranslation ? (
        <p className="text-center">Loading...</p>
      ) : dataChapterVerses && dataTranslation ? (
        <div className="flex flex-col gap-4">
          {chapterDetail.map((item, index) => (
            <VerseCard key={index} item={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default VerseList;
