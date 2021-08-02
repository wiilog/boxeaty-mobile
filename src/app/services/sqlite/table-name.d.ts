export interface TableDefinition {
    name: TableName;
    /** attributeName => constraint */
    attributes: {
        [attributeName: string]: string;
    };
}

export type TableName = 'depository'
    | 'location'
    | 'quality';
