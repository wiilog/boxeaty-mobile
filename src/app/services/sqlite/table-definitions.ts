import {TableDefinition} from './table-name';

export const tablesDefinitions: Array<TableDefinition> = [
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
