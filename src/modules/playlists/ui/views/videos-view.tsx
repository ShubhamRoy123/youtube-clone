import { PlaylistHeaderSection } from "../sections/playlist-header-section";
import { VideosSection } from "../sections/videos-section";

interface VideoViewProps {
  playlistId: string;
}

export const VideoView = ({ playlistId }: VideoViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-1.5 flex flex-col gap-y-6">
      <PlaylistHeaderSection  playlistId={playlistId} />

      <VideosSection playlistId={playlistId} />
    </div>
  );
};
