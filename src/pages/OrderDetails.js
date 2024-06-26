import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../services/OrderServices";
import { Modal, Table, notification } from "antd";

const { confirm } = Modal;
const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // table code start
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },

    {
      title: "Price",
      key: "Price",
      dataIndex: "Price",
    },
    {
      title: "Total",
      key: "Total",
      dataIndex: "Total",
    },
  ]; // table code start

  async function getOrder() {
    let data = await getOrderById(id);
    if (data) {
      setOrder(data);
    }
  }

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, [id]);

  let data = [];

  const handleChangeStatus = (e) => {
    confirm({
      title: "Are you sure?",
      content: "CLick confirm to change the status",
      onOk: () => {
        updateOrder(id, { status: e.target.value }).then((res) => {
          notification.success({
            message: "Status updated successfully",
          });
          getOrder();
        });
      },
    });
  };

  if (order && order.options && order.options.length > 0) {
    console.log(order.options);
    order.options.map((op) =>
      data.push({
        name: op.articleId.name,
        Quantity: op.qty,
        Price: op.articleId.option[0].price,
        Total: op.articleId.option[0].price * op.qty,
      })
    );
  }

  console.log(data);

  let options = [];

  if (order) {
    switch (order.status) {
      case  "ON_PROGRESS":
        options = [
          {
            title: "On progress",
            label: "ON_PROGRESS",
          },

          {
            title: "In production",
            label: "IN_PRODUCTION",
          },
        ];
        break;

      case  "DELIVERED":
        options = [
          {
            title: "Delivered",
            label: "DELIVERED",
          },
        ]
        break;
      case  "IN_PRODUCTION":
        options = [
          {
            title: "In production",
            label: "IN_PRODUCTION",
          },
          {
            title: "Delivered",
            label: "DELIVERED",
          },
        ]
        break;

      default:
        options = [
          {
            title: "On progress",
            label: "ON_PROGRESS",
          },
          {
            title: "Delivered",
            label: "DELIVERED",
          },
          {
            title: "In production",
            label: "IN_PRODUCTION",
          },
        ];
    }
  }

  return (
    <>
      <div>
        <div>
          <h1>order</h1>
          <p>ordered at {order?.createdAt}</p>
          <h2>Shiping informations : </h2>
          <p>Full Name : {order?.userId.fullname}</p>
          <p>Email : {order?.userId.email}</p>
          <p>Phone Number : {order?.userId.phone}</p>
        </div>
        <select onChange={(e) => handleChangeStatus(e)}>
          {options.map((op) => (
            <option value={op.label} selected={op.label == order?.status}>
              {op.title}
            </option>
          ))}
        </select>
      </div>
      <h2>Shiping Adresse</h2>
      <p>
        {order?.userId.addressId.line +
          " " +
          order?.userId.addressId.state +
          ", " +
          order?.userId.addressId.city +
          " " +
          order?.userId.addressId.postalCode}
      </p>
      <Table columns={columns} dataSource={data}></Table>
      <p>{order?.subTotal}</p>
    </>
  );
};

export default OrderDetails;
