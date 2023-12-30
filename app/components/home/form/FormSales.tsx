'use client';

import FormProvider from '@/app/context-store/FormProvider';
import FieldsetDocument from './FieldsetDocument';
import FieldsetDetails from './FieldsetDetails';
import FieldTotal from './FieldTotal';
import SubmitButton from './Submit';
import Results from './Results';

export default function FormSales() {
  return (
    <FormProvider>
      <form className="flex flex-col gap-6
      border-b-2 border-gray pb-4"
      >
        <FieldsetDocument />
        <FieldsetDetails />
        <FieldTotal />
      </form>
      <SubmitButton />
      <Results />
    </FormProvider>
  );
}
