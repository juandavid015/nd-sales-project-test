// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import {
  Product, BranchOffice, Address, Client, Sale, SaleDetail, Vendor, Provider,
} from '../types/data';

// Define available countries
const availableCountries = [
  'Colombia', 'Argentina', 'Chile', 'Perú', 'Brazil', 'Uruguay',
  'Venezuela', 'Costa rica', 'México', 'Ecuador',
];

// Function to generate country currencies
const generateCountryCode = (country: string) => {
  const parsedCountry = country?.toLowerCase();
  if (parsedCountry === 'colombia') return 'COP';
  if (parsedCountry === 'chile') return 'CLP';
  if (parsedCountry === 'venezuela') return 'VED';
  if (parsedCountry === 'argentina') return 'ARS';
  if (parsedCountry === 'perú') return 'PEN';
  if (parsedCountry === 'brazil') return 'BRL';
  if (parsedCountry === 'uruguay') return 'UYU';
  if (parsedCountry === 'costa rica') return 'CRC';
  if (parsedCountry === 'méxico') return 'MXN';
  if (parsedCountry === 'ecuador') return 'USD';
  return '';
};

// Here the mocked data is stored
const data = {
  products: [] as Product[],
  clients: [] as Client[],
  providers: [] as Provider[],
  vendors: [] as Vendor[],
  branch_offices: [] as BranchOffice[],
  sales: [] as Sale[],
};

// Function to generate a single address...
const generateAddress = () => {
  const randomLatamCountry = faker.helpers.arrayElement(availableCountries);
  const address: Address = {
    country: randomLatamCountry,
    id: faker.database.mongodbObjectId(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    state: faker.location.state(),
    city: faker.location.city(),
  };
  return address;
};

// Function to generate an array of branch offices...
const generateBranchOffices = () => {
  const branchOffices: BranchOffice[] = [];
  const maxAmount = 10;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress();
    const newBranchOffice = {
      id: faker.database.mongodbObjectId(),
      country: newAddress.country || '',
      address_id: newAddress.id,
      address: newAddress,
    };
    branchOffices.push(newBranchOffice);
  }

  return branchOffices;
};

// Function to generate an array of products...
const generateProducts = () => {
  const products: Product[] = [];
  const maxAmount = 100;
  // db?.branch_offices[Math.floor(Math.random() * 10)] || 0
  for (let i = 0; i < maxAmount; i++) {
    const newProduct = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price({ dec: 2 })),
      stock: faker.number.int({ max: 10000 }),
      branch_office_ids: faker.helpers.arrayElements(
        data.branch_offices.map((office: BranchOffice) => office.id),
        { min: 0, max: data.branch_offices?.length || 10 },
      ),
    };
    products.push(newProduct);
  }

  return products;
};

// Function to generate an array of providers...
const generateProviders = () => {
  const providers: Provider[] = [];
  const maxAmount = 10;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress();
    const companyName = faker.company.name();
    const domainName = faker.internet.domainName();

    const newProvider = {
      rut_id: faker.finance.accountNumber(),
      name: companyName,
      address_id: newAddress.id,
      address: newAddress,
      phone: faker.phone.number(),
      website_url: `https://${domainName}.com`,
    };
    providers.push(newProvider);
  }

  return providers;
};

// Function to generate an array of vendors...
const generateVendors = () => {
  const vendors: Vendor[] = [];
  const maxAmount = 10;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const newVendor = {
      rut_id: faker.finance.accountNumber(),
      name: firstName,
      surnames: lastName,
      address_id: newAddress.id,
      address: newAddress,
      phone: faker.phone.number(),
      birth_date: faker.date.birthdate().toLocaleTimeString(),
      email: faker.internet.email({ firstName, lastName }),
    };
    vendors.push(newVendor);
  }
  return vendors;
};

// Function to generate an array of clients...
const generateClients = () => {
  const clients: Client[] = [];
  const maxAmount = 100;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress();
    const newClient = {
      rut_id: faker.finance.accountNumber(),
      name: faker.person.firstName(),
      surnames: faker.person.lastName(),
      address_id: newAddress.id,
      address: newAddress,
      phone: faker.phone.number(),
    };
    clients.push(newClient);
  }

  return clients;
};

// Function to generate an array of sale details...
const generateSaleDetails = (saleId: string, branchOfficeId: string) => {
  const saleDetails: SaleDetail[] = [];
  const maxIterations = faker.helpers.rangeToNumber({ min: 1, max: 10 });
  const availableProducts: Product[] = data.products
    .filter((product: Product) => product.branch_office_ids.includes(branchOfficeId));

  try {
    if (!Array.isArray(availableProducts) || availableProducts.length === 0) {
      throw new Error('No products available');
    }

    for (let i = 0; i < maxIterations; i++) {
      const product: Product = availableProducts[
        faker.helpers.rangeToNumber({ min: 0, max: availableProducts.length })
      ];
      const quantity = faker.helpers.rangeToNumber({ min: 1, max: 5 });
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
  } catch (error: any) {
    throw new Error('Error generating sale details:', error.message);
  }
  return saleDetails;
};

// Function to generate an array of sales...
const generateSales = () => {
  const sales: Sale[] = [];
  const maxAmount = 4;

  for (let i = 0; i < maxAmount; i++) {
    const seller: Vendor = data.vendors[
      faker.helpers.rangeToNumber({ min: 0, max: data.vendors.length })
    ];
    const client: Client = data.clients[
      faker.helpers.rangeToNumber({ min: 0, max: data.clients.length })
    ];
    const branchOffice: BranchOffice = data.branch_offices[
      faker.helpers.rangeToNumber({ min: 0, max: data.branch_offices.length })
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
      currency: generateCountryCode(branchOffice?.country),
    };

    // Generate sale details and update sale object
    saleDetails = generateSaleDetails(newSale?.id, branchOffice?.id);
    const subTotals = saleDetails.map((detail) => detail.sub_total);
    const totalAmount = subTotals.reduce((total, subTotal) => total + subTotal, 0);

    newSale.sale_detail_ids = saleDetails.map((detail) => detail.id);
    newSale.sale_details = saleDetails;
    newSale.total_amount = totalAmount;

    sales.push(newSale);
  }
  return sales;
};

// Function to populate and return mocked data...
const generateMockedData = () => {
  data.branch_offices = generateBranchOffices();
  data.products = generateProducts();
  data.providers = generateProviders();
  data.vendors = generateVendors();
  data.clients = generateClients();
  data.sales = generateSales();

  return data;
};

export default generateMockedData;
