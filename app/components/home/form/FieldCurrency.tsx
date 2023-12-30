'use client';

import useForm from '@/app/hooks/useForm';

export default function FieldCurrency() {
  const { sale } = useForm();

  return (
    <div className="flex gap-6 pt-4 w-full max-w-[200px]">
      <label htmlFor="currency" className="flex flex-col w-full">
        <span className="font-medium">Currency</span>
        <input
          readOnly
          type="text"
          name="currency"
          id="currency"
          value={sale.currency}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
        />
      </label>
    </div>
  );
}
