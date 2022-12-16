import Cookies from "js-cookie";
import { convertBase64 } from "utils";

const callApi = async ({ url, method, payload, customURL }) => {
  let body;
  const headers = {};

  if (url !== "/login")
    headers["Authorization"] = `${convertBase64("decode", Cookies.get("token"))}`;

  if (["POST", "PUT"].includes(method)) {
    if (payload) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }
  }

  try {
    const res = await fetch(`${customURL || process.env.REACT_APP_BASE_URL_DEV + url}`, {
      method,
      headers,
      body,
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export { callApi };
