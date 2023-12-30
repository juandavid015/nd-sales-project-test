import { faker } from '@faker-js/faker';
import { Client } from '@/app/types/data';
import generateAddress from './mocke-address';

// Function to generate an array of clients...
const generateClients = (countries: string[]) => {
  const clients: Client[] = [];
  const maxAmount = 100;

  for (let i = 0; i < maxAmount; i++) {
    const newAddress = generateAddress(countries);
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

export default generateClients;
