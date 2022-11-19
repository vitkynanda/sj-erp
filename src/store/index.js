import Cookies from "js-cookie";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { login } from "services/api/auth";
import create from "zustand";
import { convertBase64 } from "utils";
import { getAllUsers } from "services/api/users";
import { addNewUser } from "services/api/users";
import { getAllRoles } from "services/api/users";

export const useGlobalStore = create((set, get) => ({
  //   state
  loading: { status: false, message: "" },
  userLoggedIn: {},
  users: [],
  roles: [],
  modal: { open: false },

  // synchronus reducers
  setUserLoggedIn: (payload) => set({ userLoggedIn: payload }),
  setUsers: (payload) => set({ users: payload }),
  setRoles: (payload) => set({ roles: payload }),
  setOpenModal: (payload) => set({ modal: { open: payload } }),

  logoutHandler: (cb) => {
    set({ userLoggedIn: {} });
    Cookies.remove("token");
    cb();
  },

  // asynchronus reducers
  loginHandler: async (payload, cb) => {
    set({ loading: { status: true, message: "Login Process..." } });
    const res = await login(payload);
    if (res.statusCode === 200) {
      toast.success("Login successfully");
      Cookies.set("token", convertBase64("encode", res.data.token));
      set({ userLoggedIn: jwt_decode(res.data.token) });
      cb();
    }
    if (res.statusCode !== 200) toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },

  getUsers: async () => {
    set({ loading: { status: true, message: "Getting Users Data..." } });
    const res = await getAllUsers();
    if ([200, 201].includes(res.statusCode)) {
      if (get().roles.length === 0) await get().getRoles();
      set({ users: res.data.list_user });
    }
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },

  getRoles: async () => {
    set({ loading: { status: true, message: "Getting Roles Data..." } });
    const res = await getAllRoles();
    if ([200, 201].includes(res.statusCode)) set({ roles: res.data.list_role });
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
  },

  addUser: async (payload) => {
    set({ loading: { status: true, message: "Adding New User..." } });
    const res = await addNewUser(payload);
    if ([200, 201].includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("New User added successfully");
      await get().getUsers();
    }
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },
}));
