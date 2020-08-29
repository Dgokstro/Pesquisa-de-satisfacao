import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum UserTypeEnum {
  "Não logado",
  "Administrador",
  "Responsável",
  "Colaborador",
}

export enum UserStatusEnum {
  "Bloqueado",
  "Inativo",
  "Ativo",
}

export interface ILoggedIn {
  tag: "loggedIn";
  type: UserTypeEnum;
  name: string;
  status: UserStatusEnum;
  id: number;
  departamento: number;
}
export interface ILoggedOut {
  tag: "loggedOut";
}
type ILogin = ILoggedIn | ILoggedOut;

export interface IRequestLogin {
  email: string;
  senha: string;
}

export const loginSlice = createSlice({
  name: "login",
  initialState: <ILogin>{
    tag: "loggedOut",
  },
  reducers: {
    setActiveUser(state, action: PayloadAction<ILogin>) {
      return { ...state, ...action.payload };
    },
    login(state, _action: PayloadAction<IRequestLogin>) {
      return state;
    },
    logoff(state, _action: PayloadAction) {
      return { tag: "loggedOut" };
    },
  },
});

export const { setActiveUser, login } = loginSlice.actions;
