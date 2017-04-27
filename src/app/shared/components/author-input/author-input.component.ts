import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NG_VALIDATORS,
    FormControl,
    Validator
} from '@angular/forms';

import { validateAuthor } from './../../validators/author.validator';

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
export class AuthorInputComponent implements ControlValueAccessor, Validator, OnInit {
    @Input() nameOption: string;
    @Input() items: string[];

    private currentValue: any[];

    setValue(item) {
        console.log('setValue',  item.target.value);
        this.value = item.target.value;
    }

    ngOnInit() {
        // console.log('--->', this.items);
    }

    set value(newValue) {
        console.log('value', newValue);
        let index = this.currentValue.indexOf(newValue);
        if (index === -1) {
            this.currentValue.push(newValue);
        } else {
            this.currentValue.splice(index, 1);
        }
        this.onChange(this.currentValue);

    }

    get value() {
        return this.currentValue;
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
        // console.log('writeValue', value);
        if (value !== this.currentValue) {
            this.currentValue = value;
        }
    }

    setDisabledState(isDisabled) {
        let warning = isDisabled ? 'disabled' : 'enabled';
        console.info(warning);
    }

    validate(c: FormControl) {
        return validateAuthor(c);
    }

    isChecked(item: string) {
        return this.currentValue.indexOf(item) > -1;
    }
}
