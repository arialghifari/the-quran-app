import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChapterDetailQuery,
  useChapterRecitationQuery,
  useChapterTranslationQuery,
} from "../services/quranApi";
import VerseList from "../components/VerseList";
import AudioPlayer from "../components/AudioPlayer";

function ChapterDetail() {
  const { chapter, verse } = useParams();

  const [allRecitation, setAllRecitation] = useState([]);
  const [recitationPage, setRecitationPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { data, error, isLoading } = useChapterDetailQuery(chapter);
  const {
    data: dataTranslation,
    error: errorTranslation,
    isLoading: isLoadingTranslation,
  } = useChapterTranslationQuery(chapter);
  const {
    data: dataRecitation,
    error: errorRecitation,
    isLoading: isLoadingRecitation,
  } = useChapterRecitationQuery({ id: chapter, page: recitationPage });

  useEffect(() => {
    const getRecitation = () => {
      if (dataRecitation) {
        if (recitationPage <= dataRecitation.pagination.total_pages) {
          dataRecitation.audio_files.map((item) =>
            setAllRecitation((prev) => [
              ...prev,
              { url: item.url.replace("mp3", "ogg").replace("mp3", "ogg") },
            ])
          );

          if (dataRecitation.pagination.next_page) {
            setRecitationPage(recitationPage + 1);
          } else {
            setLoading(false);
          }
        }
      }
    };

    getRecitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRecitation]);

  return (
    <div>
      {error || errorTranslation || errorRecitation ? (
        <p>There was an error</p>
      ) : isLoading ||
        isLoadingTranslation ||
        isLoadingRecitation ||
        loading ? (
        <p>Loading...</p>
      ) : data && dataTranslation && dataRecitation ? (
        <div className="flex flex-col gap-12">
          <AudioPlayer
            allRecitation={allRecitation}
            chapter={chapter}
            verse={verse}
          />
          <VerseList data={data} dataTranslation={dataTranslation} />
        </div>
      ) : null}
    </div>
  );
}

export default ChapterDetail;
