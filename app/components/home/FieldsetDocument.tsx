'use client';

import FieldBranchOffice from './FieldBranchOffice';
import FieldClient from './FieldClient';
import FieldCurrency from './FieldCurrency';

export default function FieldsetDocument() {
  // const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
  //   const { name, value } = event.target;
  //   return ''
  // };
  return (
    <fieldset>
      <legend className="md:text-3xl text-2xl text-heading-color font-bold
        border-b-2 border-gray pb-4 w-full"
      >
        Documents
      </legend>
      <div className="flex gap-6 w-full">

        <FieldClient />
        <FieldBranchOffice />
        <FieldCurrency />
      </div>
    </fieldset>
  );
}
