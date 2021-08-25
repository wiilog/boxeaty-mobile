import {TableDefinition} from './table-name';

export const TABLES_DEFINITION: Array<TableDefinition> = [
    {
        name: 'depository',
        attributes: {
            id: 'INTEGER PRIMARY KEY',
            name: 'TEXT NOT NULL',
            description: 'TEXT'
        }
    },
    {
        name: 'location',
        attributes: {
            id: 'INTEGER PRIMARY KEY',
            name: 'TEXT NOT NULL',
            type: 'INTEGER'
        }
    },
    {
        name: 'quality',
        attributes: {
            id: 'INTEGER PRIMARY KEY',
            name: 'TEXT NOT NULL',
        }
    },
];
