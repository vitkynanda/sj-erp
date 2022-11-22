import { callApi } from "../config";

const getAllBanks = () => callApi({ url: "/bank", method: "GET" });
const addNewBank = (payload) => callApi({ url: "/bank", method: "POST", payload });
const updateBalanceBank = (payload) => callApi({ url: "/bank-balance", method: "PUT", payload });
const updateBankData = (payload, id) => callApi({ url: `/bank/${id}`, method: "PUT", payload });

export { getAllBanks, addNewBank, updateBalanceBank, updateBankData };