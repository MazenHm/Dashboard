import { getSession } from "./AdminService";
import { Api } from "./config";

export const getBalance = async (token = null) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.get("/getBalance", { headers: { "x-auth": token || getSession() } })
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const getBalanceByMonths = async (token = null) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.get("/getBalanceByMonths", {
    headers: { "x-auth": token || getSession() },
  })
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const getAmountByMonths = async (token = null) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.get("/getAmountByMonths", {
    headers: { "x-auth": token || getSession() },
  })
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};
