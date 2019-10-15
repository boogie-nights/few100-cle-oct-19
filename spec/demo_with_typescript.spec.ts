import { add } from './utils';

describe('writing specs in typescript', () => {
    it('is easy', () => {
        expect(true).toBe(false);
    });
    it('can add', () => {
        expect(add(2, 2)).toBe(5);
    });
});
