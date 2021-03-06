import { NgModule } from '@angular/core';

import { MarkdownLinkPipe } from './markdownlink.pipe';
import { IfnilPipe } from './ifnil.pipe';
import { WrapIfNotEmptyPipe } from './wrapifnotempty.pipe';
import { DisableComponentDirective } from './disable-component.directive';
import { DisableControlDirective } from './disable-control.directive';
import { BrowserLocationService } from './browser-location.service';

@NgModule({
    declarations: [ MarkdownLinkPipe, IfnilPipe, WrapIfNotEmptyPipe, DisableComponentDirective, DisableControlDirective ],
    imports: [],
    providers: [ BrowserLocationService ],
    exports: [ MarkdownLinkPipe, IfnilPipe, WrapIfNotEmptyPipe, DisableComponentDirective, DisableControlDirective ]
})
export class SlndrElementsModule {
}
