import { Api } from "./config";


export const addProduct = async (payload) => {
    console.log(payload);
    const response = {
      data: null,
      err: null,
    };
    await Api.post("/addProduct", payload)
      .then((res) => {
        response.data = res;
      })
      .catch((err) => {
        response.err = err;
      });
  
    return response;
  };

  export const addCoupon = async (payload) => {
    console.log(payload);
    const response = {
      data: null,
      err: null,
    };
    await Api.post("/coupons", payload)
      .then((res) => {
        response.data = res;
      })
      .catch((err) => {
        response.err = err;
      });
  
    return response;
  };


  export const updateProduct = async (payload , id) => {
    console.log(payload);
    const response = {
      data: null,
      err: null,
    };
    await Api.put("/updateProduct/" +id, payload)
      .then((res) => {
        response.data = res;
      })
      .catch((err) => {
        response.err = err;
      });
  
    return response;
  };

export const getProductById = async (id) => {
  let response = await Api.get(`/getProduct/${id}`);

  if (response.data) {
    return response.data;
  }
  return null;
};

export const deleteProduct = async (id) => {
    let response = await Api.delete(`/deleteProduct/${id}`);
  
    if (response.data) {
      return response.data;
    }
    return null;
  };

export const getAllProducts = async () => {
  let response = await Api.get("/getAllProducts");

  if (response.data) {
    return response.data;
  }
  return null;
};
