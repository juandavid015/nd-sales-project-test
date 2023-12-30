'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchClients } from '@/app/services/api';
import { Client } from '@/app/types/data';
import useClickOutside from '@/app/hooks/useClickOutside';
import useForm from '@/app/hooks/useForm';
import { RequestResponse } from '@/app/types/types';
import { IconAdd, IconCheck } from '../common/Icons';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

export default function FieldClient() {
  const [clientName, setClientName] = useState('');
  const [clientsResults, setClientResults] = useState<Client[]>([]);
  const [clientSelected, setClientSelected] = useState<Client>();
  const [isLoading, setIsLoading] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const elementRef = useRef(null);
  const { sale, setSale } = useForm();

  // Fetch clients data and handle loading state
  const searchClient = async (name: string) => {
    try {
      setIsLoading(true);
      const clientResults: RequestResponse = await fetchClients.get(name);
      setClientResults(clientResults.data as Client[]);
    } catch (error) {
      // Handle errors
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open menu of the clients search results
  const openMenu = () => {
    if (!clientsResults.length) searchClient('');
    setExpandMenu(true);
  };

  // Close menu of the clients search results
  const closeMenu = () => {
    setExpandMenu(false);
  };

  // Choose a client from the search's results
  const selectClient = (client: Client) => {
    setClientSelected(client);
    setClientName(`${client.name} ${client.surnames}`);
    setSale((prevSale) => ({ ...prevSale, client_id: client.rut_id }));
    closeMenu();
  };

  // Catch the name of be used on the search and handle related states
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== clientSelected?.name) {
      setClientSelected(undefined);
      setSale((prevSale) => ({ ...prevSale, client_id: '' }));
    }
    searchClient(value);
    setClientName(value);
  };

  // Function (custom hook) that close the menu when is clicked outside of
  // the input search
  useClickOutside({ elementRef, onClickOutside: () => closeMenu() });

  useEffect(() => {
    console.log(clientsResults, sale);
  }, [clientsResults, clientName, sale]);

  return (
    <div className="flex gap-6 pt-4 w-full relative">
      <label htmlFor="client" className="flex flex-col w-full" id="client-label">
        <span className="font-medium">Client</span>
        <input
          ref={elementRef}
          type="name"
          name="client"
          id="client"
          value={clientName}
          defaultValue={clientSelected?.name}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
          onChange={handleChange as React.ChangeEventHandler}
          onFocus={openMenu}
          aria-controls="client-options" // Referencing the listbox
          aria-haspopup="listbox" // Indicate that a listbox will open
          aria-expanded={expandMenu} // Indicate the state of expansion
          role="combobox" // for input with auto-complete suggestions
          aria-labelledby="client-label" // Referencing the label
        />
      </label>
      <Button
        type="button"
        label="add new client"
        aria-label="add new client"
        aria-labelledby="client"
        className="h-[40px] w-[40px] bg-main-color fill-white
        flex items-center justify-center mt-auto
        transition-all hover:scale-[0.95]"
      >
        <IconAdd className="h-[20px]" />
      </Button>
      {
      expandMenu
      && (
      <div
        className="absolute top-[calc(100%+8px)] max-h-[300px] w-full
        bg-white shadow-sm p-4 overflow-y-auto"
        id="client-options"
        role="listbox"
        aria-labelledby="client"
      >
        {
          !isLoading && clientsResults.length
            ? (
              <ul>
                {
              clientsResults?.map((client) => (
                <li
                  onClick={() => selectClient(client)}
                  onKeyDown={() => selectClient(client)}
                  role="option"
                  aria-selected={client.rut_id === clientSelected?.rut_id}
                  key={client.rut_id}
                  className={`p-2 hover:bg-blue-sky hover:text-dark-blue
                  cursor-pointer relative font-medium
                  ${client.rut_id === clientSelected?.rut_id && 'bg-blue-sky'}`}
                >
                  {`${client.name || ''} ${client.surnames || ''}`}
                  {
                    clientSelected?.rut_id === client.rut_id
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
