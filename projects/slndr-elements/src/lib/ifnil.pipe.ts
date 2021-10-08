import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash-es';

/**
 * If the value is null/undefined just display an alternative text
 * Usage Demo:
 ```html
 <div>{{result?.value|ifNil:'--'}}</div>
 ```
 * If any empty string or empty collection should also show the alternative text then add true as last parameter
 * Usage Demo:
 ```html
 <div>{{result?.value|ifNil:'--':true}}</div>
 ```
 */
@Pipe({
    name: 'ifNil'
})
@Injectable()
export class IfnilPipe implements PipeTransform {
    transform(value: any, nilText: string, emptyAlso: boolean = false): any {
        if (value == null) {
            return nilText;
        }
        if (emptyAlso && isEmpty(value)) {
            return nilText;
        }
        return value;
    }
}
