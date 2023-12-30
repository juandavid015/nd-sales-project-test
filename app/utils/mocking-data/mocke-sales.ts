import {
  BranchOffice, Client, Product, Sale, SaleDetail, Vendor,
} from '@/app/types/data';
import { faker } from '@faker-js/faker';
import { generateCountryCurrency } from '../country-helpers';
import generateSaleDetails from './mocke-sales-details';

// Function to generate an array of sales...
const generateSales = (
  vendors: Vendor[],
  clients: Client[],
  branchOffices: BranchOffice[],
  products: Product[],
) => {
  const sales: Sale[] = [];
  const maxAmount = 4;

  for (let i = 0; i < maxAmount; i++) {
    const seller: Vendor = vendors[
      faker.helpers.rangeToNumber({ min: 0, max: vendors?.length })
    ];
    const client: Client = clients[
      faker.helpers.rangeToNumber({ min: 0, max: clients?.length })
    ];
    const branchOffice: BranchOffice = branchOffices[
      faker.helpers.rangeToNumber({ min: 0, max: branchOffices?.length })
    ];
    const saleDetailIds: string[] = [];
    let saleDetails: SaleDetail[] = [];

    const newSale = {
      id: faker.database.mongodbObjectId(),
      date: faker.date.anytime().toDateString(),
      seller_id: seller?.rut_id,
      seller,
      client_id: client?.rut_id,
      client,
      branch_office_id: branchOffice?.id,
      branch_office: branchOffice,
      sale_detail_ids: saleDetailIds,
      sale_details: saleDetails,
      total_amount: 0,
      currency: generateCountryCurrency(branchOffice?.country),
    };

    // Generate sale details and update sale object
    saleDetails = generateSaleDetails(newSale?.id, branchOffice?.id, products);
    const subTotals = saleDetails.map((detail) => detail?.sub_total);
    const totalAmount = subTotals.reduce((total, subTotal) => total + subTotal, 0);

    newSale.sale_detail_ids = saleDetails.map((detail) => detail?.id);
    newSale.sale_details = saleDetails;
    newSale.total_amount = totalAmount;

    sales.push(newSale);
  }
  return sales;
};

export default generateSales;
