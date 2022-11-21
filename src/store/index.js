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
import { formatDate } from "utils";
import { getTransactionType } from "services/api/transaction";
import { addNewTransaction } from "services/api/transaction";

export const useGlobalStore = create((set, get) => ({
  //   state
  loading: { status: false, message: "" },
  userLoggedIn: {},
  users: [],
  roles: [],
  banks: [],
  coins: [],
  transactions: [],
  transactionsType: [],
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
  selectedData: {},
  defaulParamsTransaction: {
    limit: 10,
    offset: 0,
    dateFrom: formatDate(new Date()),
    dateTo: formatDate(new Date()),
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

  getTransactions: async () => {
    const params = new URLSearchParams(get().defaulParamsTransaction).toString();
    set({ loading: { status: true, message: "Getting Transactions Data..." } });
    const res = await getAllTransactions(params);
    if (successStatus.includes(res.statusCode)) {
      if (get().transactionsType.length === 0) await get().getTransactionType();
      if (get().banks.length === 0) await get().getBanks();
      set({ transactions: res.data.transaction });
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
      toast.success("Balance Coin updated successfully");
      await get().getTransactions();
    }
    if (!successStatus.includes(res.statusCode)) toast.error(toastErrorMessage(res));
    set({ loading: { status: false, message: "" } });
  },
}));
