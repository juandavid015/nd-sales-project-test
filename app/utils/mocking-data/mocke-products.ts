import { BranchOffice, Product } from '@/app/types/data';
import { faker } from '@faker-js/faker';

// Function to generate an array of products...
const generateProducts = (branches: BranchOffice[]) => {
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
        branches.map((office: BranchOffice) => office.id),
        { min: 1, max: 5 },
        // Generate randoms id's to be attached
        // (given a range of posibilities (array with possible values))
      ),
    };
    products.push(newProduct);
  }
  return products;
};

export default generateProducts;
