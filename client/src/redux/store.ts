import { playlistSlice } from './features/playlistSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playlistApi } from './api/playlistApi';
import { trackApi } from './api/trackApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { baseApi } from './api/baseApi';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['selectedPlaylist'],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [playlistApi.reducerPath]: playlistApi.reducer,
  [trackApi.reducerPath]: trackApi.reducer,
  playlistState: persistReducer(persistConfig, playlistSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      baseApi.middleware,
      playlistApi.middleware,
      trackApi.middleware,
    ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
