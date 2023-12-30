import { Database } from './types/data';
import generateMockedData from './utils/mocking-data/mocking-data';

const db: Database = generateMockedData();

export default db;
