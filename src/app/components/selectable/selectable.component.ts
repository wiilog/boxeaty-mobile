import {Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {IonicSelectableComponent} from 'ionic-selectable';
import {Subscription} from 'rxjs';
import {StorageService} from "@app/services/storage.service";
import {Entity} from "@app/entities/entity";

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
    public locationType: string;

    @Input() ngModel: string;
    @Output() ngModelChange = new EventEmitter<string>();

    public items: Array<any> = [];

    public _item: any;

    public ready = false;

    private subscription?: Subscription;

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.storage.get<Entity>(this.type, {type: parseInt(this.locationType)}).then(results => {
            this.items = results;
            this.ready = true;
        });
    }

    ngOnDestroy() {
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

    onChange($event) {
        this.ngModelChange.emit($event.value);
    }

}
