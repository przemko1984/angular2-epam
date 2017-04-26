import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_DATE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
};

@Component({
   selector: 'date-input',
   templateUrl: './date-input.component.html',
   providers: [CUSTOM_DATE_INPUT_VALUE_ACCESSOR]
})
export class DateInputComponent implements ControlValueAccessor {
    @Input() nameOption: string;

    private currentValue: any;

    setValue(item) {
        this.value = item.target.value;
    }

    set value(newValue) {
        if (newValue !== this.currentValue) {
            this.currentValue = newValue;
            this.onChange(newValue);
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
        if (value !== this.currentValue) {
            this.currentValue = value;
        }
    }

    setDisabledState(isDisabled) {
        let warning = isDisabled ? 'disabled' : 'enabled';
        console.info(warning);
    }
}
