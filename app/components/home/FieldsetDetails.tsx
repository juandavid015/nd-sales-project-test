import useForm from '@/app/hooks/useForm';
import FieldProductName from './FieldProductName';
import FieldQuantity from './FieldQuantity';
import FieldSubtotal from './FieldSubtotal';
import FieldPrice from './FieldPrice';
import Button from '../common/Button';

export default function FieldsetDetails() {
  const { sale, setSale } = useForm();
  const initalSaleDetailValues = {
    id: '',
    sale_id: '',
    quantity: 0,
    product_id: '',
    unit_price: 0,
    sub_total: 0,
  };
  // const [details, setDetails] = useState<SaleDetail[]>([initalSaleDetailValues]);
  const details = sale?.sale_details;
  const addNewDetail = () => {
    setSale((prevSale) => (
      { ...prevSale, sale_details: [...prevSale.sale_details, initalSaleDetailValues] }
    ));
  };
  const deleteDetail = (detailIndex: number) => {
    setSale((prevSale) => {
      if (prevSale.sale_details.length > 1) {
        const updatedSaleDetails = prevSale.sale_details
          .filter((_, index) => index !== detailIndex);
        return { ...prevSale, sale_details: updatedSaleDetails };
      }
      return prevSale;
    });
  };
  return (
    <fieldset className="flex flex-col gap-16">
      <legend className="md:text-3xl text-2xl text-heading-color font-bold
        border-b-2 border-gray pb-4 w-full"
      >
        Details
      </legend>
      <div>
        {
          details.map((__, detailIndex) => (

            <div className="flex gap-8 w-full">

              <FieldProductName detailIndex={detailIndex} />
              <FieldQuantity detailIndex={detailIndex} />
              <FieldPrice detailIndex={detailIndex} />
              <FieldSubtotal detailIndex={detailIndex} />
              <Button
                onClick={() => deleteDetail(detailIndex)}
                type="button"
                label="Eliminate detail"
              >
                X
              </Button>
            </div>
          ))
        }
      </div>
      <Button
        onClick={addNewDetail}
        type="button"
        label="add new detail"
      >
        Add
      </Button>
    </fieldset>
  );
}
