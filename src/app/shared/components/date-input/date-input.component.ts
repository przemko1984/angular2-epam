import { Component, Input, forwardRef } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NG_VALIDATORS,
    FormControl,
    Validator
} from '@angular/forms';
import { DatePipe } from '@angular/common';

const CUSTOM_DATE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
};

const CUSTOM_DATE_INPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
};

@Component({
   selector: 'date-input',
   templateUrl: './date-input.component.html',
   providers: [CUSTOM_DATE_INPUT_VALUE_ACCESSOR, CUSTOM_DATE_INPUT_VALIDATOR]
})
export class DateInputComponent implements ControlValueAccessor, Validator {
    @Input() nameOption: string;

    private dateRegExp = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    private currentValue: any;

    constructor(private datePipe: DatePipe) { }

    setValue(item) {
        this.value = item.target.value;
    }

    set value(newValue) {
        if (newValue !== this.currentValue) {
            this.currentValue = newValue;
            let matchValue = newValue.match(this.dateRegExp);
            if (matchValue) {
                let onChangeDate = new Date(matchValue[3], +matchValue[2] - 1, matchValue[1]);
                this.onChange(onChangeDate.toISOString());
            } else {
                this.onChange(null);
            }
        }
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
        if (value && value !== this.currentValue) {
            let date = new Date(value);
            this.currentValue = this.datePipe.transform(date, 'dd/MM/yyyy');
        }
    }

    setDisabledState(isDisabled) {
        let warning = isDisabled ? 'disabled' : 'enabled';
        console.info(warning);
    }

    validate() {
        // nothing to validate
        if (!this.value) {
            return null;
        }
        return  this.dateRegExp.test(this.value) ? null : { invalidDate: true };
    }
}
