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
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
  },

  {
    title: "Prix",
    key: "prix",
    dataIndex: "prix",
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

function Tables() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [optionLength, setOptionsLength] = useState(1);
  const [refreshOptions, setRefreshOption] = useState(false);
  async function getProducts() {
    let data = await getAllProducts();
    if (data) {
      setProducts(data.reverse());
    }
  }

  async function getCategories() {
    let data = await getAllCategory();
    if (data) {
      setCategories(data);
    }
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handelDeleteProduct = (id) => {
    confirm({
      title: "Are you sure!",
      content: "Click to confirm the delete of the product!",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        deleteProduct(id).then((res) => {
          getProducts();
        });
      },
    });
  };

  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const showDrawer = async (e, prod = null) => {
    e.preventDefault();

    if (prod && prod._id) {
      form.setFieldsValue({
        name: prod.name,
        categoryId: prod.categoryId._id,
        price: prod.option.price,
        description: prod.description,
      });

      let images = prod?.images?.map((image) => {
        return baseUrlImage + image.url;
      });
      setProduct(prod);
      setOptions(prod.option)

      setOptionsLength(prod.option.length)
      setProductImages(images);
    } else {
      form.resetFields();
      form.setFieldsValue({});
      setProduct(null);
      setProductImages([]);
      setOptions([])

      setOptionsLength(1)
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

      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }
      reader.onload = () => {
        let base64 = reader?.result.toString();

        let index = -1;
        if (productImages.length > 0) {
          index = productImages.indexOf(base64);
        }
        if (index == -1) {
          setProductImages((prev) => [...prev, base64]);
          console.log(base64);
        }
      };
    },
  };

  const getPrice =(options)=>{
    let minPrice = options[0].price
    options.map((op) =>{
      if(minPrice > op.price){
        minPrice = op.price
      }
    })

    return minPrice
}
  const data = [];

  if (products && products.length > 0) {
    products.map((product) => {
      return data.push({
        name: (
          <div className="product-info">
            <img
              src={baseUrlImage + product.images[0].url}
              height="50"
              width="50"
            />{" "}
            <h2>{product.name}</h2>
          </div>
        ),
        artist: product.description,
        prix: getPrice(product.option) +' TND',
        category: product.categoryId.name,
        actions: (
          <div className="actions">
            <EyeOutlined />
            <EditOutlined onClick={(e) => showDrawer(e, product)} />
            <DeleteOutlined onClick={() => handelDeleteProduct(product._id)} />
          </div>
        ),
      });
    });
  }

  const handelSubmit = (values) => {
    if (productImages && productImages.length > 0 && options && options.length>0) {
      let product = {
        images: productImages,
        name: values.name,
        categoryId: values.categoryId,
        option:options,
        description: values.description,
      };

      addProduct(product).then((res) => {
        notification.success({
          title: "Create Product",
          message: "Product Added Succesully",
        });
        setOpen(false);
        getProducts();
      });
    }
  };
  const handelSubmitUpdate = (values) => {
    if (productImages && productImages.length > 0) {
     
     let allOptions =options.map((op)=>  {
      return {size : op.size,
      price : op.price}
     })
     console.log(allOptions)
      let productU = {
        name: values.name,
        categoryId: values.categoryId,
        images: productImages,
        option:allOptions,
        description: values.description,
      };

      console.log(productU, product._id);
      updateProduct(productU, product._id).then((res) => {
        notification.success({
          title: "Create Product",
          message: "Product Added Succesully",
        });
        setOpen(false);
        getProducts();
      });
    }
  };
  const handelChange = (e) => {
    if (product) {
      setProduct((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };
  const handleRemoveRow = (e, i)=>{
    e.preventDefault()

    let allOptions = options
    if(allOptions && allOptions.length>0){

      allOptions.splice(i, 1)
      setOptions(allOptions)
    }
    setOptionsLength((prev)=>prev -1)
  }

  const handleAddOption =(e, index) =>{
    console.log(index , e.target.id)
    if(!options || !options.length){
        setOptions([{[e.target.id] : e.target.value}])
    }else{
      let allOptions = options
      allOptions[index] = {...allOptions[index] , [e.target.id] : e.target.value}
     
      setOptions(allOptions)
      setRefreshOption((prev) => !prev)
    }
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products Table"
              extra={
                <>
                  <Button value="a" onClick={(e) => showDrawer(e)}>
                    Add new product
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
        title={!product ? "Add new product" : "Update product"}
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
          onFinish={!product ? handelSubmit : handelSubmitUpdate}
        >
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
          {productImages?.map((image) => (
            <img src={image} width="50" height="50" />
          ))}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter product name",
                  },
                ]}
              >
                <Input placeholder="Please enter product name" name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Artist Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter artist name",
                  },
                ]}
              >
                <Input placeholder="Please enter artist name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a category",
                  },
                ]}
              >
                <Select placeholder="Please select a Catgeory">
                  {categories?.map((category) => (
                    <Option value={category._id}>{category.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <button className="check-btn" type="submit">
            {product ? "Update" : "Create"}
          </button>
        </Form>
        <label onClick={() => setOptionsLength((prev) => prev + 1)}>
          Add New Option
        </label>
        {[...Array(optionLength).keys()].map((x, index) => (
          <Form
         
          >
            <Row>
  <Col span={12}>
              <Form.Item
                name="price"
                label="price"
                
                rules={[
                  {
                    required: true,
                    message: "Please enter the product price",
                  },
                ]}
              >
                {console.log(options[index]?.price)}
                <Input placeholder="Please enter product price"   id="price" value={options[index]?.price } onChange={e=> handleAddOption(e, index) } />
              </Form.Item>
            </Col>
              <Col span={12}>
              <Form.Item
                name="size"
                label="size"
                rules={[
                  {
                    required: true,
                    message: "Please enter the option size",
                  },
                ]}
              >
                  <div className="d-flex gap-2 align-items-center">
                        <Input placeholder="Please enter option size" value={options[index]?.size } id="size" onChange={e=> handleAddOption(e, index) } />
                        <span className="close" onClick={(e)=> handleRemoveRow(e, index) }>&times;</span>
                  </div>
              </Form.Item>
            </Col>
            </Row>
          
          </Form>
        ))}
      </Drawer>
    </>
  );
}

export default Tables;
