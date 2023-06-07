import { Button, Card, Form, Input } from 'antd';

const CreatePlaylist = () => {
  return (
    <Card title="Create Playlist">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
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
