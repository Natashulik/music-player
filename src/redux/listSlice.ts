import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types/trackTypes";
import { trackList } from "../assets/trackList";

type ListState = {
  tracks: Track[];
  filteredTracks: Track[] | [];
  currentTrackId: number;
};

const initialState: ListState = {
  tracks: trackList,
  currentTrackId: 0,
  filteredTracks: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<number>) => {
      state.tracks = state.tracks.map((item) =>
        item.id === action.payload
          ? { ...item, isPlaying: !item.isPlaying }
          : { ...item, isPlaying: false }
      );
      state.filteredTracks = state.filteredTracks.map((item) =>
        item.id === action.payload
          ? { ...item, isPlaying: !item.isPlaying }
          : { ...item, isPlaying: false }
      );
    },
    setCurrentTrackId: (state, action: PayloadAction<number>) => {
      state.currentTrackId = action.payload;
    },
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
    setFilteredTracks: (state, action: PayloadAction<Track[]>) => {
      state.filteredTracks = action.payload;
    },
  },
});

export const { setIsPlaying, setCurrentTrackId, setTracks, setFilteredTracks } =
  listSlice.actions;
export default listSlice.reducer;
