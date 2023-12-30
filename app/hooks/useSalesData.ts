import { useContext } from 'react';
import SalesDataContext from '../context-store/SalesDataContext';

export default function useSalesData() {
  return useContext(SalesDataContext);
}
