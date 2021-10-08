import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisableComponentDirective } from './disable-component.directive';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('lib', () => {
    describe('DisableComponentDirective', () => {

        let component: DisableComponentTestComponent;
        let fixture: ComponentFixture<DisableComponentTestComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ DisableComponentTestComponent, DisableComponentDirective ],
                imports: [ FormsModule, ReactiveFormsModule ]
            });
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisableComponentTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('component created', () => {
            expect(component).toBeDefined();
        });


        it('input element should be disabled per default', () => {
            expect(component.isDisabled).toEqual(true);
        });
    });
});

/**
 * host component for testing only
 */
@Component({
    template: `
        <div>
            <input #inputElement [formControl]="formControl" [disableComponent]="isDisabled">
        </div>`,
    encapsulation: ViewEncapsulation.None
})
class DisableComponentTestComponent {

    @ViewChild('inputElement')
    public inputElement: ElementRef;

    public isDisabled: boolean = true;

    public formControl: FormControl = new FormControl({value: '', disabled: true});

    constructor() {

    }
}
