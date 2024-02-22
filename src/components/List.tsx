import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import { Track } from "../types/trackTypes";
import { trackList } from "../assets/trackList";
import formateTime from "../utils/formateTime";
import { play, playNext } from "../utils/playUtils";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

export const defaultTrack = trackList[0];
export const audio = new Audio(defaultTrack.src);

const List = (): JSX.Element => {
  const { tracks, filteredTracks, currentTrackId } = useAppSelector(
    (state) => state.list
  );
  const dispatch = useAppDispatch();

  const renderedTracks = filteredTracks.length === 0 ? tracks : filteredTracks;

  useEffect(() => {
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [currentTrackId, tracks]);

  const handlePlay = (id: number) => {
    play(id, audio, tracks, currentTrackId, dispatch);
  };

  const handleNextTrack = () => {
    playNext(audio, tracks, currentTrackId, dispatch);
  };

  return (
    <div className="track-list">
      {renderedTracks.map((track: Track) => (
        <div key={track.id} className="track">
          <IconButton
            className="play-button"
            onClick={() => handlePlay(track.id)}
          >
            {track.isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <img src={track.preview} alt="album-cover" className="picture" />
          <div className="track-info">
            <p className="track-info__title">{track.title}</p>
            <p className="track-info__artist">{track.artist}</p>
          </div>
          <p className="time">{formateTime(track.duration)}</p>
        </div>
      ))}
    </div>
  );
};
export default List;
