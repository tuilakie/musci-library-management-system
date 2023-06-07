import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api/';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Track', 'Playlist'],
  endpoints: () => ({}),
});
