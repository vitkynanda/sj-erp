import { callApi } from "../config";

const getAllTransactions = (params) => callApi({ url: `/transaction?${params}`, method: "GET" });
const getTransactionType = () => callApi({ url: `/type-transaction`, method: "GET" });
const addNewTransaction = (payload) => callApi({ url: "/transaction", method: "POST", payload });

export { getAllTransactions, addNewTransaction, getTransactionType };
