import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, timeout} from 'rxjs/operators';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';

import API_HOST from '@config/api-host';
import {StorageService} from "@app/services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public static readonly URL: string = `${API_HOST}/api/mobile`;

    public static readonly PING = {
        method: 'GET',
        endpoint: '/ping',
    };

    public static readonly LOGIN = {
        method: 'POST',
        endpoint: '/login',
    };

    public static readonly DEPOSITORIES = {
        method: 'GET',
        endpoint: '/depositories',
    };

    public static readonly AVAILABLE_DELIVERY_ROUNDS = {
        method: 'GET',
        endpoint: '/delivery-rounds',
    };

    private static readonly VERIFICATION_SERVICE_TIMEOUT: number = 5000;

    private token: string;

    constructor(private storage: StorageService, private nav: NavService,
                private client: HttpClient, private toastService: ToastService) {

        this.storage.getToken().subscribe(token => {
            this.token = token;
        });
    }

    private static objectToURI(params: { [name: string]: string | number }): string {
        return Object.keys(params)
            .filter(key => key)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join(`&`);
    }

    public request({method, endpoint}: { method: string, endpoint: string }, params = null): Observable<any> {
        const options = {
            body: params ? JSON.stringify(params) : null,
            headers: undefined,
            withCredentials: false,
        };

        if (this.token) {
            options.headers = {
                'x-authorization': `Bearer ${this.token}`,
            };
        }

        if (params) {
            endpoint = endpoint.replace(/{(\w+)}/g, (match, name) => {
                const value = params[name];

                if (value !== undefined) {
                    delete params[name];
                    return value;
                } else {
                    throw new Error(`Parameter ${name} not found`);
                }
            });
        }

        if ((method === `GET` || method === `DELETE`) && params) {
            const queryParams = ApiService.objectToURI(params);
            if (queryParams) {
                endpoint += (endpoint.indexOf('?') !== -1 ? '&' : '?') + queryParams;
            }
        }

        return this.client
            .request(method, ApiService.URL + endpoint, options)
            .pipe(
                timeout(ApiService.VERIFICATION_SERVICE_TIMEOUT),
                tap(
                    async (result: any) => this.toastService.show(result && result.message),
                    async (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this.token = null;
                            await this.toastService.show(`Une autre session est déjà ouverte, vous avez été déconnecté`);
                            await this.nav.setRoot(NavService.LOGIN);
                        } else {
                            await this.toastService.show(`Une erreur est survenue lors de la communication avec le serveur, merci de contacter un responsable d'établissement`);
                        }
                    },
                ));
    }

}
