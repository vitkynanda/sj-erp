import { callApi } from "../config";

const getBonuses = (params) => callApi({ url: `/bonus?${params}`, method: "GET" });

const addBonus = (payload) => callApi({ url: `/bonus`, method: "POST", payload });

export { getBonuses, addBonus };
