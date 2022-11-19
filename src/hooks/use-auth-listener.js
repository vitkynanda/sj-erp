import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useGlobalStore } from "store";
import { convertBase64 } from "utils";
const token = Cookies.get("token");
const useAuthListener = () => {
  const { userLoggedIn, setUserLoggedIn } = useGlobalStore();
  let user = token ? jwt_decode(convertBase64("decode", token)) : false;
  if (!userLoggedIn.user_id && user) setUserLoggedIn(user);
  return user;
};

export default useAuthListener;
