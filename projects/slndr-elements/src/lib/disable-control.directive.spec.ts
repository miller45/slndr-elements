import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './disable-control.directive';

describe('lib', () => {
    describe('DisableControlDirective', () => {

        let component: DisableControlTestComponent;
        let fixture: ComponentFixture<DisableControlTestComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ DisableControlTestComponent, DisableControlDirective ],
                imports: [ FormsModule, ReactiveFormsModule ]
            });
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisableControlTestComponent);
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
            <input #inputElement [formControl]="formControl" [disableControl]="isDisabled">
        </div>`,
    encapsulation: ViewEncapsulation.None
})
class DisableControlTestComponent {

    @ViewChild('inputElement')
    public inputElement: ElementRef;

    public isDisabled = true;

    public formControl: FormControl = new FormControl({value: '', disabled: true});

    constructor() {

    }
}
