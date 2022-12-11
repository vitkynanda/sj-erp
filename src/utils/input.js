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
  type_id: "",
  status: "",
  player_id: "",
  bank_player_id: "",
  bank_id: "",
  ammount: "",
  admin_fee: "",
};

export const createPlayer = {
  player_id: "",
  player_name: "",
  bank_name: "",
  account_number: "",
  category: "",
};

export const addBankPlayer = {
  // player_id: "",
  bank_name: "",
  account_number: "",
  category: "",
};
