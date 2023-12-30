'use client';

import React from 'react';
import DataContext from './SalesDataContext';
// import { fetchBranchOffices } from '../services/api';

export default function SalesDataProvider({ children }: React.PropsWithChildren) {
  // const dbs = fetchBranchOffices.get(10, 'co', undefined, 'country', 'desc');
  // console.log(dbs);
  return (
    <DataContext.Provider value="empty">
      {children}
    </DataContext.Provider>
  );
}
