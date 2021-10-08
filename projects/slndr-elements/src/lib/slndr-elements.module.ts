import { NgModule } from '@angular/core';

import { MarkdownLinkPipe } from './markdownlink.pipe';
import { IfNilPipe } from './if-nil.pipe';

@NgModule({
  declarations: [ MarkdownLinkPipe, IfNilPipe ],
  imports: [],
  exports: [ MarkdownLinkPipe, IfNilPipe ]
})
export class SlndrElementsModule {
}
