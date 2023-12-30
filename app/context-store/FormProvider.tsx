'use client';

import { useMemo, useState } from 'react';
import FormContext from './FormContext';
import { FormResult, Sale } from '../types/data';

export default function FormProvider({ children }: React.PropsWithChildren) {
  // Default values, allows share and reset states
  const defaultSaleDetailValues = useMemo(() => ({
    id: '',
    sale_id: '',
    quantity: 0,
    product_id: '',
    unit_price: 0,
    sub_total: 0,
  }), []);

  const defaultSaleValues = useMemo(() => ({
    id: '',
    date: '22',
    seller_id: '223',
    client_id: '',
    branch_office_id: '',
    sale_detail_ids: [],
    sale_details: [defaultSaleDetailValues],
    total_amount: 0,
    currency: '',
  }), [defaultSaleDetailValues]);

  const defaultResult: FormResult = useMemo(() => ({
    type: null,
    message: '',
    data: {},
  }), []);

  // state values
  const [sale, setSale] = useState<Sale>(defaultSaleValues);
  const [result, setResult] = useState<FormResult>(defaultResult);

  // step flag => allows to control restriction on different areas or steps of the form
  const documentStepCompleted = sale.client_id.length > 0 && sale.branch_office_id.length > 0;

  const contextValues = useMemo(
    () => (
      {
        sale,
        setSale,
        documentStepCompleted,
        defaultSaleValues,
        defaultSaleDetailValues,
        result,
        setResult,
        defaultResult,
      }),
    [
      sale,
      setSale,
      documentStepCompleted,
      defaultSaleValues,
      defaultSaleDetailValues,
      result,
      defaultResult,
    ],
  );
  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
}
