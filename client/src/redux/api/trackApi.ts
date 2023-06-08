import { baseApi } from './baseApi';
import { HttpResponse, Track } from './type.api';

export const trackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTracks: builder.query<
      HttpResponse<Track[]>,
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
        url: 'tracks',
        params: {
          title,
          artist,
          album,
          genre,
          skip,
          take,
        },
      }),
      providesTags: [{ type: 'Track', id: 'LIST' as const }],
    }),
    getTrackById: builder.query<HttpResponse<Track>, string>({
      query: (id) => `track/${id}`,
      providesTags: (_result, _error, arg) => {
        return [{ type: 'Track', id: arg }];
      },
    }),
    createTrack: builder.mutation<HttpResponse<Track>, Omit<Track, 'id'>>({
      query: (body) => ({
        url: 'track',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: [{ type: 'Track', id: 'LIST' as const }],
    }),
    updateTrack: builder.mutation<HttpResponse<Track>, Track>({
      query: ({ id, ...body }) => ({
        url: `track/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Track', id: arg.id },
        { type: 'Track', id: 'LIST' as const },
      ],
    }),
    deleteTrack: builder.mutation({
      query: (id) => ({
        url: `track/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'Track', id: 'LIST' as const },
      ],
    }),
  }),
});

export const {
  useGetTracksQuery,
  useGetTrackByIdQuery,
  useCreateTrackMutation,
  useUpdateTrackMutation,
  useDeleteTrackMutation,
} = trackApi;
