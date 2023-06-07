import { Button, Card, Divider, Input, Space, Table, Tag } from 'antd';
import { useGetTracksQuery } from '../../redux/api/trackApi';
import { useState } from 'react';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useNavigate } from 'react-router-dom';
import { RiEditCircleLine } from 'react-icons/ri';
import { setSelectedPlaylist } from '../../redux/features/playlistSlice';
import {
  useAddTrackToPlaylistMutation,
  useGetPlaylistByIdQuery,
} from '../../redux/api/playlistApi';
import toast from 'react-hot-toast';
import { Track } from '../../redux/api/type.api';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    filterSearch: true,
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
    filterSearch: true,
  },
  {
    title: 'Album',
    dataIndex: 'album',
    key: 'album',
    filterSearch: true,
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
    filterSearch: true,
  },
  {
    title: 'Release Year',
    dataIndex: 'releaseYear',
    key: 'releaseYear',
    filterSearch: false,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    filterSearch: false,
  },
];

const TracksViews = () => {
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [title, setTitle] = useState<string | undefined>('');
  const [artist, setArtist] = useState<string | undefined>('');
  const [album, setAlbum] = useState<string | undefined>('');
  const [genre, setGenre] = useState<string | undefined>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<{
    title?: string | undefined;
    artist?: string | undefined;
    album?: string | undefined;
    genre?: string | undefined;
  } | null>(null);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          value={
            search && search[dataIndex as keyof typeof search]
              ? search[dataIndex as keyof typeof search]
              : ''
          }
          onChange={(e) => {
            setSearch({
              ...search,
              [dataIndex]: e.target.value,
            });
          }}
          placeholder={`Search ${dataIndex}`}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          (
            document.querySelector(
              `input.ant-input[placeholder="Search ${dataIndex}"]`,
            )! as HTMLInputElement
          ).focus();
        }, 0);
      }
    },
  });

  const selectedPlaylist = useAppSelector(
    (state) => state.playlistState.selectedPlaylist,
  );

  const { data: playlistData } = useGetPlaylistByIdQuery(
    selectedPlaylist?.id || '',
    { skip: !selectedPlaylist },
  );

  console.log(playlistData);

  const columnsWithAction = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<FileAddOutlined />}
            onClick={() => handleAddTrackToPlaylist(record.id)}
            disabled={
              !selectedPlaylist ||
              (playlistData &&
                playlistData.data.tracks.find(
                  (track: Track) => track.id === record.id,
                ))
            }
            title={
              !selectedPlaylist
                ? 'Please select a playlist'
                : `add a track to ${selectedPlaylist.name}`
            }
          >
            {playlistData &&
            playlistData.data.tracks.find(
              (track: Track) => track.id === record.id,
            )
              ? 'Added'
              : 'Add to Playlist'}
          </Button>
          <Button
            icon={<RiEditCircleLine />}
            onClick={() => navigate(`/track/edit/${record.id}`)}
          >
            Edit
          </Button>
        </Space>
      ),
      filterSearch: false,
      width: 100,
    },
  ];

  const columnsWithSearch = columnsWithAction.map((column) => {
    if (column.filterSearch) {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const { data, isLoading, isFetching } = useGetTracksQuery({
    skip,
    take,
    title,
    artist,
    album,
    genre,
  });

  const [addTrack] = useAddTrackToPlaylistMutation();

  const handleAddTrackToPlaylist = async (trackId: string) => {
    if (selectedPlaylist) {
      toast.promise(
        addTrack({
          playlistId: selectedPlaylist.id,
          trackId,
        }).unwrap(),
        {
          loading: `Adding track to ${selectedPlaylist.name}`,
          success: (data) => {
            return data.message;
          },
          error: (err) => {
            return err.message;
          },
        },
      );
    }
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <Card title="Tracks Music">
      {
        // any attribute of search is not undefined
        search &&
          (search.title || search.artist || search.album || search.genre) && (
            <>
              <Space direction="horizontal">
                {search.title && (
                  <Tag
                    color="blue"
                    style={{ userSelect: 'none', padding: '2px' }}
                    closable={true}
                    onClose={() => {
                      setSearch({
                        ...search,
                        title: undefined,
                      });
                      if (title) setTitle(undefined);
                    }}
                  >
                    Title: {search.title}
                  </Tag>
                )}
                {search.artist && (
                  <Tag
                    color="yellow"
                    style={{ userSelect: 'none', padding: '2px' }}
                    closable={true}
                    onClose={() => {
                      setSearch({
                        ...search,
                        artist: undefined,
                      });
                      if (artist) setArtist(undefined);
                    }}
                  >
                    Artist: {search.artist}
                  </Tag>
                )}
                {search.album && (
                  <Tag
                    color="green"
                    style={{ userSelect: 'none', padding: '2px' }}
                    closable={true}
                    onClose={() => {
                      setSearch({
                        ...search,
                        album: undefined,
                      });
                      if (album) setAlbum(undefined);
                    }}
                  >
                    Album: {search.album}
                  </Tag>
                )}
                {search.genre && (
                  <Tag
                    color="red"
                    style={{ userSelect: 'none', padding: '2px' }}
                    closable={true}
                    onClose={() => {
                      setSearch({
                        ...search,
                        genre: undefined,
                      });
                      if (genre) setGenre(undefined);
                    }}
                  >
                    Genre: {search.genre}
                  </Tag>
                )}
                <Space
                  direction="horizontal"
                  style={{ marginLeft: 'auto', marginRight: '0' }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      const { title, artist, album, genre } = search;
                      setTitle(title);
                      setArtist(artist);
                      setAlbum(album);
                      setGenre(genre);
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    onClick={() => {
                      setSearch({
                        title: undefined,
                        artist: undefined,
                        album: undefined,
                        genre: undefined,
                      });
                      setTitle(undefined);
                      setArtist(undefined);
                      setAlbum(undefined);
                      setGenre(undefined);
                    }}
                  >
                    Clear
                  </Button>
                </Space>
              </Space>
              <Divider />
            </>
          )
      }
      <Divider />
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}
      >
        {selectedPlaylist ? (
          <>
            <Tag color="blue" style={{ userSelect: 'none', padding: '2px' }}>
              Selected Playlist: {selectedPlaylist.name}
            </Tag>
            <Button
              type="primary"
              onClick={() => {
                dispatch(setSelectedPlaylist(null));
                navigate('/playlist/views');
              }}
            >
              un-select
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              navigate('/playlist/views');
            }}
          >
            Select Playlist
          </Button>
        )}
      </div>

      <Table
        columns={columnsWithSearch}
        dataSource={data?.data}
        rowKey={(record: any) => record.id}
        pagination={
          data?.meta && {
            total: data?.meta.total,
            pageSize: data?.meta.size,
            current: data?.meta.current,
            onChange: (page: number, pageSize: number) => {
              setSkip((page - 1) * pageSize);
              setTake(pageSize);
            },
          }
        }
      />
    </Card>
  );
};

export default TracksViews;
