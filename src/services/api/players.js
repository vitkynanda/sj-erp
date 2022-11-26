import { callApi } from "services/config";

export const getAllPlayers = () => callApi({ url: `/player`, method: "GET" });
export const addNewPlayer = (payload) => callApi({ url: `/player`, method: "POST", payload });
export const addBankAccountPlayer = (payload) =>
  callApi({ url: `/bank-player`, method: "POST", payload });
