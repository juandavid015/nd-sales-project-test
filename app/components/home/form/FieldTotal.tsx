import useForm from '@/app/hooks/useForm';
import { useEffect } from 'react';

export default function FieldTotal() {
  const { sale, setSale } = useForm();
  const totalCalculated = sale.sale_details.map((detail) => detail.sub_total)
    .reduce((total, subtotal) => total + subtotal, 0);
  const totalInCurrency = new Intl.NumberFormat().format(totalCalculated);

  useEffect(() => {
    setSale((prevSale) => ({ ...prevSale, total_amount: totalCalculated }));
  }, [setSale, totalCalculated]);

  return (
    <div className="flex gap-6 pt-4 min-w-[200px] w-fit
    pb-1 ml-auto"
    >
      <label htmlFor="total" className="flex items-center gap-6 w-full">
        <span className="font-medium">Total</span>
        <input
          readOnly
          type="text"
          min={0}
          name="total"
          id="total"
          value={`${totalInCurrency} ${sale.currency}`}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full text-dark-blue font-medium"
        />
      </label>
    </div>
  );
}
