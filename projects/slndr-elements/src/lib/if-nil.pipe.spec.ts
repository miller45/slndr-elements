
import { IfNilPipe } from './if-nil.pipe';

describe('ROLIB - UI', () => {

    describe('IfNilPipe', () => {

        it('converts null to "--"', () => {
            const converter = new IfNilPipe();
            expect(converter.transform(null, '--')).toEqual('--');
        });

        it('converts undefined to "--"', () => {
            const converter = new IfNilPipe();
            expect(converter.transform(undefined, '--')).toEqual('--');
        });

        it('leaves a defined string alone', () => {
            const converter = new IfNilPipe();
            expect(converter.transform('We are not nil', '--')).toEqual('We are not nil');
        });

        it('leaves a defined number alone', () => {
            const converter = new IfNilPipe();
            expect(converter.transform(42, '--')).toEqual(42);
        });

        it('does *not* convert an empty string to "--"', () => {
            const converter = new IfNilPipe();
            expect(converter.transform('', '--')).toEqual('');
        });

        it('*does* convert an empty string to "--" if we explicitly say so', () => {
            const converter = new IfNilPipe();
            expect(converter.transform('', '--', true)).toEqual('--');
        });

        it('does *not* convert an empty array to "--"', () => {
            const converter = new IfNilPipe();
            expect(converter.transform([], '--')).toEqual([]);
        });

        it('*does* convert an empty array to "--" if we explicitly say so', () => {
            const converter = new IfNilPipe();
            expect(converter.transform([], '--', true)).toEqual('--');
        });

    });

});
