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
import { successStatus } from "utils";
import { toastErrorMessage } from "utils";
import { updateBalanceCoin } from "services/api/coin";
import { getAllCoins } from "services/api/coin";
import { getAllTransactions } from "services/api/transaction";
import { getTransactionType } from "services/api/transaction";
import { addNewTransaction } from "services/api/transaction";
import { formatDate } from "utils";
import { getLogData } from "services/api/dashboard";
import { getDashboardData } from "services/api/dashboard";

export const useGlobalStore = create((set, get) => ({
  //   state
  loading: { status: false, message: "" },
  userLoggedIn: {},
  users: [],
  roles: [],
  banks: [],
  coins: [],
  logs: [],
  transactions: [],
  transactionsType: [],
  dashboards: {},
  totalTransactionsData: 0,
  modal: {
    open: false,
    handler: () => {},
    title: "",
    form: null,
    input: {},
    disableFields: [],
    notRenderFields: [],
    optionFields: [],
  },
  date: JSON.parse(localStorage.getItem("date")) || { start: "", end: "" },
  selectedData: {},
  defaulParamsTransaction: {
    limit: 10,
    offset: 0,
  },

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
  setDate: (payload) => {
    localStorage.setItem("date", JSON.stringify(payload));
    set({ date: payload });
  },
  filterDate: async () => {
    let paramsVal = {};
    if (get().date.start) paramsVal["dateFrom"] = get().date.start;
    if (get().date.end) paramsVal["dateTo"] = get().date.end;

    await get().getTransactions(paramsVal);
  },

  setParams: (payload) => set({ defaulParamsTransaction: { ...payload } }),

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
      cb(get().userLoggedIn.role === "ADMIN" ? "/dashboard" : "/transaction");
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getUsers: async () => {
    set({ loading: { status: true, message: "Getting Users Data..." } });
    const res = await getAllUsers();
    if (successStatus.includes(res.statusCode)) {
      if (get().roles.length === 0) await get().getRoles();
      set({ users: res.data.list_user });
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getRoles: async () => {
    set({ loading: { status: true, message: "Getting Roles Data..." } });
    const res = await getAllRoles();
    if (successStatus.includes(res.statusCode)) set({ roles: res.data.list_role });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
  },

  addUser: async (payload) => {
    set({ loading: { status: true, message: "Adding New User..." } });
    const res = await addNewUser(payload);
    if (successStatus.includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("New User added successfully");
      await get().getUsers();
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getBanks: async () => {
    set({ loading: { status: true, message: "Getting Banks Data..." } });
    const res = await getAllBanks();
    if (successStatus.includes(res.statusCode)) set({ banks: res.data.list_bank });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  addBank: async (payload) => {
    set({ loading: { status: true, message: "Adding New Bank..." } });
    const res = await addNewBank({ ...payload, balance: Number(payload.balance) });
    if (successStatus.includes(res.statusCode)) {
      toast.success("New Bank added successfully");
      await get().getBanks();
      set({ modal: { open: false } });
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  updateBank: async (payload) => {
    set({ loading: { status: true, message: "Updating Bank Information..." } });
    const res = await updateBankData(payload, payload.bank_id);
    if (successStatus.includes(res.statusCode)) {
      toast.success("Bank information updated successfully");
      await get().getBanks();
      set({ modal: { open: false } });
    }
    console.log(typeof res.error);
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  updateBalanceBank: async (payload) => {
    set({ loading: { status: true, message: "Updating Balance Account..." } });
    const res = await updateBalanceBank({ ...payload, balance: Number(payload.balance) });
    if (successStatus.includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("Balance Account updated successfully");
      await get().getBanks();
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getCoins: async () => {
    set({ loading: { status: true, message: "Getting Coins Data..." } });
    const res = await getAllCoins();
    if (successStatus.includes(res.statusCode)) set({ coins: res.data.list_coin });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  updateBalanceCoin: async (payload) => {
    set({ loading: { status: true, message: "Updating Balance Coin..." } });
    const res = await updateBalanceCoin({ ...payload, balance: Number(payload.balance) });
    if (successStatus.includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("Balance Coin updated successfully");
      await get().getCoins();
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getTransactions: async (paramsVal) => {
    const params = {
      ...get().defaulParamsTransaction,
      ...paramsVal,
    };
    if (!params["dateTo"] || !params["dateFrom"] || localStorage.getItem("date")) {
      params["dateFrom"] = get().date.start || "2022-11-01";
      params["dateTo"] = get().date.end || formatDate(new Date());
    }
    set({ loading: { status: true, message: "Getting Transactions Data..." } });
    const res = await getAllTransactions(new URLSearchParams(params).toString());
    if (successStatus.includes(res.statusCode)) {
      if (get().transactionsType.length === 0) await get().getTransactionType();
      if (get().banks.length === 0) await get().getBanks();
      set({ transactions: res.data.transaction, totalTransactionsData: res.data.total });
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getTransactionType: async () => {
    set({ loading: { status: true, message: "Getting Transactions Type..." } });
    const res = await getTransactionType();
    if (successStatus.includes(res.statusCode)) set({ transactionsType: res.data.list_type });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  addTransaction: async (payload) => {
    set({ loading: { status: true, message: "Adding New Transaction..." } });
    const res = await addNewTransaction({
      ...payload,
      ammount: Number(payload.ammount),
      admin_fee: Number(payload.admin_fee),
    });
    if (successStatus.includes(res.statusCode)) {
      set({ modal: { open: false } });
      toast.success("Transaction added successfully");
      await get().getTransactions();
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getLogs: async (paramsVal) => {
    const params = {
      ...get().defaulParamsTransaction,
      ...paramsVal,
    };
    set({ loading: { status: true, message: "Getting Log Data..." } });
    const res = await getLogData(new URLSearchParams(params).toString());

    if (successStatus.includes(res.statusCode)) set({ logs: res.data.log });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },

  getDashboard: async () => {
    const params = {};
    if (get().date.start) params["dateFrom"] = get().date.start;
    if (get().date.end) params["dateTo"] = get().date.end;
    set({ loading: { status: true, message: "Getting Data Dashboard..." } });
    const res = await getDashboardData(new URLSearchParams(params).toString());
    if (successStatus.includes(res.statusCode)) set({ dashboards: res.data.dashboard });
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },
}));
