import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNumber } from 'lodash-es';

/**
 * If the value is not null/undefined/empty than wrap it with something
 * Usage Demo:
 ```html
 <div>{{result?.value|wrapIfNotEmpty:'[',']' }}</div>
 <!--  would should e.g. [yourtext] if not empty and *nothing* if empty -->
 ```
 * If also an empty value should trigger wrapping add a last parameter with false. There is still no wrapping for null/undefined false
 * Usage Demo:
 ```html
 <div>{{result?.value|wrapIfNotEmpty:'[',']':false }}</div>
 <!--  would should e.g. [yourtext] if not null and *nothing* if null -->
 ```
 */
@Pipe({
    name: 'wrapIfNotEmpty'
})
@Injectable()
export class WrapIfNotEmptyPipe implements PipeTransform {
    transform(value: any, preFix: string, postFix: string = null, emptyAlso: boolean = true): string {
        if (value == null) {
            return '';
        }
        if (emptyAlso && !isNumber(value) && isEmpty(value)) {
            return '';
        }
        if (preFix != null && postFix != null) {
            return `${preFix}${value}${postFix}`;
        }
        if (preFix != null) {
            return `${preFix}${value}`;
        }
        return `${value}${postFix}`;
    }
}
