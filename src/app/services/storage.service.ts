import {Injectable} from '@angular/core';

import {SQLiteService} from '@app/services/sqlite/sqlite.service';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {Entity} from '@app/entities/entity';
import {TableName} from '@app/services/sqlite/table-name';
import {tablesDefinitions} from '@app/services/sqlite/table-definitions';

import {Storage} from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private static readonly referential = `referential`;

    private readonly token: Subject<string>;

    constructor(private sqlite: SQLiteService) {
        this.token = new ReplaySubject<string>(1);

        Storage.get({key: 'token'}).then(result => {
            this.token.next(result.value);
        });
    }

    public getToken(): Observable<string> {
        return this.token;
    }

    public setToken(token: string): Observable<void> {
        this.token.next(token);

        return from(Storage.set({
            key: 'token',
            value: token,
        })) as Observable<void>;
    }

    public async initialize(): Promise<void> {
        await this.sqlite.createDatabase(StorageService.referential);
    }

    public async get<T extends Entity>(table: string, search: { [key: string]: any } = {}): Promise<Array<T>> {
        let query = `SELECT *
                     FROM ${table}`;
        const values = [];

        if (search && search.length) {
            query += ` WHERE 1=1`;
            for (const [field, value] of Object.entries(search)) {
                query += ` AND ${field} LIKE ?`;
                values.push(value);
            }
        }

        return (await this.sqlite.executeQuery(query, values).toPromise()) as Array<T>;
    }

    public async insert<T extends Entity>(table: TableName, data: T | Array<T>, empty = false): Promise<void> {
        if (!Array.isArray(data)) {
            data = [data];
        }

        if (empty) {
            await this.sqlite.executeQuery(`DELETE FROM ${table}`).toPromise();
        }

        const tableDefinition = tablesDefinitions.find(({name}) => name === table);
        const columns = Object.keys(tableDefinition.attributes);

        for (const item of data) {
            const commaColumns = columns.join(`,`);
            const questionMarks = columns.map(_ => `?`).join(`,`);

            const values = Object.entries(item)
                .filter(([key, _]) => columns.indexOf(key) !== -1)
                .sort(([k1], [k2]) => columns.indexOf(k1) - columns.indexOf(k2))
                .map(([_, value]) => value);

            await this.sqlite.executeQuery(`INSERT INTO ${table}(${commaColumns})
                                 VALUES (${questionMarks})`, values).toPromise();
        }
    }

}
