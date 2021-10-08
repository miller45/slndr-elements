import { NgModule } from '@angular/core';

import { MarkdownLinkPipe } from './markdownlink.pipe';
import { IfnilPipe } from './ifnil.pipe';

@NgModule({
  declarations: [ MarkdownLinkPipe, IfnilPipe ],
  imports: [],
  exports: [ MarkdownLinkPipe, IfnilPipe ]
})
export class SlndrElementsModule {
}
