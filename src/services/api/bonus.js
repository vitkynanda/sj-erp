import { callApi } from "../config";

const getBonuses = (params) => callApi({ url: `/bonus?${params}`, method: "GET" });

const addBonus = (payload) => callApi({ url: `/bonus`, method: "POST", payload });

const editBonus = (payload, id) => callApi({ url: `/bonus/${id}`, method: "PUT", payload });

export { getBonuses, addBonus, editBonus };
