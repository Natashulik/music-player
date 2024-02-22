import { useAppSelector, useAppDispatch } from "../hook";
import { ChangeEvent } from "react";
import { setIsPlaying, setTracks, setFilteredTracks } from "../redux/listSlice";
import { ReactComponent as Ellips } from "../assets/ellipse.svg";

const Input = () => {
  const { tracks, currentTrackId } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const playingTrack = tracks.find((track) => track.id === currentTrackId);

    const text = event.target.value;

    if (text) {
      const updatedTracks = tracks.filter((track) => {
        return (
          track.title.toLowerCase().includes(text.toLowerCase()) ||
          track.artist.toLowerCase().includes(text.toLowerCase())
        );
      });

      dispatch(setFilteredTracks(updatedTracks));
    } else {
      if (playingTrack) {
        dispatch(setIsPlaying(playingTrack.id));
      }

      dispatch(setFilteredTracks([]));
      dispatch(setTracks(tracks));
    }
  };

  return (
    <div className="input-wrapper">
      <div className="ellipse-block">
        <Ellips />
      </div>
      <input
        className="input"
        placeholder="Search track"
        onChange={handleChange}
      />
    </div>
  );
};
export default Input;
