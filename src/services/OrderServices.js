import { Api } from "./config";

export const getAllOrders = async () => {
  let response = await Api.get("/getAllOrders");

  if (response.data) {
    return response.data;
  }
  return null;
};

export const getOrderById = async (id) => {
  let response = await Api.get("/getOrderById/"+id);

  if (response.data) {
    return response.data;
  }
  return null;
};

export const updateOrder = async (id , body) => {
  let response = await Api.put("/updateOrder/"+id , body);

  if (response.data) {
    return response.data;
  }
  return null;
};