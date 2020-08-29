import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICompany {
  nome: string;
  endereco?: string;
  CNPJ: string;
  cidade?: string;
  uf?: string;
  id?: number;
  telefone?: string;
  email?: string;
}

export const companySlice = createSlice({
  name: "company",
  initialState: <ICompany[]>{},
  reducers: {
    initialPushCompany(state, action: PayloadAction) {
      return state;
    },
    addCompany(state, action: PayloadAction<ICompany>) {
      return state;
    },
    setCompany(state, action: PayloadAction<ICompany[]>) {
      return { ...state, list: action.payload, isLoading: false };
    },
    editCompany(state, action: PayloadAction<ICompany>) {
      return state;
    },
  },
});

export const {
  initialPushCompany,
  addCompany,
  setCompany,
  editCompany,
} = companySlice.actions;
