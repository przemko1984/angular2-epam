import { FormControl } from '@angular/forms';

export function validateAuthor(c: FormControl): {[key: string]: boolean} {
    console.log('V', c.value && c.value.length > 0 ? null : { invalidAuthor: true });
    return c.value && c.value.length > 0 ? null : { invalidAuthor: true };
}
