import { callApi } from "../config";

const getDashboardData = (params) => callApi({ url: `/dashboard?${params}`, method: "GET" });
const getLogData = (params) => callApi({ url: `/log?${params}`, method: "GET" });

export { getDashboardData, getLogData };
