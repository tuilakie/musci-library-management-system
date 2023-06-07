import { Button, Card, DatePicker, Form, Input, InputNumber } from 'antd';
import {
  useDeleteTrackMutation,
  useUpdateTrackMutation,
  useGetTrackByIdQuery,
} from '../../redux/api/trackApi';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const EditTrack = () => {
  const { trackId } = useParams() as { trackId: string };
  const { data, isLoading, isFetching } = useGetTrackByIdQuery(trackId);
  const [updateTrack] = useUpdateTrackMutation();
  const [deleteTrack] = useDeleteTrackMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const onFinish = async (values: any) => {
    if (typeof values.releaseYear === 'object') {
      values.releaseYear = +values.releaseYear.format('YYYY');
    }
    console.log(values);
    toast.promise(
      updateTrack({
        ...values,
        id: trackId,
      }).unwrap(),
      {
        loading: 'Creating a new track music...',
        success: (data: any) => {
          if (data.success) {
            form.resetFields();
            navigate('/track/views');
          }
          console.log(data);
          return data.message;
        },
        error: (err) => err.message,
      },
    );
  };

  const handleOnDelete = async () => {
    toast.promise(deleteTrack(trackId).unwrap(), {
      loading: 'Deleting a track music...',
      success: (data: any) => {
        if (data.success) {
          navigate('/track/views');
        }
        return data.message;
      },
      error: (err) => err.message,
    });
  };

  return (
    <Card
      title="Create Track Music"
      extra={
        <Button type="primary" danger onClick={handleOnDelete}>
          DELETE
        </Button>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={
          {
            ...data?.data,
            releaseYear: moment(data?.data.releaseYear, 'YYYY') || moment(),
          } || {}
        }
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { type: 'string' },
            {
              required: true,
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Artist"
          name="artist"
          rules={[
            { type: 'string' },
            {
              required: true,
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Album"
          name="album"
          rules={[
            { type: 'string' },
            {
              required: true,
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Genre"
          name="genre"
          rules={[
            { type: 'string' },
            {
              required: true,
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Release Year"
          name="releaseYear"
          rules={[
            {
              type: 'number',
              transform: (value) => Number(value),
            },
            {
              required: true,
            },
          ]}
        >
          <DatePicker picker="year" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            { type: 'number' },
            {
              required: true,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditTrack;
