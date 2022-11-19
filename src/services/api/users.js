import { callApi } from "../config";

const getAllUsers = () => callApi({ url: "/user", method: "GET" });

const getAllRoles = () => callApi({ url: "/role", method: "GET" });

const addNewUser = (payload) => callApi({ url: "/user", method: "POST", payload });

export { getAllUsers, addNewUser, getAllRoles };
