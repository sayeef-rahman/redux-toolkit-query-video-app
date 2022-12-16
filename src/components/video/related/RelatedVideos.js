import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";

export default function RelatedVideos({ videoId, title }) {
  const {
    data: relatedVideos,
    isLoading,
    isError,
    error,
  } = useGetRelatedVideosQuery({ videoId, title });
  let content = null;
  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = (
      <>
        <Error message="There was an Error!" />
      </>
    );
  }
  if (!isLoading && !isError && relatedVideos.length > 0) {
    content = (
      <>
        {relatedVideos.map((video) => {
          return <RelatedVideo key={video.id} video={video} />;
        })}
      </>
    );
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
