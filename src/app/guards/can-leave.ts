import {Observable} from 'rxjs';

export interface CanLeave {
    canLeave(): boolean | Observable<boolean>;
}
