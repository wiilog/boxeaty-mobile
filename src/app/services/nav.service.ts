import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    public static readonly LOGIN = 'login';
    public static readonly HOME = 'home';
    public static readonly PREPARATIONS = 'preparations';
    public static readonly DELIVERY_ROUNDS = 'delivery_rounds';
    public static readonly SELECT_DELIVERY = 'select_delivery';
    public static readonly COLLECTS = 'collects';
    public static readonly RECEPTIONS = 'receptions';
    public static readonly LOADING = 'loading';
    public static readonly RECEPTION_MENU = 'reception_menu';
    public static readonly RECEPTION_CRATE = 'reception_crate';
    public static readonly RECEPTION_BOX_SCAN = 'reception_box_scan';
    public static readonly RECEPTION_BOX_EDIT = 'reception_box_edit';
    public static readonly CRATE_TO_PREPARE = 'crates_to_prepare';

    private static readonly ROUTES = {
        login: '/login',
        home: '/home',
        delivery_rounds: '/delivery-rounds',
        select_delivery: '/select-delivery',
        loading: '/loading',
        reception_menu: '/reception-menu',
        reception_crate: '/reception-crate',
        reception_box_scan: '/reception-box-scan',
        reception_box_edit: '/reception-box-edit',
        preparations: '/preparations',
        crates_to_prepare: '/crates-to-prepare'
    };

    public constructor(private navController: NavController, private route: ActivatedRoute) {
    }

    public static path(route: string) {
        return NavService.ROUTES[route];
    }

    public push(route: string, params: any = {}): Observable<boolean> {
        const objects = [];
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === 'object') {
                params[key] = JSON.stringify(value);
                objects.push(key);
            }
        }

        params.__json_objects = JSON.stringify(objects);

        return from(this.navController.navigateForward(NavService.ROUTES[route], {
            queryParams: params
        }));
    }

    public pop(): Observable<void> {
        return from(this.navController.pop());
    }

    public setRoot(route: string, params: any = {}): Observable<boolean> {
        return from(this.navController.navigateRoot(NavService.ROUTES[route], {
            queryParams: params
        }));
    }

    public readParams(callback: (any) => void) {
        this.route.queryParams
            .pipe(take(1))
            .subscribe(params => callback(this.deserializeParams(params)));
    }

    private deserializeParams(params: {[key: string]: number | string }): { [key: string]: any } {
        const objects = JSON.parse(params.__json_objects as string);
        const deserialized = {};
        for (const [key, value] of Object.entries(params)) {
            if (key === `__json_objects`) {
                continue;
            }

            if (objects.includes(key)) {
                deserialized[key] = JSON.parse(params[key] as string);
            } else {
                deserialized[key] = params[key];
            }
        }

        return deserialized;
    }

}
