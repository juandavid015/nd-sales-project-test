import useForm from '@/app/hooks/useForm';

export default function FieldSubtotal({ detailIndex }: { detailIndex: number }) {
  const { sale } = useForm();
  const subtotal = sale.sale_details[detailIndex]?.sub_total;
  // console.log(
  //   new Intl.NumberFormat().format(subtotal),
  // );
  return (
    <div className="flex gap-6 pt-4 max-w-[200px] w-fit">
      <label htmlFor="subtotal" className="flex flex-col w-full">
        <span className="font-medium">Subtotal</span>
        <input
          readOnly
          type="number"
          min={0}
          name="subtotal"
          id="subtotal"
          value={subtotal}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
        />
      </label>
    </div>
  );
}
