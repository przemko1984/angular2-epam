import { Component, Input, forwardRef } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NG_VALIDATORS,
    FormControl,
    Validator
} from '@angular/forms';

import { validateAuthor } from './../../validators/author.validator';
import { IAuthor } from './../../../business-entities';

const CUSTOM_DATE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorInputComponent),
    multi: true
};

const CUSTOM_DATE_INPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AuthorInputComponent),
    multi: true
};

@Component({
   selector: 'author-input',
   templateUrl: './author-input.component.html',
   styles: [require('./author-input.component.scss')],
   providers: [CUSTOM_DATE_INPUT_VALUE_ACCESSOR, CUSTOM_DATE_INPUT_VALIDATOR]
})
export class AuthorInputComponent implements ControlValueAccessor, Validator {
    @Input() nameOption: string;
    @Input() items: IAuthor[];

    private currentValue: any[] = [];

    setValue(item) {
        this.value = item;
    }

    set value(newValue: IAuthor) {
        let index = this.currentValue.findIndex((item) => item.id === newValue.id);
        if (index === -1) { // if not exist, add to array
            this.currentValue.push(newValue);
        } else { // if exist, remov from array
            this.currentValue.splice(index, 1);
        }
        this.onChange(this.currentValue);
    }

    onChange = (_) => {};
    onTouched = () => {};

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        if (value !== this.currentValue) {
            this.currentValue = value || [];
        }
    }

    setDisabledState(isDisabled) {
        let warning = isDisabled ? 'disabled' : 'enabled';
        console.info(warning);
    }

    validate(c: FormControl) {
        return validateAuthor(c);
    }

    isChecked(item: IAuthor) {
        return this.currentValue.find((elem) => elem.id === item.id);
    }
}
