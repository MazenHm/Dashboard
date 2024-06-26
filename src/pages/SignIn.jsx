import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import { useLocation } from "react-router-dom";
import {
  authenticate,
  getConnectedUser,
  storeToken,
} from "../services/AdminService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";


const { Title } = Typography;
const Content  = Layout;




const Login = () => {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();
    const onFinish = async (values) => {
      let user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
      const res = await authenticate(user);
      let path = location.state?.redirect || "/dashboard";
      console.log(location.state);
      if (res.data && res.data.role=="ADMIN") {
        console.log(res.data);
        let response = await getConnectedUser(res.data.token);
        if (response.data) {
          console.log(response.data);
          auth.setUser(response.data);
        }
        storeToken(res.data.token);
        history.push(path);
      } else if (res.err) {
        console.log(res.err);
        notification.error({
          title: "Create User",
          message: " Unauthorized",
        });
      }

      console.log(res);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15 text-center">Sign In</Title>
                <Title className="font-regular text-muted text-center" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
             
            </Row>
          </Content>
  
        </Layout>
      </>
    );
  }
  export default Login;

