import { callApi } from "../config";

const login = (payload) => callApi({ url: "/login", method: "POST", payload });

export { login };
