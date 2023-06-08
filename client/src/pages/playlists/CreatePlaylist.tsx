import { Button, Card, Form, Input } from 'antd';
import { useCreatePlaylistMutation } from '../../redux/api/playlistApi';
import toast from 'react-hot-toast';

const CreatePlaylist = () => {
  const [create] = useCreatePlaylistMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    toast.promise(create(values).unwrap(), {
      loading: 'Creating a new playlist...',
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
    <Card title="Create Playlist">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
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
  );
};

export default CreatePlaylist;
