import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, timeout} from 'rxjs/operators';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';
import {LoadingController} from '@ionic/angular';

import API_HOST from '@config/api-host';
import {StorageService} from '@app/services/storage.service';
import {User} from '@app/entities/user';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public static readonly URL: string = `${API_HOST}/api/mobile`;

    public static readonly LOADING_PREPARATIONS = `Chargement des préparations`;
    public static readonly LOADING_DELIVERIES = `Chargement des livraisons`;

    public static readonly PING = {
        method: `GET`,
        endpoint: `/ping`,
    };

    public static readonly LOGIN = {
        method: `POST`,
        endpoint: `/login`,
    };

    public static readonly DEPOSITORIES = {
        method: `GET`,
        endpoint: `/depositories`,
    };

    public static readonly LOCATIONS = {
        method: `GET`,
        endpoint: `/locations`,
    };

    public static readonly QUALITIES = {
        method: `GET`,
        endpoint: `/qualities`,
    };

    public static readonly CRATES = {
        method: `GET`,
        endpoint: `/crates`,
    };

    public static readonly BOX_INFORMATIONS = {
        method: 'GET',
        endpoint: '/box-informations',
    };

    public static readonly AVAILABLE_DELIVERY_ROUNDS = {
        method: `GET`,
        endpoint: `/delivery-rounds`,
    };

    public static readonly DELIVERY_START = {
        method: `POST`,
        endpoint: `/deliveries/start`,
    };

    public static readonly DELIVERY_TAKE = {
        method: `POST`,
        endpoint: `/deliveries/take`,
    };

    public static readonly DELIVERY_DEPOSIT = {
        method: `POST`,
        endpoint: `/deliveries/deposit`,
    };

    public static readonly DELIVERY_FINISH = {
        method: `POST`,
        endpoint: `/deliveries/finish`,
    };

    public static readonly BOX = {
        method: `GET`,
        endpoint: `/box`,
    };

    public static readonly REVERSE_TRACKING = {
        method: `POST`,
        endpoint: `/reverse-tracking`,
    };

    public static readonly PREPARATIONS = {
        method: `GET`,
        endpoint: `/preparations`,
    };

    public static readonly GET_PREPARATION_CONTENT = {
        method: `GET`,
        endpoint: `/preparations/{preparation}`,
    };

    public static readonly PATCH_PREPARATION = {
        method: 'PATCH',
        endpoint: '/preparations/{preparation}',
    };

    public static readonly AVAILABLE_CRATES = {
        method: `GET`,
        endpoint: `/available-crates`,
    };

    public static readonly GET_BOXES = {
        method: `GET`,
        endpoint: `/boxes`,
    };

    public static readonly MOVING = {
        method: 'POST',
        endpoint: '/moving',
    };

    public static readonly GET_COLLECTS = {
        method: 'GET',
        endpoint: '/collects',
    };

    public static readonly COLLECT_CRATES = {
        method: 'GET',
        endpoint: '/collect-crates/{collect}',
    };

    public static readonly PATCH_COLLECT = {
        method: 'PATCH',
        endpoint: '/collects/{collect}',
    };

    public static readonly LOCATION = {
        method: 'GET',
        endpoint: '/location',
    };

    public static readonly POST_COLLECT = {
        method: 'POST',
        endpoint: '/collects'
    };

    private static readonly TIMEOUT: number = 15000;

    private user: User = null;

    public constructor(private storage: StorageService,
                       private nav: NavService,
                       private client: HttpClient,
                       private toastService: ToastService,
                       private loader: LoadingController) {
        this.storage.getUser().subscribe(user => this.user = user);
    }


    private static objectToURI(params: { [name: string]: string | number }): string {
        return Object.keys(params)
            .filter(key => key)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join(`&`);
    }

    public request({method, endpoint}: { method: string, endpoint: string },
                   params = null, loading: string = null): Observable<any> {
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

        if(this.user && this.user.token) {
            options.headers = {
                'x-authorization': `Bearer ${this.user.token}`,
            };
        }

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

        return this.client.request(method, ApiService.URL + endpoint, options).pipe(
            timeout(ApiService.TIMEOUT),
            tap(
                async (result: any) => this.toastService.show(result && result.message),
                async (error: HttpErrorResponse) => {
                    if(error.status === 401) {
                        await this.storage.setUser(null).toPromise();
                        await this.toastService.show(`Une autre session est déjà ouverte, vous avez été déconnecté`);
                        await this.nav.setRoot(NavService.LOGIN);
                    } else {
                        await this.toastService.show(`Une erreur est survenue lors de la communication avec le serveur, merci de contacter un responsable d'établissement`);
                    }
                },
                async () => {
                    finished = true;
                    if(loader) {
                        await loader.dismiss();
                    }
                }
            ));
    }

}
