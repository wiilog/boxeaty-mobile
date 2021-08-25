import {Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {IonicSelectableComponent} from 'ionic-selectable';
import {Subscription} from 'rxjs';
import {StorageService} from '@app/services/storage.service';
import {Entity} from '@app/entities/entity';

@Component({
    selector: 'bx-selectable',
    templateUrl: './selectable.component.html',
    styleUrls: ['./selectable.component.scss'],
})
export class SelectableComponent implements OnInit, OnDestroy {

    @ViewChild('component', {static: false})
    public component: IonicSelectableComponent;

    @Input()
    public type: string;

    @Input()
    public placeholder: string;

    @Input()
    public locationType: number|string;

    @Input()
    public ngModel: string;

    @Output()
    public ngModelChange = new EventEmitter<string>();

    public items: Array<any> = [];

    public _item: any;

    public ready = false;

    private subscription?: Subscription;

    constructor(private storage: StorageService) {
    }

    public ngOnInit() {
        this.storage.get<Entity>(this.type, {type: this.locationType as number}).then(results => {
            this.items = results;
            this.ready = true;
        });
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }

    @Input('item')
    public set item(item: any) {
        if (this._item !== item && (!this._item || !item || item.id !== this._item.id)) {
            this._item = item;
        }
    }

    public get item(): any {
        return this._item;
    }

    public onChange($event) {
        this.ngModelChange.emit($event.value);
    }

}
