import useForm from '@/app/hooks/useForm';

export default function FieldQuantity({ detailIndex }: { detailIndex: number }) {
  const { sale, setSale, documentStepCompleted } = useForm();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    setSale((prevSale) => {
      const newSaleDetails = [...prevSale.sale_details];
      const newSaleDetail = newSaleDetails[detailIndex];
      newSaleDetail.quantity = newValue;
      newSaleDetail.sub_total = newSaleDetail.unit_price * newValue;

      return {
        ...prevSale,
        sale_details: newSaleDetails,
      };
    });
  };
  const saleDetail = sale.sale_details[detailIndex];
  return (
    <div className="flex gap-6 pt-4 max-w-[200px] w-fit">
      <label htmlFor="quantity" className="flex flex-col w-full">
        <span className="font-medium">Quantity</span>
        <input
          onChange={handleChange}
          type="number"
          min={1}
          name="branch_office"
          id="quantity"
          value={saleDetail?.quantity}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
          disabled={!documentStepCompleted}
        />
      </label>
    </div>
  );
}
