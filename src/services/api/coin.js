import { callApi } from "../config";

const getAllCoins = () => callApi({ url: "/coin", method: "GET" });
const updateBalanceCoin = (payload) => callApi({ url: "/coin-balance", method: "PUT", payload });

export { getAllCoins, updateBalanceCoin };
