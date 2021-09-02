import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, mergeMap, tap, timeout} from 'rxjs/operators';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';
import {LoadingController} from '@ionic/angular';

import API_HOST from '@config/api-host';
import {StorageService} from '@app/services/storage.service';
import {User} from '@app/entities/user';
import Route from '@app/entities/route';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public static readonly URL: string = `${API_HOST}/api/mobile`;

    public static readonly LOADING_PREPARATIONS = `Chargement des préparations`;
    public static readonly LOADING_DELIVERIES = `Chargement des livraisons`;

    public static readonly LOGIN: Route = {
        method: `POST`,
        endpoint: `/login`,
    };

    public static readonly DEPOSITORIES: Route = {
        method: `GET`,
        endpoint: `/depositories`,
    };

    public static readonly LOCATIONS: Route = {
        method: `GET`,
        endpoint: `/locations`,
    };

    public static readonly QUALITIES: Route = {
        method: `GET`,
        endpoint: `/qualities`,
    };

    public static readonly CRATES: Route = {
        method: `GET`,
        endpoint: `/crates`,
    };

    public static readonly BOX_INFORMATIONS: Route = {
        method: 'GET',
        endpoint: '/box-informations',
    };

    public static readonly AVAILABLE_DELIVERY_ROUNDS: Route = {
        method: `GET`,
        endpoint: `/delivery-rounds`,
    };

    public static readonly DELIVERY_START: Route = {
        method: `POST`,
        endpoint: `/deliveries/start`,
    };

    public static readonly DELIVERY_TAKE: Route = {
        method: `POST`,
        endpoint: `/deliveries/take`,
    };

    public static readonly DELIVERY_DEPOSIT: Route = {
        method: `POST`,
        endpoint: `/deliveries/deposit`,
    };

    public static readonly DELIVERY_FINISH: Route = {
        method: `POST`,
        endpoint: `/deliveries/finish`,
    };

    public static readonly BOX: Route = {
        method: `GET`,
        endpoint: `/box`,
    };

    public static readonly REVERSE_TRACKING: Route = {
        method: `POST`,
        endpoint: `/reverse-tracking`,
    };

    public static readonly PREPARATIONS: Route = {
        method: `GET`,
        endpoint: `/preparations`,
    };

    public static readonly GET_PREPARATION_CONTENT: Route = {
        method: `GET`,
        endpoint: `/preparations/{preparation}`,
    };

    public static readonly PATCH_PREPARATION: Route = {
        method: 'PATCH',
        endpoint: '/preparations/{preparation}',
    };

    public static readonly AVAILABLE_CRATES: Route = {
        method: `GET`,
        endpoint: `/available-crates`,
    };

    public static readonly AVAILABLE_BOXES: Route = {
        method: `GET`,
        endpoint: `/available-boxes`,
    };

    public static readonly MOVING: Route = {
        method: 'POST',
        endpoint: '/moving',
    };

    public static readonly GET_COLLECTS: Route = {
        method: 'GET',
        endpoint: '/collects',
    };

    public static readonly COLLECT_CRATES: Route = {
        method: 'GET',
        endpoint: '/collect-crates/{collect}',
    };

    public static readonly CREATE_COLLECT: Route = {
        method: 'POST',
        endpoint: '/collects'
    };

    public static readonly VALIDATE_COLLECT: Route = {
        method: 'PATCH',
        endpoint: '/collects/{collect}',
    };

    public static readonly LOCATION: Route = {
        method: 'GET',
        endpoint: '/location',
    };

    private static readonly TIMEOUT: number = 30000;

    public constructor(private storage: StorageService,
                       private nav: NavService,
                       private client: HttpClient,
                       private toastService: ToastService,
                       private loader: LoadingController) {
    }


    private static objectToURI(params: { [name: string]: string | number }): string {
        return Object.keys(params)
            .filter(key => key)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join(`&`);
    }

    public request({method, endpoint}: Route, params = null, loading: string = null): Observable<any> {
        let loader = null;
        let finished = false;
        if(loading) {
            this.loader.create({message: loading}).then(l => {
                if(!finished) {
                    loader = l;
                    loader.present();
                }
            });
        }

        const options = {
            body: params ? JSON.stringify(params) : null,
            headers: undefined,
            withCredentials: false,
        };

        if(params) {
            endpoint = endpoint.replace(/{(\w+)}/g, (match, name) => {
                const value = params[name];

                if(value !== undefined) {
                    delete params[name];
                    return value;
                } else {
                    throw new Error(`Parameter ${name} not found`);
                }
            });
        }

        if((method === `GET` || method === `DELETE`) && params) {
            const queryParams = ApiService.objectToURI(params);
            if(queryParams) {
                endpoint += (endpoint.indexOf(`?`) !== -1 ? `&` : `?`) + queryParams;
            }
        }

        return this.storage.getUser().pipe(
            first(),
            mergeMap((user: User) => {
                if(user && user.token) {
                    options.headers = {
                        'x-authorization': `Bearer ${user.token}`,
                    };
                }

                return this.client.request(method, ApiService.URL + endpoint, options);
            }),
            timeout(ApiService.TIMEOUT),
            tap(
                async (result: any) => {
                    finished = true;
                    if(loader) {
                        await loader.dismiss();
                    }

                    await this.toastService.show(result && result.message);
                },
                async (error: HttpErrorResponse) => {
                    finished = true;
                    if(loader) {
                        await loader.dismiss();
                    }

                    if(error.status === 401) {
                        await this.storage.setUser(null).toPromise();
                        await this.toastService.show(`Une autre session est déjà ouverte, vous avez été déconnecté`);
                        await this.nav.setRoot(NavService.LOGIN);
                    } else {
                        await this.toastService.show(`Une erreur est survenue lors de la communication avec le serveur, merci de contacter un responsable d'établissement`);
                    }
                },
            ));
    }

}
