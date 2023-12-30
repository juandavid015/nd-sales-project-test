import { BranchOffice } from '@/app/types/data';
import { faker } from '@faker-js/faker';
import generateAddress from './mocke-address';

// Function to generate an array of branch offices...
const generateBranchOffices = (countries: string[]) => {
  const branchOffices: BranchOffice[] = [];
  // const maxAmount = 10;
  countries.forEach((country) => {
    const newAddress = generateAddress(countries);
    const newBranchOffice = {
      id: faker.database.mongodbObjectId(),
      country,
      address_id: newAddress.id,
      address: newAddress,
    };
    branchOffices.push(newBranchOffice);
  });

  return branchOffices;
};

export default generateBranchOffices;
