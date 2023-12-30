import { fetchSale } from '@/app/services/api';
import useForm from '@/app/hooks/useForm';
import { useRef, useState, useEffect } from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function SubmitButton() {
  const {
    sale, setSale, defaultSaleValues, setResult, defaultResult,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined); // Ref for the timer

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await fetchSale.post(sale);
      setSale(defaultSaleValues);
      const messageResponse = 'Sale generated successfully!';
      setResult({ type: 'success', message: messageResponse, data: {} });
    } catch (error:any) {
      // here should be a handler error function
      setResult({ type: 'error', message: error.message, data: {} });
      throw new Error(error);
    } finally {
      setIsLoading(false);
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current); // Clear the timer when submitting again
      }
      timerRef.current = setTimeout(() => setResult(defaultResult), 5000);
    }
  };

  useEffect(() => () => {
    // Clear the timer on component unmount
    clearTimeout(timerRef.current);
  }, []);

  return (
    <Button
      type="submit"
      label="Save sale"
      className="px-16 py-3 bg-main-color fill-white text-white
      flex items-center justify-center mt-auto w-fit
      transition-all hover:scale-[0.95] font-medium ml-auto"
      onClick={handleSubmit}
    >
      {
        isLoading
          ? <LoadingSpinner className="h-[25px]" />
          : <span>Save</span>
      }
    </Button>
  );
}
