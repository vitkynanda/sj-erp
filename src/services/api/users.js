import { callApi } from "../config";

const getAllUsers = () => callApi({ url: "/user", method: "GET" });

const getAllRoles = () => callApi({ url: "/role", method: "GET" });

const addNewUser = (payload) => callApi({ url: "/user", method: "POST", payload });

const deleteUser = (id) => callApi({ url: `/user/${id}`, method: "DELETE" });

export { getAllUsers, addNewUser, getAllRoles, deleteUser };
