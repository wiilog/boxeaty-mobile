import {FormControl, Validators} from '@angular/forms';

export class FormField {
    type: string;
    control: FormControl;
}

export class Form {

    public controls: { [key: string]: FormField };
    public errors: { [key: string]: string };

    constructor(controls: { [key: string]: FormField }) {
        this.controls = controls;
        this.errors = {};
    }

    static create(controls: { [key: string]: FormField }): Form {
        return new Form(controls);
    }

    static checkbox(): FormField {
        return {
            type: `checkbox`,
            control: new FormControl(null),
        };
    }

    static text(required: boolean = false): FormField {
        return {
            type: `text`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
            ]),
        }
    }

    static textarea(required: boolean = false): FormField {
        return {
            type: `textarea`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
            ]),
        }
    }

    static number(minimum: number = null, maximum: number = null, required: boolean = false): FormField {
        return {
            type: `text`,
            control: new FormControl(null, [
                ...(minimum !== null ? [Validators.min(minimum)] : []),
                ...(maximum !== null ? [Validators.max(maximum)] : []),
                ...(required ? [Validators.required] : []),
            ]),
        }
    }

    static email(required: boolean = false): FormField {
        return {
            type: `email`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
                Validators.email,
            ]),
        };
    }

    static password(required: boolean = false): FormField {
        return {
            type: `password`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
            ])
        };
    }

    static photo(required: boolean = false): FormField {
        return {
            type: `photo`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
            ])
        };
    }

    static signature(required: boolean = false): FormField {
        return {
            type: `signature`,
            control: new FormControl(null, [
                ...(required ? [Validators.required] : []),
            ])
        };
    }

    public process(): { [key: string]: any } | boolean {
        const data = {};
        const errors = {};

        for (const [name, {type, control}] of Object.entries(this.controls)) {
            let value;
            if ([`text`, `email`].includes(type)) {
                value = (control.value || ``).trim();
            } else if(type === `checkbox`) {
                value = !!control.value;
            } else {
                value = control.value;
            }

            if (control.errors) {
                if (control.errors.required) {
                    errors[name] = `Ce champ est requis`;
                } else if (control.errors.email) {
                    errors[name] = `Ce champ doit être une adresse email valide`;
                }
            } else {
                data[name] = control.value;
            }
        }

        this.errors = errors;

        if(Object.keys(errors).length === 0) {
            return data;
        } else {
            return false;
        }
    }

}
