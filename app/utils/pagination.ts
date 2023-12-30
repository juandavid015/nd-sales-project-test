import { AnyData } from '../types/types';

// Pagination utility function
const paginate = (data: AnyData[], page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: data.length,
    totalPages: Math.ceil(data.length / limit),
  };
};

export default paginate;
