import { NgModule } from '@angular/core';

import { MarkdownLinkPipe } from './markdownlink.pipe';
import { IfnilPipe } from './ifnil.pipe';
import { WrapIfNotEmptyPipe } from './wrapifnotempty.pipe';

@NgModule({
  declarations: [ MarkdownLinkPipe, IfnilPipe, WrapIfNotEmptyPipe ],
  imports: [],
  exports: [ MarkdownLinkPipe, IfnilPipe, WrapIfNotEmptyPipe ]
})
export class SlndrElementsModule {
}
