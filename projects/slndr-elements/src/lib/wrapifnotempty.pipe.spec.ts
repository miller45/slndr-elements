import { WrapIfNotEmptyPipe } from './wrapifnotempty.pipe';

describe('lib', () => {

    describe('WrapIfNotEmptyPipe', () => {

        it('converts null to empty string', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform(null, '[')).toEqual('');
        });

        it('converts undefined to empty string', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform(undefined, '[')).toEqual('');
        });

        it('leaves empty as-is', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform('', '[')).toEqual('');
        });

        it('prefix empty if we explicitly say so', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform('', '[', null, false)).toEqual('[');
            expect(converter.transform(null, '[', null, false)).toEqual('');
        });

        it('prefix a non-empty string', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform('We are not nil', '[')).toEqual('[We are not nil');
        });

        it('postfix a non-empty string', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform('We are not nil', null, ']')).toEqual('We are not nil]');
        });

        it('wraps a non-empty string', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform('We are not nil', '[', ']')).toEqual('[We are not nil]');
        });

        it('wraps a number also', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform(42, '[', ']')).toEqual('[42]');
        });

        it('display empty object as empty string ', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform({}, '[', ']')).toEqual('');
        });

        it('does display non-empty object', () => {
            const converter = new WrapIfNotEmptyPipe();
            expect(converter.transform({somestuff: 'hello world'}, '<', '>')).toEqual('<[object Object]>');
        });

    });

});
