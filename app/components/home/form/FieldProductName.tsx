'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@/app/types/data';
import useClickOutside from '@/app/hooks/useClickOutside';
import useForm from '@/app/hooks/useForm';
import { RequestResponse } from '@/app/types/types';
import { fetchProducts } from '@/app/services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import { IconCheck } from '../../common/Icons';

export default function FieldProductName({ detailIndex }: { detailIndex: number }) {
  const [productName, setProductName] = useState('');
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const elementRef = useRef(null);
  const { sale, setSale, documentStepCompleted } = useForm();

  // Fetch clients data and handle loading state
  const searchProduct = async (name: string) => {
    try {
      setIsLoading(true);
      const product: RequestResponse = await fetchProducts.get(name, sale.branch_office_id);
      setProductResults(product.data as Product[]);
    } catch (error: any) {
      // Handle errors
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open menu of the products search results
  const openMenu = () => {
    searchProduct('');
    setExpandMenu(true);
  };

  // Close menu of the products search results
  const closeMenu = () => {
    setExpandMenu(false);
  };

  // Choose a product from the search's results
  const selectproduct = (product: Product) => {
    setProductSelected(product);
    setProductName(`${product.name}`);
    setSale((prevSale) => {
      const newSaleDetails = [...prevSale.sale_details];
      const newSaleDetail = newSaleDetails[detailIndex];
      newSaleDetail.product_id = product.id;
      newSaleDetail.unit_price = product.price;
      // console.log(newSaleDetail);
      return {
        ...prevSale,
        sale_details: newSaleDetails,
      };
    });
    closeMenu();
  };

  // Catch the name of be used on the search and handle related states
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== productSelected?.name) {
      setProductSelected(undefined);
      setSale((prevSale) => ({ ...prevSale, product_id: '', unit_price: 0 }));
    }
    searchProduct(value);
    setProductName(value);
  };

  // Function (custom hook) that close the menu when is clicked outside of
  // the input search
  useClickOutside({ elementRef, onClickOutside: () => closeMenu() });

  useEffect(() => {
    // This logic has to move higher, because implicty involves the rest of fields (remind to move)
    // so this logis makes sense to be treated on the parent that groups the related inputs
    if (!productSelected?.branch_office_ids.includes(sale.branch_office_id)) {
      // console.log(productSelected?.branch_office_ids, 'A');
      setProductSelected(undefined);
      setProductName('');
      // setSale((prevSale) => {
      //   const newDetail = { ...prevSale.sale_details[detailIndex] };
      //   newDetail.quantity = 0;
      //   newDetail.unit_price = 0;
      //   newDetail.sub_total = 0;

      //   return {
      //     ...prevSale,
      //     sale_details: [
      //       ...prevSale.sale_details,
      //       newDetail,
      //     ],
      //   };
      // });
    }
  }, [productSelected?.branch_office_ids, sale.branch_office_id, detailIndex]);

  return (
    <div className="flex gap-6 pt-4 w-full relative">
      <label htmlFor="name" className="flex flex-col w-full" id="product-label">
        <span className="font-medium">Name</span>
        <input
          ref={elementRef}
          type="text"
          name="name"
          id="name"
          value={productName}
          defaultValue={productSelected?.name}
          className="h-[40px] bg-white focus:outline-none px-4
          w-full"
          onChange={handleChange as React.ChangeEventHandler}
          onFocus={openMenu}
          aria-controls="product-options" // Referencing the listbox
          aria-haspopup="listbox" // Indicate that a listbox will open
          aria-expanded={expandMenu} // Indicate the state of expansion
          role="combobox" // for input with auto-complete suggestions
          aria-labelledby="product-label" // Referencing the label
          disabled={!documentStepCompleted}
        />
      </label>
      {
      expandMenu
      && (
      <div
        className="absolute top-[calc(100%+8px)] max-h-[300px] w-full
        bg-white shadow-sm p-4 overflow-y-auto z-[50]"
        id="product-options"
        role="listbox"
        aria-labelledby="name"
      >
        {
          !isLoading && productResults.length
            ? (
              <ul>
                {
              productResults?.map((product) => (
                <li
                  onClick={() => selectproduct(product)}
                  onKeyDown={() => selectproduct(product)}
                  role="option"
                  aria-selected={product.id === productSelected?.id}
                  key={product.id}
                  className={`p-2 hover:bg-blue-sky hover:text-dark-blue
                  cursor-pointer relative font-medium z-[10000]
                  ${product.id === productSelected?.id && 'bg-blue-sky'}`}
                >
                  {`${product.name || ''}`}
                  {
                    productSelected?.id === product.id
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
