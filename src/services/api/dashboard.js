import { callApi } from "../config";

const getDashboardData = () => callApi({ url: "/user", method: "GET" });
const getLogData = (params) => callApi({ url: `/log?${params}`, method: "GET" });

export { getDashboardData, getLogData };
