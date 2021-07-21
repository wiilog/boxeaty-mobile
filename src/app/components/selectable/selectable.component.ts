import {Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {IonicSelectableComponent} from 'ionic-selectable';
import {ApiService} from '@app/services/api.service';
import {Subscription} from 'rxjs';
import {StorageService} from "../../services/storage.service";
import {Entity} from "../../entities/entity";
import {$e} from "@angular/compiler/src/chars";

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

    @Input() ngModel: string;
    @Output() ngModelChange = new EventEmitter<string>();

    public items: Array<any> = [];

    public _item: any;

    public ready = false;

    private subscription?: Subscription;

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.storage.get<Entity>(this.type).then(results => {
            console.log(results);
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
        console.log($event);
        this.ngModelChange.emit($event.value);
    }

}
