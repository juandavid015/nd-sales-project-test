import { faker } from '@faker-js/faker';
import db from '../db';
import {
  BranchOffice, Client, Product, Sale,
} from '../types/data';
import { RequestResponse } from '../types/types';
import paginate from '../utils/pagination';
import sortData from '../utils/sort';
// export const vendors = {
//   get(params: string) {
//     db.vendors
//   },
// };
export const fetchSale = {
  getById: async (
    id: string,
  ) => new Promise<Sale | undefined>((resolve, reject) => {
    try {
      const saleData = [...db.sales];
      const saleExists = saleData.find((sale) => sale.id === id);
      let response: Sale | undefined;
      if (saleExists) {
        response = saleExists;
        setTimeout(() => {
          resolve(response);
          return response;
        }, 400);
      } else {
        setTimeout(() => {
          reject(new Error('Error fetching sales'));
        }, 400);
      }
      // Filters here

      // Simulate a delay of 500ms to mimic an async operation
    } catch (error: any) {
      reject(new Error('Error fetching sales'));
    }
  }),
  get: async (
    limit = 10,
    page = 1,
    sortBy?: keyof Sale,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) => new Promise<RequestResponse>((resolve, reject) => {
    try {
      let saleData = [...db.sales];

      if (sortBy && sortOrder) {
        saleData = sortData(saleData, sortBy, sortOrder);
      }

      // Filters here

      // Simulate a delay of 500ms to mimic an async operation
      setTimeout(() => {
        // Paginate using utility function
        const paginatedResult = paginate(saleData, page, limit);

        resolve(paginatedResult);
        return paginatedResult;
      }, 400);
    } catch (error: any) {
      reject(new Error('Error fetching sales'));
    }
  }),
  post: async (sale: Sale) => new Promise<Sale | null>((resolve, reject) => {
    const hasRequiredProp = (property: string | string[]) => property?.length > 0;
    try {
      // Simulate how db will process data. Id's are necessary for relations
      const saleId = faker.database.mongodbObjectId();
      const hasBranch = hasRequiredProp(sale.branch_office_id);
      const hasVendor = hasRequiredProp(sale.seller_id);
      const hasClient = hasRequiredProp(sale.client_id);
      const hasDate = hasRequiredProp(sale.date);
      const everyDetailsAreValid = sale?.sale_details?.every((detail) => {
        const hasProduct = hasRequiredProp(detail.product_id);
        const saleDetailIsValid = hasProduct;
        if (saleDetailIsValid) return true;
        return false;
      });

      const saleIsValid = hasBranch && hasVendor && hasClient && hasDate;
      let response: Sale | null;

      if (saleIsValid && everyDetailsAreValid) {
        const newSale = { ...sale } as Sale;
        newSale.id = saleId;

        const newDetails = sale?.sale_details.map((detail) => {
          const newDetail = { ...detail };
          const detailId = faker.database.mongodbObjectId();
          newDetail.id = detailId;
          newDetail.sale_id = saleId;
          newSale.sale_detail_ids = [...newSale.sale_detail_ids, detailId];
          return newDetail;
        });
        newSale.sale_details = newDetails;
        db.sales = [...db.sales, newSale];
        response = newSale;
        // console.log('succed');
        setTimeout(() => {
          resolve(response);
          return response;
        }, 300);
      } else {
        // console.log('fail');
        response = null;
        setTimeout(() => reject(new Error('Error while generating the "Sale", verify your inputs.')), 300);
      }
    } catch (error) {
      reject(new Error('Error while generating the "Sale", verify your inputs.'));
    }
  }),
};
export const fetchProducts = {
  // get branch offices mimic asynchronous operation
  // replace later with real request handler
  get: async (
    name: string,
    branchOfficeId: string,
    limit = 10,
    page = 1,
    sortBy?: keyof Product,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) => new Promise<RequestResponse>((resolve, reject) => {
    try {
      let productsData = [...db.products];
      // Sorting
      if (!branchOfficeId) productsData = [];
      if (sortBy && sortOrder) {
        productsData = sortData(productsData, sortBy, sortOrder);
      }
      // Filter by country if provided
      // console.log(name, branchOfficeId);
      productsData = productsData
        .filter((product) => (product.branch_office_ids.includes(branchOfficeId)));

      if (name) {
        productsData = productsData.filter((product) => (
          // console.log('product', name);
          product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .includes(name.toLocaleLowerCase())));
      }

      // Simulate a delay of 200ms to mimic an async operation
      setTimeout(() => {
        if (!branchOfficeId) productsData = [];
        // Paginate using utility function
        // console.log(productsData, 'DATA');
        const paginatedResult = paginate(productsData, page, limit);

        resolve(paginatedResult);
        return paginatedResult;
      }, 200);
    } catch (error: any) {
      reject(new Error('Error fetching products'));
    }
  })
  ,
};
export const fetchClients = {
  // get branch offices mimic asynchronous operation
  // replace later with real request handler
  get: async (
    name = '',
    limit = 10,
    page = 1,
    sortBy?: keyof Client,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) => new Promise<RequestResponse>((resolve, reject) => {
    try {
      let clientsData = [...db.clients];

      if (sortBy && sortOrder) {
        clientsData = sortData(clientsData, sortBy, sortOrder);
      }

      // Filter by country if provided
      if (name) {
        clientsData = clientsData.filter(
          // lower case and removing accents
          (client) => {
            const fullname = `${client.name}${client.surnames}`;
            return fullname.toLowerCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(name.toLocaleLowerCase().replaceAll(' ', ''));
          },
        );
      }
      // Simulate a delay of 500ms to mimic an async operation
      setTimeout(() => {
        // Paginate using utility function
        const paginatedResult = paginate(clientsData, page, limit);

        resolve(paginatedResult);
        return paginatedResult;
      }, 400);
    } catch (error: any) {
      reject(new Error('Error fetching clients'));
    }
  })
  ,
};

export const fetchBranchOffices = {
  // get branch offices mimic asynchronous operation
  // replace later with real request handler
  get: async (
    limit = 10,
    country = '',
    page = 1,
    sortBy?: keyof BranchOffice,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) => new Promise<RequestResponse>((resolve, reject) => {
    try {
      let branchOfficesData = [...db.branch_offices];

      if (sortBy && sortOrder) {
        branchOfficesData = sortData(branchOfficesData, sortBy, sortOrder);
      }

      // Filter by country if provided
      if (country) {
        branchOfficesData = branchOfficesData.filter(
          // lower case and removing accents
          (office) => office.country.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(country.toLocaleLowerCase()),
        );
      }
      // Simulate a delay of 500ms to mimic an async operation
      setTimeout(() => {
        // Paginate using utility function
        const paginatedResult = paginate(branchOfficesData, page, limit);

        resolve(paginatedResult);
        return paginatedResult;
      }, 400);
    } catch (error: any) {
      reject(new Error('Error fetching branch offices'));
    }
  }),

  // Get the branch office by an "ID"
  getById: async (id: string) => new Promise<BranchOffice | null>((resolve, reject) => {
    try {
      const branchOfficesData = [...db.branch_offices];
      let branchOfficeFounded;

      setTimeout(() => {
        branchOfficeFounded = branchOfficesData.find((branchOffice) => {
          if (branchOffice.id === id) return branchOffice;
          return false;
        });

        if (branchOfficeFounded) {
          resolve(branchOfficeFounded);
          return branchOfficeFounded;
        }
        resolve(null);
        return null;
      }, 200);
    } catch (error: any) {
      reject(new Error('Error fetching branch offices'));
    }
  }),
};
