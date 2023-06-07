import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../api/type.api';

interface PlaylistState {
  playlists: Playlist[];
  selectedPlaylist: Playlist | null;
}

const initialState: PlaylistState = {
  playlists: [],
  selectedPlaylist: null,
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<Playlist | null>) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

export const { setPlaylists, setSelectedPlaylist } = playlistSlice.actions;
