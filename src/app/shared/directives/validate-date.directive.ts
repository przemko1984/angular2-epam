import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { validateDate } from './../validators/date.validator';

@Directive({
   selector: '[validateDate][ngModel],[validateDate][formControl]',
   providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective), multi: true }
  ]
})

export class DateValidatorDirective implements Validator {

    validate(c: FormControl) {
        return validateDate(c);
    }
}
