import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "../../components/ui/loaders/PlayerLoader";
import DescriptionLoader from "../../components/ui/loaders/DescriptionLoader";
import RelatedVideoLoader from "../../components/ui/loaders/RelatedVideoLoader";

export default function Video() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading || !video) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <Player link={video.link} title={video.title} />
              <Description  video={video}  />
            </div>
            {video?.id ? (
              <RelatedVideos videoId={video.id} title={video.title}/>
            ) : isLoading ? (
              <>
                <RelatedVideoLoader /> <RelatedVideoLoader />{" "}
                <RelatedVideoLoader />
              </>
            ) : (
              <Error message="There was an Error!" />
            )}
          </div>
        </div>
      </section>
    );
  }
  return content;
}
