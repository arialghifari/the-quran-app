import React from "react";
import { useParams } from "react-router-dom";
import {
  useChapterDetailQuery,
  useChapterTranslationQuery,
} from "../services/quranApi";
import VerseList from "../components/VerseList";
import AudioPlayer from "../components/AudioPlayer";

function VerseDetail() {
  const { chapter } = useParams();

  const { data, error, isLoading } = useChapterDetailQuery(chapter);
  const {
    data: dataTranslation,
    error: errorTranslation,
    isLoading: isLoadingTranslation,
  } = useChapterTranslationQuery(chapter);

  return (
    <div>
      {error || errorTranslation ? (
        <p>There was an error</p>
      ) : isLoading || isLoadingTranslation ? (
        <p>Loading...</p>
      ) : data && dataTranslation ? (
        <div className="flex flex-col gap-12">
          <AudioPlayer />
          <VerseList data={data} dataTranslation={dataTranslation} />
        </div>
      ) : null}
    </div>
  );
}

export default VerseDetail;
