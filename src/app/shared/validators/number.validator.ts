import { FormControl } from '@angular/forms';

export function validateNumber(c: FormControl): {[key: string]: boolean} {
    const NUMBER_REGEXP = new RegExp(/^\d+$/);

    return NUMBER_REGEXP.test(c.value) ? null : { invalidNumber: true };
}
