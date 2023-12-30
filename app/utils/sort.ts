import { AnyData } from '../types/types';

const sortData = <T extends AnyData>(
  data: T[],
  sortBy: keyof T, // Accept keyof T as the sorting key
  sortOrder: 'desc' | 'asc',
): T[] => {
  const sortedData = [...data].sort((a, b) => {
    let sortVal = 0;
    if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
      sortVal = a[sortBy] - b[sortBy];
    } else if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
      sortVal = a[sortBy].localeCompare(b[sortBy]);
    }
    return sortOrder === 'desc' ? -sortVal : sortVal;
  });

  return sortedData;
};

export default sortData;
