import { Api } from "./config";
export const addCategory = async (payload) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.post("/addCategory", payload)
    .then((res) => {
      response.data = res;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const getAllCategory = async () => {
  let response = await Api.get("/getAllCategory");

  if (response.data) {
    return response.data;
  }
  return null;
};

export const deleteCategory = async (id) => {
  let response = await Api.delete(`/deleteCategory/${id}`);

  if (response.data) {
    return response.data;
  }
  return null;
};
