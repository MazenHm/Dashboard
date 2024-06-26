import { Button, Col, Form, Input, Layout, Row, notification } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/skeleton/Title";
import React, { useState } from "react";
import { addCoupon } from "../services/ProductsService";

function Coupons() {
    const [result , setResult] = useState(null)
  const onFinish = async (values) => {
    let coupon = {
      ...values,
    };

    const res = await addCoupon(coupon);

    if (res.data) {
      notification.success({
        title: "Add coupon",
        message: "Coupon Added Succesully",
      });
      console.log(res.data.data.coupon)
      setResult(res.data.data.coupon)
    } else if (res.err) {
      notification.error({
        title: "Add coupon",
        message: "failed to add coupon",
      });
      setResult(null)
    }

  };
  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15 text-center">Add coupon</Title>

            <Form onFinish={onFinish} layout="vertical" className="row-col">
            

              <Form.Item
                className="username"
                label="Discount Percentage"
                name="discountPercentage"
                rules={[
                  {
                    required: true,
                    message: "Please input discount Percentage!",
                  },
                ]}
              >
                <Input placeholder="example :10" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Expiry date"
                name="expiryDate"
                rules={[
                  {
                    required: true,
                    message: "Please input expiryDate!",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {result && <div className="d-flex gap-2"> code coupon : {result.code}</div>}
        </Row>
      </Content>
     
    </Layout>
  );
}

export default Coupons;
