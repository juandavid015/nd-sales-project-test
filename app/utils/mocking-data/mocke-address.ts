import { Address } from '@/app/types/data';
import { faker } from '@faker-js/faker';

// Function to generate a single address...
const generateAddress = (countries: string[]) => {
  const randomLatamCountry = faker.helpers.arrayElement(countries);
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

export default generateAddress;
