import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layouts/RootLayout';
import { Typography } from 'antd';
import CreateTrack from '../pages/tracks/CreateTrack';
import CreatePlaylist from '../pages/playlists/CreatePlaylist';
import TracksViews from '../pages/tracks/TrackViews';
import PlaylistViews from '../pages/playlists/PlaylistViews';
import EditPlaylist from '../pages/playlists/EditPlaylist';
import EditTrack from '../pages/tracks/EditTrack';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Typography.Title
            level={2}
            style={{
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Wellcome to Music Library Management Systems !!!
          </Typography.Title>
        ),
      },
      {
        path: '/track',
        children: [
          {
            path: 'create',
            element: <CreateTrack />,
          },
          {
            path: 'views',
            element: <TracksViews />,
          },
          {
            path: 'edit/:trackId',
            element: <EditTrack />,
          },
        ],
      },
      {
        path: '/playlist',
        children: [
          {
            path: 'create',
            element: <CreatePlaylist />,
          },
          {
            path: 'views',
            element: <PlaylistViews />,
          },
          {
            path: 'edit/:playlistId',
            element: <EditPlaylist />,
          },
        ],
      },
    ],
  },
]);

export default router;
