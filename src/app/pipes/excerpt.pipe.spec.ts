import {ExcerptPipe} from './excerpt.pipe';

describe('ExcerptPipe', () => {
    it('create an instance', () => {
        const pipe = new ExcerptPipe();
        expect(pipe).toBeTruthy();
    });

    it('transforms text when it is above the limit', () => {
        const pipe = new ExcerptPipe();
        const text = 'If anybody has a hidden immunity idol and you want to play it, now would be the time to do so.';
        expect(pipe.transform(text, 30)).toBe('If anybody has a hidden immuni...');
    });

    it('leaves text untouched when shorter than limit', () => {
        const pipe = new ExcerptPipe();
        const text = 'Fate cannot be changed - 29chr';
        expect(pipe.transform(text, 30)).toBe(text);
    });

    it('returns an empty value when input is invalid', () => {
        const pipe = new ExcerptPipe();
        expect(pipe.transform(null, 30)).toBe('');
    });
});
