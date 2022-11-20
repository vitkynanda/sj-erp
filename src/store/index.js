import Cookies from "js-cookie";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { login } from "services/api/auth";
import create from "zustand";
import { convertBase64 } from "utils";
import { getAllUsers } from "services/api/users";
import { addNewUser } from "services/api/users";
import { getAllRoles } from "services/api/users";
import { getAllBanks } from "services/api/bank";
import { addNewBank } from "services/api/bank";
import { updateBankData } from "services/api/bank";
import { updateBalanceBank } from "services/api/bank";

export const useGlobalStore = create((set, get) => ({
  //   state
  loading: { status: false, message: "" },
  userLoggedIn: {},
  users: [],
  roles: [],
  banks: [],
  modal: {
    open: false,
    handler: () => {},
    title: "",
    form: null,
    input: {},
    disableFields: [],
    notRenderFields: [],
  },
  selectedData: {},

  // synchronus reducers
  setUserLoggedIn: (payload) => set({ userLoggedIn: payload }),
  setUsers: (payload) => set({ users: payload }),
  setRoles: (payload) => set({ roles: payload }),
  setSelectedData: (payload) => set({ selectedData: payload }),
  setOpenModal: (payload) =>
    set({
      modal: {
        ...payload,
      },
    }),
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

  getBanks: async () => {
    set({ loading: { status: true, message: "Getting Banks Data..." } });
    const res = await getAllBanks();
    console.log(res);
    if ([200, 201].includes(res.statusCode)) set({ banks: res.data.list_bank });

    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },

  addBank: async (payload) => {
    set({ loading: { status: true, message: "Adding New Bank..." } });
    const res = await addNewBank(payload);
    if ([200, 201].includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("New Bank added successfully");
      await get().getBanks();
    }
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },

  updateBank: async (payload) => {
    set({ loading: { status: true, message: "Updating Bank Information..." } });
    const res = await updateBankData(payload, payload.bank_id);
    if ([200, 201].includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("Bank information updated successfully");
      await get().getBanks();
    }
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },

  updateBalance: async (payload) => {
    set({ loading: { status: true, message: "Updating Balance Account..." } });
    const res = await updateBalanceBank({ ...payload, balance: Number(payload.balance) });
    if ([200, 201].includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("Balance Account updated successfully");
      await get().getBanks();
    }
    if (![200, 201].includes(res.statusCode))
      toast.error(res.error || res.message || "Something went wrong");
    set({ loading: { status: false, message: "" } });
  },
}));
