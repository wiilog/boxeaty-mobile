import {Injectable} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ScannerService} from "@app/services/scanner.service";
import {PhotoService} from "@app/services/photo.service";
import {Router, NavigationStart} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    public static readonly LOGIN = 'login';
    public static readonly HOME = 'home';
    public static readonly LOADING = 'loading';
    public static readonly PREPARATIONS = 'preparations';
    public static readonly DELIVERY_ROUNDS = 'delivery_rounds';
    public static readonly SELECT_DELIVERY = 'select_delivery';
    public static readonly PICK_EVERYTHING = 'pick_everything';
    public static readonly DEPOSIT_BOXES = 'deposit_boxes';
    public static readonly DELIVERY_SIGN = 'delivery_sign';
    public static readonly COLLECTS = 'collects';
    public static readonly COLLECT_NEW = 'collect_new';
    public static readonly RECEPTIONS = 'reception_menu';
    public static readonly RECEPTION_CRATE = 'reception_crate';
    public static readonly RECEPTION_BOX_SCAN = 'reception_box_scan';
    public static readonly RECEPTION_BOX_EDIT = 'reception_box_edit';
    public static readonly CRATE_TO_PREPARE = 'crates_to_prepare';
    public static readonly CRATE_PICKING = 'crate_picking';
    public static readonly BOX_PICKING = 'box_picking';
    public static readonly CRATE_CONTENT = 'crate_content';

    private static readonly ROUTES = {
        login: '/login',
        home: '/home',
        loading: '/loading',
        delivery_rounds: '/delivery-rounds',
        select_delivery: '/select-delivery',
        pick_everything: '/pick-everything',
        deposit_boxes: '/deposit-boxes',
        delivery_sign: '/delivery-sign',
        collects: '/collects',
        collect_new: '/collect-new',
        reception_menu: '/reception-menu',
        reception_crate: '/reception-crate',
        reception_box_scan: '/reception-box-scan',
        reception_box_edit: '/reception-box-edit',
        preparations: '/preparations',
        crates_to_prepare: '/crates-to-prepare',
        crate_picking: '/crate-picking',
        box_picking: '/box-picking',
        crate_content: '/crate-content'
    };

    private paramStack: Array<{ route: string, params: any }> = [];
    private justNavigated: boolean;

    public constructor(private platform: Platform, private navController: NavController,
                       private router: Router,
                       private scanner: ScannerService, private photo: PhotoService) {
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(!this.justNavigated && this.paramStack.length) {
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

        if(route === null) {
            this.paramStack.pop();
            return from(this.navController.pop());
        } else {
            const params = [...this.paramStack].reverse();
            params.shift();

            let index = null;
            for(let i = 0; i < params.length; i++) {
                if(params[i].route === route) {
                    index = i + 1;
                    break;
                }
            }

            if(index === null) {
                throw new Error(`Could not find route ${route}`);
            }

            this.paramStack.splice(this.paramStack.length - index, index);

            const currentParams = this.paramStack[this.paramStack.length - 1].params;
            for(const [key, value] of Object.entries(params)) {
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
