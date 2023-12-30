// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Product, BranchOffice, Client, Sale, Vendor, Provider,
} from '../../types/data';
import { availableCountries } from '../country-helpers';
import generateBranchOffices from './mocke-branch-offices';
import generateProducts from './mocke-products';
import generateProviders from './mocke-providers';
import generateVendors from './mocke-vendors';
import generateClients from './mocke-clients';
import generateSales from './mocke-sales';

// Here the mocked data is stored
const data = {
  products: [] as Product[],
  clients: [] as Client[],
  providers: [] as Provider[],
  vendors: [] as Vendor[],
  branch_offices: [] as BranchOffice[],
  sales: [] as Sale[],
};

// Function to populate and return mocked data...
const generateMockedData = () => {
  data.branch_offices = generateBranchOffices(availableCountries);
  data.products = generateProducts(data.branch_offices);
  data.providers = generateProviders(availableCountries);
  data.vendors = generateVendors(availableCountries);
  data.clients = generateClients(availableCountries);
  data.sales = generateSales(
    data.vendors,
    data.clients,
    data.branch_offices,
    data.products,
  );

  return data;
};

export default generateMockedData;
