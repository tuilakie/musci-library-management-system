import { baseApi } from './baseApi';
import { HttpResponse, Playlist } from './type.api';

export const playlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.query<
      HttpResponse<Playlist[]>,
      {
        title?: string;
        artist?: string;
        album?: string;
        genre?: string;
        skip?: number;
        take?: number;
      }
    >({
      query: ({ title, artist, album, genre, skip, take }) => ({
        url: 'playlists',
        params: {
          title,
          artist,
          album,
          genre,
          skip,
          take,
        },
      }),
      providesTags: [{ type: 'Playlist', id: 'LIST' }],
    }),
    getPlaylistById: builder.query({
      query: (id) => `playlists/${id}`,
      providesTags: (_result, _error, arg) => {
        return [{ type: 'Playlist', id: arg }];
      },
    }),
    createPlaylist: builder.mutation({
      query: (body) => ({
        url: 'playlists',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Playlist', id: 'LIST' }],
    }),
    updatePlaylist: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `playlists/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Playlist', id: arg.id },
        { type: 'Playlist', id: 'LIST' },
      ],
    }),
    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `playlists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Playlist', id: arg.id },
        { type: 'Playlist', id: 'LIST' },
      ],
    }),
    addTrackToPlaylist: builder.mutation({
      query: ({ playlistId, trackId }) => ({
        url: `playlists/${playlistId}/add-tracks`,
        method: 'POST',
        body: {
          tracks: [trackId],
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Playlist', id: 'LIST' },
        { type: 'Playlist', id: arg.playlistId },
      ],
    }),
    removeTrackFromPlaylist: builder.mutation({
      query: ({ playlistId, trackId }) => ({
        url: `playlists/${playlistId}/remove-tracks`,
        method: 'POST',
        body: {
          tracks: [trackId],
        },
      }),

      invalidatesTags: [{ type: 'Playlist', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistByIdQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
} = playlistApi;
