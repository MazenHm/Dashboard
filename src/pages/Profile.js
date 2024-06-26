import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { updateUser } from "../services/AdminService";
import { useAuth } from "../context/auth/authContext";

function Profile() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [user, setUser] = useState(null);
  const auth = useAuth();
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(auth);
    if (auth && auth.user) {
      setUser(auth.user);
      form.setFieldsValue({
        fullname: auth.user?.fullname,
        email: auth.user?.email,
        phone: auth.user?.phone,
      });
      console.log(form.getFieldsValue());
    }
  }, [JSON.stringify(auth)]);

  async function handleUpdate(values) {
    if (!values.password) {
      delete values.password;
      delete values.confirm;
    }
    let payload = {
      body: { ...values },
      id: user._id,
    };
    delete payload.body.confirm;
    if (user && user._id) {
      let res = await updateUser(payload);
      if (res) {
        notification.success({ message: "user updated successfuly" });
      }
    }
  }
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleUpdate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Profile;
