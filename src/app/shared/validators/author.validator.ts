import { FormControl } from '@angular/forms';

export function validateAuthor(c: FormControl): {[key: string]: boolean} {
    return c.value && c.value.length > 0 ? null : { invalidNumbersOfAuthors: true };
}
