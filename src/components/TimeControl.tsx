import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import { setCurrentTime } from "../redux/playbarSlice";
import { defaultTrack, audio } from "./List";
import { Slider } from "@mui/material";
import formateTime from "../utils/formateTime";

const TimeControl = () => {
  const { tracks, currentTrackId } = useAppSelector((state) => state.list);
  const currentTime = useAppSelector((state) => state.playbar.currentTime);

  const dispatch = useAppDispatch();

  const currentTrack = tracks.find((item) => item.id === currentTrackId);

  const sliderProgress = currentTrack
    ? Math.round((currentTime / currentTrack.duration) * 100)
    : Math.round((currentTime / defaultTrack.duration) * 100);

  const handleChangeTime = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (currentTrack) {
      const time = Math.round(
        ((value as number) / 100) * currentTrack!.duration
      );
      dispatch(setCurrentTime(time));
      audio.currentTime = time;
    }
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(setCurrentTime(audio.currentTime));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="slider">
      <p>{formateTime(currentTime)}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderProgress}
        onChange={handleChangeTime}
      />
    </div>
  );
};
export default TimeControl;
