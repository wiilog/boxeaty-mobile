import {Injectable} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {Router, NavigationStart} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    public static readonly LOGIN = 'login';
    public static readonly HOME = 'home';
    public static readonly LOADING = 'loading';
    public static readonly DELIVERY_ROUNDS = 'delivery_rounds';
    public static readonly SELECT_DELIVERY = 'select_delivery';
    public static readonly PICK_EVERYTHING = 'pick_everything';
    public static readonly DEPOSIT_BOXES = 'deposit_boxes';
    public static readonly DELIVERY_SIGN = 'delivery_sign';
    public static readonly COLLECT_LIST = 'collect_list';
    public static readonly COLLECT_NEW = 'collect_new';
    public static readonly COLLECT_DETAILS = 'collect_details';
    public static readonly COLLECT_VALIDATE = 'collect_validate';
    public static readonly COLLECT_NEW_PICK_LOCATION = 'collect_new_pick_location';
    public static readonly COLLECT_NEW_DETAILS = 'collect_new_details';
    public static readonly COLLECT_NEW_VALIDATE = 'collect_new_validate';
    public static readonly RECEPTION_MENU = 'reception_menu';
    public static readonly REVERSE_TRACKING_CRATE = 'reverse_tracking_crate';
    public static readonly REVERSE_TRACKING_BOX_SCAN = 'reverse_tracking_box_scan';
    public static readonly REVERSE_TRACKING_BOX_VALIDATE = 'reverse_tracking_box_validate';
    public static readonly MOVING_BOX_SCAN = 'moving_box_scan';
    public static readonly MOVING_BOX_VALIDATE = 'moving_box_validate';
    public static readonly PREPARATION_LIST = 'preparation_list';
    public static readonly PREPARATION_CRATES_TO_PREPARE = 'preparation_crates_to_prepare';
    public static readonly PREPARATION_CRATE_PICKING = 'preparation_crate_picking';
    public static readonly PREPARATION_BOX_PICKING = 'preparation_box_picking';
    public static readonly PREPARATION_CRATE_CONTENT = 'preparation_crate_content';

    private static readonly ROUTES = {
        [NavService.LOGIN]: '/login',
        [NavService.HOME]: '/home',
        [NavService.LOADING]: '/loading',
        [NavService.DELIVERY_ROUNDS]: '/delivery-rounds',
        [NavService.SELECT_DELIVERY]: '/select-delivery',
        [NavService.PICK_EVERYTHING]: '/pick-everything',
        [NavService.DEPOSIT_BOXES]: '/deposit-boxes',
        [NavService.DELIVERY_SIGN]: '/delivery-sign',
        [NavService.COLLECT_LIST]: '/collect-list',
        [NavService.COLLECT_NEW]: '/collect-new',
        [NavService.COLLECT_DETAILS]: '/collect-details',
        [NavService.COLLECT_VALIDATE]: '/collect-validate',
        [NavService.COLLECT_NEW_PICK_LOCATION]: '/collect-new-pick-location',
        [NavService.COLLECT_NEW_DETAILS]: '/collect-new-details',
        [NavService.COLLECT_NEW_VALIDATE]: '/collect-new-validate',
        [NavService.RECEPTION_MENU]: '/reception-menu',
        [NavService.REVERSE_TRACKING_CRATE]: '/reverse-tracking-crate',
        [NavService.REVERSE_TRACKING_BOX_SCAN]: '/reverse-tracking-box-scan',
        [NavService.REVERSE_TRACKING_BOX_VALIDATE]: '/reverse-tracking-box-validate',
        [NavService.MOVING_BOX_SCAN]: '/moving-box-scan',
        [NavService.MOVING_BOX_VALIDATE]: '/moving-box-validate',
        [NavService.PREPARATION_LIST]: '/preparation-list',
        [NavService.PREPARATION_CRATES_TO_PREPARE]: '/preparation-crates-to-prepare',
        [NavService.PREPARATION_CRATE_PICKING]: '/preparation-crate-picking',
        [NavService.PREPARATION_BOX_PICKING]: '/preparation-box-picking',
        [NavService.PREPARATION_CRATE_CONTENT]: '/preparation-crate-content',
    };

    private paramStack: Array<{ route: string, params: any }> = [];
    private justNavigated: boolean;

    public constructor(private platform: Platform, private navController: NavController, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (!this.justNavigated && this.paramStack.length) {
                    this.paramStack.pop();
                }

                this.justNavigated = false;
            }
        });
    }

    public static path(route: string) {
        return NavService.ROUTES[route];
    }

    public push(route: string, params: any = {}): Observable<boolean> {
        this.justNavigated = true;
        this.paramStack.push({route, params});

        return from(this.navController.navigateForward(NavService.ROUTES[route]));
    }

    public pop(route: string = null, params: any = {}): Observable<void> {
        this.justNavigated = true;

        if (route === null) {
            this.paramStack.pop();
            return from(this.navController.pop());
        } else {
            const reversedParamStack = [...this.paramStack].reverse();
            reversedParamStack.shift();

            let index = null;
            for (let i = 0; i < reversedParamStack.length; i++) {
                if (reversedParamStack[i].route === route) {
                    index = i + 1;
                    break;
                }
            }

            if (index === null) {
                throw new Error(`Could not find route ${route}`);
            }

            this.paramStack.splice(this.paramStack.length - index, index);

            const currentParams = this.paramStack[this.paramStack.length - 1].params;
            for (const [key, value] of Object.entries(params)) {
                currentParams[key] = value;
            }

            return from(this.navController.navigateBack(NavService.ROUTES[route]) as unknown as Observable<void>);
        }
    }

    public setRoot(route: string, params: any = {}): Observable<boolean> {
        this.justNavigated = true;
        this.paramStack = [params];

        return from(this.navController.navigateRoot(NavService.ROUTES[route]));
    }

    public params<T = any>(): T {
        return this.paramStack[this.paramStack.length - 1].params;
    }

    public param<T = any>(key: string): T {
        return this.paramStack[this.paramStack.length - 1].params[key];
    }

}
