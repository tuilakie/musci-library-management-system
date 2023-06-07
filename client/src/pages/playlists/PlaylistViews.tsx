import { Button, Card, Divider, Input, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useNavigate } from 'react-router-dom';
import { useGetPlaylistsQuery } from '../../redux/api/playlistApi';
import { RiEditCircleLine } from 'react-icons/ri';
import { setSelectedPlaylist } from '../../redux/features/playlistSlice';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Total tracks',
    dataIndex: 'totalTracks',
    key: 'totalTracks',
  },
];

const PlaylistViews = () => {
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

  const { data, isLoading, isFetching } = useGetPlaylistsQuery({
    skip,
    ...search,
  });

  const handleSearch = () => {
    setSearch({
      title,
      artist,
      album,
      genre,
    });
  };

  const handleReset = () => {
    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');
    setSearch(null);
  };

  const handleAdd = () => {
    navigate('/playlist/create');
  };

  const handleTableChange = (pagination: any, _filters: any, _sorter: any) => {
    setSkip((pagination.current - 1) * pagination.pageSize);
    setTake(pagination.pageSize);
  };

  const selectedPlaylist = useAppSelector(
    (state) => state.playlistState.selectedPlaylist,
  );

  const { data: dataSource } = data || {};

  const columnsWithAction = [
    ...columns,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 300,
      render: (id: number) => (
        <Space direction="horizontal">
          <Button
            icon={<RiEditCircleLine />}
            onClick={() => navigate(`/playlist/edit/${id}`)}
          >
            Edit
          </Button>
          {selectedPlaylist?.id === id ? (
            <Button
              onClick={() => {
                navigate('/track/views');
              }}
            >
              Add Track
            </Button>
          ) : (
            <Button
              onClick={() => {
                const playlist = dataSource?.find(
                  (item: any) => item.id === id,
                );
                dispatch(setSelectedPlaylist(playlist || null));
              }}
            >
              Select
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space direction="horizontal" size="large">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <Input
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <Input
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Space direction="horizontal">
            <Button onClick={handleSearch} icon={<SearchOutlined />}>
              Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleAdd} icon={<FileAddOutlined />}>
              Create
            </Button>
          </Space>
        </Space>
        <Divider />
        <Table
          loading={isLoading || isFetching}
          dataSource={
            dataSource?.map((item: any) => ({
              ...item,
              totalTracks: item?._count.tracks || 0,
            })) || []
          }
          columns={columnsWithAction}
          rowKey={(record) => record.id}
          onChange={handleTableChange}
          pagination={{
            total: data?.meta?.total,
            pageSize: take,
            current: skip / take + 1,
          }}
        />
      </Space>
    </Card>
  );
};

export default PlaylistViews;
