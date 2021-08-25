import {Injectable} from '@angular/core';

import {SQLiteService} from '@app/services/sqlite/sqlite.service';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {Entity} from '@app/entities/entity';
import {TableName} from '@app/services/sqlite/table-name';
import {tablesDefinitions} from '@app/services/sqlite/table-definitions';
import {Platform} from '@ionic/angular';

import {Storage} from '@capacitor/storage';
import {User} from '@app/entities/user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private static readonly referential = `referential`;

    private readonly user: Subject<User>;

    public constructor(private platform: Platform, private sqlite: SQLiteService) {
        this.user = new ReplaySubject<User>(1);

        Storage.get({key: `user`}).then(result => {
            this.user.next(JSON.parse(result.value));
        });

        this.platform.ready().then(() => this.initialize(false));
    }

    public getUser(): Observable<User> {
        return this.user;
    }

    public setUser(user: User): Observable<void> {
        this.user.next(user);

        return from(Storage.set({
            key: `user`,
            value: JSON.stringify(user),
        })) as Observable<void>;
    }

    public async initialize(reset: boolean): Promise<void> {
        if(reset) {
            await this.sqlite.createDatabase(StorageService.referential);
        } else {
            await this.sqlite.openDatabase(StorageService.referential);
        }
    }

    public async get<T extends Entity>(table: string, search: { [key: string]: any } = {}): Promise<Array<T>> {
        let query = `SELECT * FROM ${table}`;

        const values = [];

        if (search) {
            query += ` WHERE 1=1`;
            for (const [field, value] of Object.entries(search)) {
                query += ` AND ${field} LIKE ?`;
                values.push(value);
            }
        }

        return await this.sqlite.executeQuery(query, values).toPromise() as Array<T>;
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
