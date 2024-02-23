import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import { setCurrentTrackId, setIsPlaying } from "../redux/listSlice";
import TimeControl from "./TimeControl";
import { audio } from "./List";
import { trackList } from "../assets/trackList";
import formateTime from "../utils/formateTime";
import { play, playNext } from "../utils/playUtils";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, FastRewind, FastForward } from "@mui/icons-material";

const defaultTrack = trackList[0];

const Playbar = () => {
  const { tracks, currentTrackId } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();

  const currentTrack = tracks.find((item) => item.id === currentTrackId);

  useEffect(() => {
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [currentTrackId]);

  const handlePreviousTrack = () => {
    const previousTrackIndex =
      tracks.findIndex((track) => track.id === currentTrackId) - 1;
    const previousTrack = tracks[previousTrackIndex];

    if (previousTrack) {
      dispatch(setCurrentTrackId(previousTrack.id));
      dispatch(setIsPlaying(previousTrack.id));
      audio.currentTime = 0;
      audio.src = previousTrack.src;
      audio.play();
    }
  };

  const handlePlay = (id: number) => {
    play(id, audio, tracks, currentTrackId, dispatch);
  };

  const handleNextTrack = () => {
    playNext(audio, tracks, currentTrackId, dispatch);
  };

  return (
    <div className="playbar">
      <div className="playbar-left">
        <img
          className="playbar-picture"
          src={currentTrack ? currentTrack.preview : defaultTrack.preview}
          alt=""
        />
        <IconButton
          className="playbar-button"
          onClick={() =>
            handlePlay(currentTrackId ? currentTrackId : defaultTrack.id)
          }
        >
          {currentTrack && currentTrack.isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <div className="track-info playbar-info">
          <p className="track-info__title">
            {currentTrack ? currentTrack.title : defaultTrack.title}
          </p>
          <p className="track-info__artist">
            {currentTrack ? currentTrack.artist : defaultTrack.artist}
          </p>
        </div>
        <IconButton className="playbar-button" onClick={handlePreviousTrack}>
          <FastRewind />
        </IconButton>
        <IconButton className="playbar-button" onClick={handleNextTrack}>
          <FastForward />
        </IconButton>
      </div>
      <div className="playbar-right">
        <div className="slider-wrapper">
          <TimeControl />
          <p className="time">
            {currentTrack
              ? formateTime(currentTrack.duration)
              : formateTime(defaultTrack.duration)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Playbar;
