import {
  Row,
  Col,
  Card,
  Table,
  message,
  Button,
  Typography,
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  notification,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import Dragger from "antd/lib/upload/Dragger";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
} from "../services/CategoryService";
import { getAllOrders } from "../services/OrderServices";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const { Title } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "Client",
    dataIndex: "client",
    key: "client",
    width: "20%",
  },
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
    width: "20%",
  },
  {
    title: "Totale",
    key: "totale",
    dataIndex: "totale",
    width: "20%",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    width: "20%",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    width: "15%",
  },
];

function Orders() {
  //   const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [orders, setOrders] = useState([]);

  const [form] = Form.useForm();

  async function getOrders() {
    let data = await getAllOrders();
    if (data) {
      setOrders(data.reverse());
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  const data = [];

  if (orders && orders.length > 0) {
    orders.map((order) => {
      const formattedPrice = order.totalPrice.toFixed(2);

      return data.push({
        client: order.userId?.fullname || "",
        product: order.options.length,
        status: order.status,
        totale: formattedPrice,
        actions: (
          <div className="actions">
            <Link to={'/orders/'+order._id}><EyeOutlined/></Link>
            {/* <EditOutlined /> */}
            <DeleteOutlined
            //   onClick={() => handelDeleteCategory(o._id)}
            />
          </div>
        ),
      });
    });
  }

  console.log(data);
  //   const handelDeleteCategory = (id) => {
  // //     confirm({
  // //       title: "Are you sure!",
  // //       content: "Click to confirm the delete of the category!",
  // //       okText: "Confirm",
  // //       cancelText: "Cancel",
  // //       onOk: () => {
  // //         deleteCategory(id).then((res) => {
  // //           notification.success({
  // //             title: "Create Category",
  // //             message: "Category deleted Succesully",
  // //           });
  // //           getCategories();
  // //         });
  // //       },
  // //     });
  // //   };
  //   //   const [product, setProduct] = useState(null);
  //   const [open, setOpen] = useState(false);

  //   const showDrawer = () => {
  //     setOpen(true);
  //   };
  //   const onClose = () => {
  //     setOpen(false);
  //   };

  //     addCategory(category).then((res) => {
  //       notification.success({
  //         title: "Create Category",
  //         message: "Category Added Succesully",
  //       });
  //       setOpen(false);
  //       getCategories();
  //     });
  //   };

  //   const props = {
  //     name: "file",
  //     multiple: true,
  //     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //     beforeUpload: (info) => {
  //       let file = info;
  //       console.log(file);
  //       const reader = new FileReader();
  //       if (file) {
  //         reader.readAsDataURL(file);
  //       }
  //       reader.onload = () => {
  //         let base64 = reader?.result.toString();

  //         let index = productImages.indexOf(base64);
  //         if (index == -1) {
  //           setProductImages((prev) => [...prev, base64]);
  //           console.log(base64);
  //         }
  //       };
  //     },
  //   };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Categories Table"
              extra={
                <>
                  {/* <Button value="a" onClick={showDrawer}>
                    Add new category
                  </Button> */}
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* <Drawer
        title={"Create Category"}
        width={720}
        onClose={onClose}
        visible={open}
        placement="right"
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" form={form} onFinish={handelSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Category Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Category Name",
                  },
                ]}
              >
                <Input placeholder="Please enter category Name" name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter category description",
                  },
                ]}
              >
                <Input placeholder="Please enter category description" />
              </Form.Item>
            </Col>
          </Row>
          <button className="check-btn" type="submit">
            {"Create"}
          </button>
        </Form>
      </Drawer> */}
    </>
  );
}

export default Orders;
