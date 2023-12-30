import { faker } from '@faker-js/faker';
import { Vendor } from '@/app/types/data';
import generateAddress from './mocke-address';

// Function to generate an array of vendors...
const generateVendors = (countries: string[]) => {
  const vendors: Vendor[] = [];
  const maxAmount = 10;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress(countries);
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

export default generateVendors;
