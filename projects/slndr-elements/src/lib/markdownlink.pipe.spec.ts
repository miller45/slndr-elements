import { MarkdownLinkPipe } from './markdownlink.pipe';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SecurityContext } from '@angular/core';

export class MockDomSanitationService {
    constructor() {
    }


    public bypassSecurityTrustHtml(text: string): any {
        return text;
    }

    public bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
        return value;
    }

    public bypassSecurityTrustUrl(value: string): SafeUrl {
        return value;
    }

    public sanitize(ctx: SecurityContext, value: any): string {
        return value;
    }
}

describe('lib', () => {

    let domSanitizer: DomSanitizer;

    // asymmetric matcher for a HTML sanitizing warning (a warning that unsafe HTML has been filtered out)
    const aHtmlStrippedWarning = {
        // tslint:disable-next-line:only-arrow-functions
        asymmetricMatch(actual: string) {
            // we match only the beginning of the warning because the end is a link that changes between angular versions
            return actual && actual.indexOf('WARNING: sanitizing HTML stripped some content') === 0;
        }
    };

    // asymmetric matcher for a URL sanitizing warning (a warning that unsafe URL content has been filtered out)
    const aSanitizeUnsafeUrlWarning = {
        // tslint:disable-next-line:only-arrow-functions
        asymmetricMatch(actual: string) {
            // we match only the beginning of the warning because it contains also the value of javasript that has been stripped
            return actual && actual.indexOf('WARNING: sanitizing unsafe URL value javascript:') === 0;
        }
    };

    describe('MarkdownLinkPipe', () => {
        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [ CommonModule ],
                providers: [ {
                    provide: DomSanitizer,
                    useClass: MockDomSanitationService
                } ],
            });

            domSanitizer = TestBed.get(DomSanitizer);
        });

        it('converts null to ""', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(null)).toEqual('');
        });

        it('converts undefined to ""', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(undefined)).toEqual('');
        });

        it('leaves a defined string alone', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform('We are not nil')).toEqual('We are not nil');
        });

        describe('with link opening in new tab', () => {
            it('converts lonely markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com)')).toEqual(`<a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a>`);
            });

            it('converts markdown link at start', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Normal text before [Go to google](https://www.google.com)')).toEqual(`Normal text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a>`);
            });

            it('converts markdown link at end', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com) Normal text after')).toEqual(`<a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Normal text after`);
            });

            it('converts markdown link in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Go to google](https://www.google.com) Text after')).toEqual(`Text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Text after`);
            });

            it('converts multiple markdown links in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After')).toEqual(`Text before <a href="https://www.link1.com" rel="noreferrer" target="_blank">Link1</a> Text Middle <a href="https://www.link2.com" rel="noreferrer" target="_blank">Link2</a> Text After`);
            });

            it('leaves non markdown square braces alone', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[id] Text before [Go to google](https://www.google.com) Text after')).toEqual(`[id] Text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Text after`);
            });
        });

        describe('with link opening in place', () => {
            it('converts lonely markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com)', true)).toEqual(`<a href="https://www.google.com">Go to google</a>`);
            });

            it('converts markdown link at start', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Normal text before [Go to google](https://www.google.com)', true)).toEqual(`Normal text before <a href="https://www.google.com">Go to google</a>`);
            });

            it('converts markdown link at end', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com) Normal text after', true)).toEqual(`<a href="https://www.google.com">Go to google</a> Normal text after`);
            });

            it('converts markdown link in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Go to google](https://www.google.com) Text after', true)).toEqual(`Text before <a href="https://www.google.com">Go to google</a> Text after`);
            });

            it('converts multiple markdown links in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform(
                    'Text before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text before <a href="https://www.link1.com">Link1</a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
            });

            it('leaves non markdown square braces alone', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[id] Text before [Go to google](https://www.google.com) Text after', true)).toEqual(`[id] Text before <a href="https://www.google.com">Go to google</a> Text after`);
            });
        });

        describe('some security cases', () => {
            it('does not distort javascript outside markdown ', () => {
                // make sure the the markdown parser does not distort the javascript
                const converter = new MarkdownLinkPipe(domSanitizer);
                // we use a mocked domsanitzer here so we expect the script tag to be the result
                expect(converter.transform(
                    'Text <script>console.error(\'Hello World\');</script>before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text <script>console.error('Hello World');</script>before <a href="https://www.link1.com">Link1</a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
            });

            it('does not distort javascript inside markdown text', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                // we use a mocked domsanitzer here so we expect the script tag to be in the result
                expect(converter.transform(
                    'Text before [Link1<script>console.error(\'Hello World\');</script>](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text before <a href="https://www.link1.com">Link1<script>console.error('Hello World');</script></a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
            });

            it('does not distort javascript without brackets inside markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                // we use a mocked domsanitzer here so we expect the script tag to be in the result
                expect(converter.transform(
                    'Text before [Link1](javascript:window.password=\'abc\';) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text before <a href="javascript:window.password='abc';">Link1</a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
            });

            it('does not allow nested brackets', () => {
                // nested brackets would confuse the parser so the domsanitzer would not see a complete script (might confuse it)
                //  brackets could in theory be part of an url but the "users" has to live with that
                const converter = new MarkdownLinkPipe(domSanitizer);
                // We the sanitzer to refuse by return a simple message
                expect(converter.transform(
                    // tslint:disable-next-line:max-line-length
                    'Text before [Link1](javascript:console.error(\'Hello World\');) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `ERROR: Unsecure content: The markdown has nested brackets`
                );
            });


        });


        it('leaves a defined number alone', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(42)).toEqual(42 as any);
        });
    });

    describe('MarkdownLinkPipe Integration Tests with Real DomSanitzer', () => {

        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [ CommonModule, BrowserModule ]
            });

            domSanitizer = TestBed.get(DomSanitizer);
        });

        it('converts null to ""', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(null)).toEqual('');
        });

        it('converts undefined to ""', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(undefined)).toEqual('');
        });

        it('leaves a defined string alone', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform('We are not nil')).toEqual('We are not nil');
        });

        describe('with link opening in new tab', () => {
            it('converts lonely markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com)')).toEqual(`<a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a>`);
            });

            it('converts markdown link at start', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Normal text before [Go to google](https://www.google.com)')).toEqual(`Normal text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a>`);
            });

            it('converts markdown link at end', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com) Normal text after')).toEqual(`<a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Normal text after`);
            });

            it('converts markdown link in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Go to google](https://www.google.com) Text after')).toEqual(`Text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Text after`);
            });

            it('converts multiple markdown links in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After')).toEqual(`Text before <a href="https://www.link1.com" rel="noreferrer" target="_blank">Link1</a> Text Middle <a href="https://www.link2.com" rel="noreferrer" target="_blank">Link2</a> Text After`);
            });

            it('leaves non markdown square braces alone', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[id] Text before [Go to google](https://www.google.com) Text after')).toEqual(`[id] Text before <a href="https://www.google.com" rel="noreferrer" target="_blank">Go to google</a> Text after`);
            });
        });

        describe('with link opening in place', () => {
            it('converts lonely markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com)', true)).toEqual(`<a href="https://www.google.com">Go to google</a>`);
            });

            it('converts markdown link at start', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Normal text before [Go to google](https://www.google.com)', true)).toEqual(`Normal text before <a href="https://www.google.com">Go to google</a>`);
            });

            it('converts markdown link at end', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[Go to google](https://www.google.com) Normal text after', true)).toEqual(`<a href="https://www.google.com">Go to google</a> Normal text after`);
            });

            it('converts markdown link in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('Text before [Go to google](https://www.google.com) Text after', true)).toEqual(`Text before <a href="https://www.google.com">Go to google</a> Text after`);
            });

            it('converts multiple markdown links in the middle', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform(
                    'Text before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text before <a href="https://www.link1.com">Link1</a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
            });

            it('leaves non markdown square braces alone', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform('[id] Text before [Go to google](https://www.google.com) Text after', true)).toEqual(`[id] Text before <a href="https://www.google.com">Go to google</a> Text after`);
            });
        });

        describe('some security cases', () => {
            it('filters javascript outside markdown ', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                spyOn(console, 'warn').and.stub();
                expect(converter.transform(
                    'Text <script>console.error(\'Hello World\');</script>before [Link1](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).not.toContain(
                    '<script>'
                );
                expect(console.warn).toHaveBeenCalledWith(aHtmlStrippedWarning);
            });

            it('filters javascript inside markdown text', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                spyOn(console, 'warn').and.stub();
                expect(converter.transform(
                    'Text before [Link1<script>console.error(\'Hello World\');</script>](https://www.link1.com) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).not.toContain(
                    '<script>'
                );
                expect(console.warn).toHaveBeenCalledWith(aHtmlStrippedWarning);
            });

            it('filters messyjavascript markdown text', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                spyOn(console, 'warn').and.stub();
                expect(converter.transform(
                    'Text before [Link1<script>//** ] **/ console.error(\'https://www.link1.com)</script> Text Middle [Link2](https://www.link2.com) Text After', true)
                ).not.toContain(
                    '<script>'
                );
                expect(console.warn).toHaveBeenCalledWith(aHtmlStrippedWarning);
            });


            it('refuses javascript inside markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                expect(converter.transform(
                    // tslint:disable-next-line:max-line-length
                    'Text before [Link1](javascript:console.error(\'Hello World\');) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `ERROR: Unsecure content: The markdown has nested brackets`
                );
            });

            it('filters javascript without brackets inside markdown link', () => {
                const converter = new MarkdownLinkPipe(domSanitizer);
                spyOn(console, 'warn').and.stub();
                expect(converter.transform(
                    'Text before [Link1](javascript:window.password=\'abc\';) Text Middle [Link2](https://www.link2.com) Text After', true)
                ).toEqual(
                    `Text before <a href="unsafe:javascript:window.password='abc';">Link1</a> Text Middle <a href="https://www.link2.com">Link2</a> Text After`
                );
                expect(console.warn).toHaveBeenCalledWith(aSanitizeUnsafeUrlWarning);
            });

        });


        it('leaves a defined number alone', () => {
            const converter = new MarkdownLinkPipe(domSanitizer);
            expect(converter.transform(42)).toEqual(42 as any);
        });
    });

});
