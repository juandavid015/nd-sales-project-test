import { useContext } from 'react';
import FormContext from '../context-store/FormContext';

export default function useForm() {
  return useContext(FormContext);
}
