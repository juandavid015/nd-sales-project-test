import useForm from '@/app/hooks/useForm';

export default function FieldPrice({ detailIndex }: { detailIndex: number }) {
  const { sale } = useForm();
  const detail = sale?.sale_details[detailIndex];
  return (
    <div className="flex gap-6 pt-4 max-w-[200px] w-fit">
      <label htmlFor="price" className="flex flex-col w-full">
        <span className="font-medium">Price</span>
        <input
          readOnly
          type="number"
          min={0}
          name="price"
          id="price"
          value={detail?.quantity > 0 ? detail.unit_price : 0}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
        />
      </label>
    </div>
  );
}
