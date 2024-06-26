import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  notification,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/ProductsService";
import { baseUrl, baseUrlImage } from "../services/config";
import Dragger from "antd/lib/upload/Dragger";
import { getAllCategory } from "../services/CategoryService";
import {
  addFrames,
  deleteFrame,
  getAllFrames,
  updateFrame,
} from "../services/FramesService";

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
    title: "Frame Name",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Artist",
    dataIndex: "type",
    key: "type",
  },

  {
    title: "Color",
    key: "color",
    dataIndex: "color",
  },
  {
    title: "Price",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

function Frames() {
  const [frames, setFrames] = useState([]);
  const [open, setOpen] = useState(false);
  const [frame, setFrame] = useState(null);
  const [frameImage, setFrameImage] = useState("");
  const [form] = Form.useForm();

  async function getFrames() {
    let data = await getAllFrames();
    if (data) {
      setFrames(data.reverse());
    }
  }

  useEffect(() => {
    getFrames();
  }, []);

  const handelDeleteFrame = (id) => {
    confirm({
      title: "Are you sure!",
      content: "Click to confirm the delete of the frame!",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        deleteFrame(id).then((res) => {
          getFrames();
        });
      },
    });
  };

  const showDrawer = (f) => {
    if (f && f._id) {
      setFrame(f);
      form.setFieldsValue({
        name: f.name,
        type: f.type,
        price: f.price,
        color: f.color,
      });
      setFrameImage(baseUrlImage + f.image);
    } else {
      setFrame(null);
      setFrameImage("");
      form.resetFields();

      form.setFieldsValue({});
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload: (info) => {
      let file = info;
      console.log(file);
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }
      reader.onload = () => {
        let base64 = reader?.result.toString();

        setFrameImage(base64);
      };
    },
  };

  const data = [];

  if (frames && frames.length > 0) {
    frames.map((frame) => {
      return data.push({
        name: (
          <div className="d-flex align-items-center">
            <img src={baseUrlImage + frame.image} height="50" width="50" />{" "}
            <h2 className="m-0">{frame.name}</h2>
          </div>
        ),
        type: frame.type,
        color: frame.color,
        price: frame.price,
        actions: (
          <div className="actions">
            {/* <EyeOutlined /> */}
            <EditOutlined onClick={() => showDrawer(frame)} />
            <DeleteOutlined onClick={() => handelDeleteFrame(frame._id)} />
          </div>
        ),
      });
    });
  }
  console.log(data);
  const handelSubmit = (values) => {
    let frame = {
      image: frameImage,
      name: values.name,
      type: values.type,
      price: values.price,
      color: values.color,
    };

    addFrames(frame).then((res) => {
      notification.success({
        title: "Create Frame",
        message: "frame Added Succesully",
      });
      setOpen(false);
      getFrames();
    });
  };
  const handelSubmitUpdate = (values) => {
    let img = frameImage.replace(baseUrlImage, "");
    let f = {
      ...frame,
      image: img,
      name: values.name,
      type: values.type,
      price: values.price,
      color: values.color,
    };

    updateFrame(f, frame._id).then((res) => {
      notification.success({
        title: "Update Frame",
        message: "frame updated Succesully",
      });
      setOpen(false);
      getFrames();
    });
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Frames Table"
              extra={
                <>
                  <Button value="a" onClick={showDrawer}>
                    Add new frame
                  </Button>
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
      <Drawer
        title={!frame ? "Add new frame" : "Update frame"}
        width={720}
        onClose={onClose}
        visible={open}
        placement="right"
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          layout="vertical"
          form={form}
          hideRequiredMark
          onFinish={frame ? handelSubmitUpdate : handelSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Dragger {...props} showUploadList={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </Col>
          </Row>

          {frameImage?.toString() != "" && (
            <img src={frameImage} height="40" width="40" />
          )}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="frame name"
                rules={[
                  {
                    required: true,
                    message: "Please enter frame name",
                  },
                ]}
              >
                <Input placeholder="Please enter frame name" name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="frame color"
                rules={[
                  {
                    required: true,
                    message: "Please enter frame color",
                  },
                ]}
              >
                <Input placeholder="Please enter frame color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="frame type"
                rules={[
                  {
                    required: true,
                    message: "Please enter frame type",
                  },
                ]}
              >
                <Input placeholder="Please enter frame type" name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="frame price"
                rules={[
                  {
                    required: true,
                    message: "Please enter frame price",
                  },
                ]}
              >
                <Input placeholder="Please enter frame price" />
              </Form.Item>
            </Col>
          </Row>
          <button className="check-btn" type="submit">
            Create
          </button>
        </Form>
      </Drawer>
    </>
  );
}

export default Frames;
