import { Button, Card, DatePicker, Form, Input, InputNumber } from 'antd';
import { useCreateTrackMutation } from '../../redux/api/trackApi';
import toast from 'react-hot-toast';

const CreateTrack = () => {
  const [createTrack] = useCreateTrackMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (typeof values.releaseYear === 'object') {
      values.releaseYear = +values.releaseYear.format('YYYY');
    }
    console.log(values);
    toast.promise(createTrack(values).unwrap(), {
      loading: 'Creating a new track music...',
      success: (data: any) => {
        if (data.success) {
          form.resetFields();
        }
        console.log(data);
        return data.message;
      },
      error: (err) => err.message,
    });
  };
  return (
    <Card title="Create Track Music">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
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

export default CreateTrack;
