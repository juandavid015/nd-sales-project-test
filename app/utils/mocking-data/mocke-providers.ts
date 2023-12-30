import { Provider } from '@/app/types/data';
import { faker } from '@faker-js/faker';
import generateAddress from './mocke-address';

// Function to generate an array of providers...
const generateProviders = (countries:string[]) => {
  const providers: Provider[] = [];
  const maxAmount = 10;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress(countries);
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

export default generateProviders;
