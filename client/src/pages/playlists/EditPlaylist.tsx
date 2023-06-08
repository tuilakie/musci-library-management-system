import { Button, Card, Form, Input, Radio, Space, Table } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeletePlaylistMutation,
  useGetPlaylistByIdQuery,
  useRemoveTrackFromPlaylistMutation,
  useUpdatePlaylistMutation,
} from '../../redux/api/playlistApi';
import { useState } from 'react';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
  },
  {
    title: 'Album',
    dataIndex: 'album',
    key: 'album',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Release Year',
    dataIndex: 'releaseYear',
    key: 'releaseYear',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
];

const EditPlaylist = () => {
  const [form] = Form.useForm();
  const { playlistId } = useParams() as { playlistId: string };

  const {
    data: playlistData,
    isLoading,
    isFetching,
  } = useGetPlaylistByIdQuery(playlistId);
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [removeTrack] = useRemoveTrackFromPlaylistMutation();
  const navigate = useNavigate();

  const { data } = playlistData || {};
  const { name, description, tracks } = data || {};

  const onFinish = async (values: any) => {
    toast.promise(
      updatePlaylist({
        ...values,
        id: playlistId,
      }).unwrap(),
      {
        loading: 'Creating a new playlist...',
        success: (data: any) => {
          if (data.success) {
            form.resetFields();
            navigate('/playlist/views');
          }
          console.log(data);
          return data.message;
        },
        error: (err) => err.message,
      },
    );
  };

  const [selection, setSelection] = useState('playlistInfo');

  const handleSelectChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setSelection(e.target.value);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const columnsWithAction = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text: any, record: any) => (
        <Space>
          <Button
            type="primary"
            danger
            onClick={async () => {
              toast.promise(
                removeTrack({ playlistId, trackId: record.id }).unwrap(),
                {
                  loading: 'Deleting a playlist...',
                  success: (data: any) => {
                    return data.message;
                  },
                  error: (err) => err.message,
                },
              );
            }}
          >
            Remove
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/track/edit/${record.id}`);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Radio.Group value={selection} onChange={handleSelectChange}>
        <Radio.Button value="playlistInfo"> Playlist infomation </Radio.Button>
        <Radio.Button value="playlistTracks">Tracks infomation </Radio.Button>
      </Radio.Group>
      <br />
      <br />
      {selection === 'playlistInfo' ? (
        <Card
          title="Edit Playlist"
          extra={
            <Button
              type="primary"
              danger
              onClick={async () => {
                toast.promise(deletePlaylist(playlistId).unwrap(), {
                  loading: 'Deleting a playlist...',
                  success: (data: any) => {
                    if (data.success) {
                      navigate('/playlist/views');
                    }
                    return data.message;
                  },
                  error: (err) => err.message,
                });
              }}
            >
              DELETE
            </Button>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{
              name,
              description,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ type: 'string' }, { required: true }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ type: 'string' }, { required: true }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Card title="Tracks infomation">
          <Table
            columns={columnsWithAction}
            dataSource={tracks}
            rowKey={(record) => record.id}
          />
        </Card>
      )}
    </>
  );
};

export default EditPlaylist;
