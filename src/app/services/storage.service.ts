import {Injectable} from '@angular/core';

import {SQLiteService} from "@app/services/sqlite.service";
import {
    CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
    capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult
} from '@capacitor-community/sqlite';
import {Depository} from "@app/entities/depository";
import {Entity} from "@app/entities/entity";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private static readonly REFERENTIAL = `referential`;
    public static readonly DEPOSITORY = `depository`;

    private static readonly ID = `id`;
    private static readonly NAME = `name`;
    private static readonly DESCRIPTION = `description`;

    private static readonly TABLES = {
        [StorageService.DEPOSITORY]: {
            [StorageService.ID]: `int primary key`,
            [StorageService.NAME]: `text not null`,
            [StorageService.DESCRIPTION]: `text`,
        },
    };

    private initialized: boolean = false;
    private connection: SQLiteDBConnection = null;

    constructor(private sqlite: SQLiteService) {
    }

    public async initialize(): Promise<void> {
        const initialized = await this.sqlite.initializePlugin();
        if (initialized) {
            await this.createConnection(StorageService.REFERENTIAL);
            await this.createDatabase(StorageService.REFERENTIAL, false);

            this.initialized = true;
        } else {
            this.initialized = false;
        }

    }

    private async createConnection(name: string): Promise<void> {
        if(!this.connection) {
            try {
                await this.sqlite.closeConnection(name);
            } catch (ignored) {
            }

            const conn = await this.sqlite.createConnection(name, true, `secret`, 1);
            await conn.open();

            this.connection = conn;
        }
    }

    public async createDatabase(name: string, destroy: boolean = false): Promise<void> {
        await this.createConnection(StorageService.REFERENTIAL);

        for (const [table, columns] of Object.entries(StorageService.TABLES)) {
            if (destroy && (await this.connection.isTable(table)).result) {
                this.connection.execute(`DROP TABLE ${table}`);
            }

            if (destroy || !(await this.connection.isTable(table)).result) {
                const columnsWithType = Object.entries(columns)
                    .map(([name, type]) => `${name} ${type}`)
                    .join(`,`);

                this.connection.execute(`CREATE TABLE ${table}(${columnsWithType})`);
            }
        }
    }

    public async get<T extends Entity>(table: string, search: { [key: string]: any } = []): Promise<Array<T>> {
        await this.createConnection(StorageService.REFERENTIAL);

        let query = `SELECT * FROM ${table}`;
        const values = [];

        if (search && search.length) {
            query += ` WHERE 1=1`;
            for (const [field, value] of Object.entries(search)) {
                query += ` AND ${field} LIKE ?`;
                values.push(value);
            }
        }

        return (await this.connection.query(query, values)).values as Array<T>;
    }

    public async insert<T extends Entity>(table: string, data: T | Array<T>, empty = false): Promise<void> {
        await this.createConnection(StorageService.REFERENTIAL);

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (empty) {
            this.connection.execute(`DELETE FROM ${table}`);
        }

        for (const item of data) {
            const columns = Object.keys(StorageService.TABLES[table]);
            const commaColumns = columns.join(`,`);
            const questionMarks = columns.map(_ => `?`).join(`,`);

            const values = Object.entries(item)
                .filter(([key, _]) => columns.indexOf(key) !== -1)
                .sort(([k1], [k2]) => columns.indexOf(k1) - columns.indexOf(k2))
                .map(([_, value]) => value);

            this.connection.run(`INSERT INTO ${table}(${commaColumns}) VALUES (${questionMarks})`, values)
        }
    }

}
