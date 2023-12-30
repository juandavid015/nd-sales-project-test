'use client';

import { Dispatch, SetStateAction, createContext } from 'react';
import { FormResult, Sale } from '../types/data';

type ContextForm = {
  sale: Sale,
  setSale: Dispatch<SetStateAction<Sale>>
  documentStepCompleted: boolean,
  defaultSaleValues: Sale
  result: FormResult
  setResult: Dispatch<SetStateAction<FormResult>>
  defaultResult: FormResult
};
const defaultResult = {
  type: null,
  message: '',
  data: {},
};
const initalSaleDetailValues = {
  id: '',
  sale_id: '',
  quantity: 0,
  product_id: '',
  unit_price: 0,
  sub_total: 0,
};
const initialSaleValues = {
  id: '',
  date: '',
  seller_id: '',
  client_id: '',
  branch_office_id: '',
  sale_detail_ids: [],
  sale_details: [initalSaleDetailValues],
  total_amount: 0,
  currency: '',
};
const defaultFormContext = {
  sale: initialSaleValues,
  setSale: () => undefined,
  documentStepCompleted: false,
  defaultSaleValues: initialSaleValues,
  defaultResult,
  result: defaultResult,
  setResult: () => undefined,
};
const FormContext = createContext<ContextForm>(defaultFormContext);

export default FormContext;
