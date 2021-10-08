import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * This directive can be used to add the functionality to disabling form controls when working with reactive forms in angular
 *
 * With the default [disable] tag, you get the message
 *
 * **It looks like you’re using the disabled attribute with a reactive form directive.
 * If you set disabled to true when you set up this control in your component class,**
 * **the disabled attribute will actually be set in the DOM for you.
 *   We recommend using this approach to avoid ‘changed after checked’ errors.**
 *
 * **This can be used if you don't want to disable/enable the control in code
 * like formControl.disable() or formControl.enable() or new FormControl({value: '', disabled: true})**
 *
 * @example
 * <input matInput formControlName="coolName" [disableComponent]="true">
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[disableComponent]'
})
export class DisableComponentDirective {

    constructor(private ngControl: NgControl) {
    }

    @Input() set disableComponent(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        if (this.ngControl != null && this.ngControl.control != null) {
            this.ngControl.control[action]();
        }
    }

}
