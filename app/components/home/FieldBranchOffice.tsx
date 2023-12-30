'use branchOffice';

import { useEffect, useRef, useState } from 'react';
import { BranchOffice } from '@/app/types/data';
import useClickOutside from '@/app/hooks/useClickOutside';
import useForm from '@/app/hooks/useForm';
import { RequestResponse } from '@/app/types/types';
import { fetchBranchOffices } from '@/app/services/api';
import { generateCountryCurrency } from '@/app/utils/country-helpers';
import { IconAdd, IconCheck } from '../common/Icons';
import LoadingSpinner from '../common/LoadingSpinner';

export default function FieldBranchOffice() {
  const [branchOfficeName, setBranchOfficeName] = useState('');
  const [branchOfficeResults, setbranchOfficeResults] = useState<BranchOffice[]>([]);
  const [branchOfficeSelected, setbranchOfficeSelected] = useState<BranchOffice>();
  const [isLoading, setIsLoading] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const elementRef = useRef(null);
  const { sale, setSale } = useForm();

  // Fetch clients data and handle loading state
  const searchBranchOffice = async (name: string) => {
    try {
      setIsLoading(true);
      const branchOffice: RequestResponse = await fetchBranchOffices.get(undefined, name);
      setbranchOfficeResults(branchOffice.data as BranchOffice[]);
    } catch (error) {
      // Handle errors
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open menu of the branchOffices search results
  const openMenu = () => {
    if (!branchOfficeResults.length) searchBranchOffice('');
    setExpandMenu(true);
  };

  // Close menu of the branchOffices search results
  const closeMenu = () => {
    setExpandMenu(false);
  };

  // Choose a branchOffice from the search's results
  const selectBranchOffice = (branchOffice: BranchOffice) => {
    setbranchOfficeSelected(branchOffice);
    setBranchOfficeName(`${branchOffice.country}`);
    const currency = generateCountryCurrency(branchOffice.country);
    setSale((prevSale) => ({ ...prevSale, branch_office_id: branchOffice.id, currency }));
    closeMenu();
  };

  // Catch the name of be used on the search and handle related states
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== branchOfficeSelected?.country) {
      setbranchOfficeSelected(undefined);
      setSale((prevSale) => ({ ...prevSale, branch_office_id: '', currency: '' }));
    }
    searchBranchOffice(value);
    setBranchOfficeName(value);
  };

  // Function (custom hook) that close the menu when is clicked outside of
  // the input search
  useClickOutside({ elementRef, onClickOutside: () => closeMenu() });

  useEffect(() => {
    console.log(branchOfficeResults, sale);
  }, [branchOfficeResults, branchOfficeName, sale]);

  return (
    <div className="flex gap-6 pt-4 w-full relative">
      <label htmlFor="branchOffice" className="flex flex-col w-full" id="branchOffice-label">
        <span className="font-medium">Branch office</span>
        <input
          ref={elementRef}
          type="name"
          name="branchOffice"
          id="branchOffice"
          value={branchOfficeName}
          defaultValue={branchOfficeSelected?.country}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
          onChange={handleChange as React.ChangeEventHandler}
          onFocus={openMenu}
          aria-controls="branchOffice-options" // Referencing the listbox
          aria-haspopup="listbox" // Indicate that a listbox will open
          aria-expanded={expandMenu} // Indicate the state of expansion
          role="combobox" // for input with auto-complete suggestions
          aria-labelledby="branchOffice-label" // Referencing the label
        />
      </label>
      <button
        type="button"
        title="add new branchOffice"
        aria-label="add new branchOffice"
        aria-labelledby="branchOffice"
        className="h-[40px] w-[40px] bg-main-color fill-white
        flex items-center justify-center mt-auto
        transition-all hover:scale-[0.95]"
      >
        <IconAdd className="h-[20px]" />
      </button>
      {
      expandMenu
      && (
      <div
        className="absolute top-[calc(100%+8px)] max-h-[300px] w-full
        bg-white shadow-sm p-4 overflow-y-auto"
        id="branchOffice-options"
        role="listbox"
        aria-labelledby="branchOffice"
      >
        {
          !isLoading && branchOfficeResults.length
            ? (
              <ul>
                {
              branchOfficeResults?.map((branchOffice) => (
                <li
                  onClick={() => selectBranchOffice(branchOffice)}
                  onKeyDown={() => selectBranchOffice(branchOffice)}
                  role="option"
                  aria-selected={branchOffice.id === branchOfficeSelected?.id}
                  key={branchOffice.id}
                  className={`p-2 hover:bg-blue-sky hover:text-dark-blue
                  cursor-pointer relative font-medium
                  ${branchOffice.id === branchOfficeSelected?.id && 'bg-blue-sky'}`}
                >
                  {`${branchOffice.country || ''}`}
                  {
                    branchOfficeSelected?.id === branchOffice.id
                    && <IconCheck className="h-[15px] absolute right-[1rem] top-[33%]" />
                  }
                </li>
              ))
            }
              </ul>
            )
            : isLoading ? (
              <LoadingSpinner
                className="h-[30px] fill-main-color mx-auto"
              />
            )
              : <p> No results.</p>
        }
      </div>
      )
      }
    </div>
  );
}
