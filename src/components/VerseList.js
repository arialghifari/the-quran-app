import React, { useEffect, useState } from "react";
import VerseCard from "./VerseCard";

function VerseList({ data, dataTranslation }) {
  const [chapterDetail, setChapterDetail] = useState([]);

  useEffect(() => {
    const getChapterDetail = () => {
      if (data && dataTranslation) {
        let detailArabic = [];

        data.verses.map((item, index) =>
          detailArabic.push({
            id: index + 1,
            arabic: item.text_uthmani,
            verse_key: item.verse_key,
          })
        );

        let detailWithTranslation = detailArabic.map((item, i) => ({
          ...item,
          translation: dataTranslation.translations[i].text,
        }));

        setChapterDetail(detailWithTranslation);
      }
    };

    getChapterDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataTranslation]);

  return (
    <>
      {chapterDetail.map((item, index) => (
        <VerseCard key={index} item={item} />
      ))}
      <div className="mb-32" />
    </>
  );
}

export default VerseList;
