import { callApi } from "services/config";

export const getAllPlayers = (params) => callApi({ url: `/player?${params}`, method: "GET" });
export const addNewPlayer = (payload) => callApi({ url: `/player`, method: "POST", payload });
export const addBankAccountPlayer = (payload) =>
  callApi({ url: `/bank-player`, method: "POST", payload });
export const updatePlayer = (payload) => callApi({ url: `/player`, method: "PUT", payload });
