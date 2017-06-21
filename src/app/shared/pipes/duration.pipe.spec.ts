import { DurationPipe } from './duration.pipe';

describe(`DurationPipe`, () => {
    let pipe: DurationPipe;

    beforeEach(() => {
        pipe = new DurationPipe();
    });

    it('transforms "0" to "0 min"', () => {
        expect(pipe.transform(0)).toBe('0 min');
    });

    it('transforms "60" to "1h"', () => {
        expect(pipe.transform(60)).toBe('1 h');
    });

    it('transforms "20" to "220 min"', () => {
        expect(pipe.transform(20)).toBe('20 min');
    });

    it('transforms "80" to "1h 20 min"', () => {
        expect(pipe.transform(80)).toBe('1 h 20 min');
    });

    it('transforms "200" to "3h 20 min"', () => {
        expect(pipe.transform(200)).toBe('3 h 20 min');
    });

    it('transforms "undefined" to "-"', () => {
        expect(pipe.transform(undefined)).toBe('-');
    });

    it('transforms "null" to "0 min"', () => {
        expect(pipe.transform(null)).toBe('0 min');
    });
});
