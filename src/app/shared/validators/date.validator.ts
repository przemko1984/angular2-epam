import { FormControl } from '@angular/forms';

export function validateDate(c: FormControl): {[key: string]: boolean} {
    const DATE_REGEXP = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    console.log('validate', c.value);

    return DATE_REGEXP.test(c.value) ? null : { invalidDate: true };

    // if (!c.value) {
    //     return null;
    // }

    // let isValid = DATE_REGEXP.test(c.value);

    // if (isValid) {
    //     let value = c.value.match(DATE_REGEXP);
    //     c.setValue(new Date(value[3], value[2], value[1]), {
    //         onlySelf: true,
    //         emitEvent: true,
    //         emitModelToViewChange: false,
    //         emitViewToModelChange: true
    //     });
    //     console.log('date', c.value);
    //     return null;
    // } else {
    //     c.setValue(null, {
    //         onlySelf: true,
    //         emitEvent: true,
    //         emitModelToViewChange: false,
    //         emitViewToModelChange: true
    //     });
    //     return { invalidDate: true };
    // }

}
