import { Api } from "./config";

export const getAllFrames = async () => {
  let response = await Api.get("/getAllFrames");

  if (response.data) {
    return response.data;
  }
  return null;
};
export const addFrames = async (payload) => {
  console.log(payload);
  const response = {
    data: null,
    err: null,
  };
  await Api.post("/addFrames", payload)
    .then((res) => {
      response.data = res;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const updateFrame = async (payload , id) => {
  console.log(payload);
  const response = {
    data: null,
    err: null,
  };
  await Api.put("/updateFrame/" +id, payload)
    .then((res) => {
      response.data = res;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};
export const deleteFrame = async (id) => {
    let response = await Api.delete(`/deleteFrame/${id}`);
  
    if (response.data) {
      return response.data;
    }
    return null;
  };

