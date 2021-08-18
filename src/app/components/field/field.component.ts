import {Component, Input, OnInit} from '@angular/core';
import {Form} from '@app/utils/form';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'bx-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {

    @Input()
    public form: Form;
    public control: FormControl;
    public type: string;

    @Input()
    public class: string;

    @Input()
    public name: string;

    @Input()
    public label: string;

    @Input()
    public counter: number;

    @Input()
    public maxCounter: number;

    @Input()
    public placeholder: string = ``;

    @Input()
    public lines: number|string = 2;

    @Input()
    public required: boolean|string = false;

    ngOnInit() {
        this.type = this.form.controls[this.name].type;
        this.control = this.form.controls[this.name].control;
    }

    clearErrors() {
        this.form.errors[this.name] = undefined;
    }

}
