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
    public static readonly COLLECTS = 'collects';
    public static readonly RECEPTIONS = 'receptions';
    public static readonly LOADING = 'loading';

    private static readonly ROUTES = {
        login: '/login',
        home: '/home',
        delivery_rounds: '/delivery-rounds',
        loading: '/loading',
    };

    public constructor(private navController: NavController, private route: ActivatedRoute) {
    }

    public static path(route: string) {
        return NavService.ROUTES[route];
    }

    public push(route: string, params: any = {}): Observable<boolean> {
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
            .subscribe(params => callback(params));
    }

}
