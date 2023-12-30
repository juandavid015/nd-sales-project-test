import { Product, SaleDetail } from '@/app/types/data';
import { faker } from '@faker-js/faker';

// Function to generate an array of sale details...
const generateSaleDetails = (saleId: string, branchOfficeId: string, products: Product[]) => {
  const saleDetails: SaleDetail[] = [];

  // Choose a number in the given range to generate "n" sale details
  const maxIterations = faker.helpers.rangeToNumber({ min: 1, max: 10 });

  // Those products that match with the branchOffice ID
  const availableProducts: Product[] = products
    .filter((product: Product) => product.branch_office_ids.includes(branchOfficeId));

  if (!products.length) {
    return [];
  }

  for (let i = 0; i < maxIterations; i++) {
    // choose a product between thos which are available (have the same branchId or location)
    const product: Product = availableProducts[
      faker.helpers.rangeToNumber({ min: 0, max: availableProducts.length })
    ];
      // random quantity value of the product
    const quantity = faker.helpers.rangeToNumber({ min: 1, max: 10 });
    if (!product?.id) break;
    else {
      const newSaleDetails = {
        id: faker.database.mongodbObjectId(),
        sale_id: saleId,
        quantity,
        product_id: product.id,
        product,
        unit_price: product.price,
        sub_total: quantity * product.price,
      };
      saleDetails.push(newSaleDetails);
    }
  }
  return saleDetails;
};

export default generateSaleDetails;
