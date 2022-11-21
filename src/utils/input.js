export const createUser = {
  username: "",
  password: "",
  phone_number: "",
  role_id: "",
};

export const createBank = {
  bank_name: "",
  account_name: "",
  category: "",
  account_number: "",
  balance: "",
  ibanking: "",
  code_access: "",
  pin: "",
  active: false,
};

export const updateBalanceBank = {
  bank_id: "",
  type: "",
  balance: 100000,
};

export const updateBankData = {
  bank_name: "",
  account_name: "",
  account_number: "",
  category: "",
  ibanking: "",
  code_access: "",
  pin: "",
  active: false,
};

export const createTransaction = {
  player_name: "",
  player_id: "",
  bank_player: "",
  account_number: "",
  bank_id: "",
  type_id: "",
  ammount: "",
  admin_fee: "",
};
