
import { Injectable, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isString } from 'lodash-es';

/**
 * Converts a markdown link  e.g. [I'm an inline-style link with title](https://www.google.com "Google's Homepage")
 * Usage Demo:
 ```html
 <div>{{result?.value|markdownLink}}</div>
 or if you want to open in it place (instead of new popup)
 <div>{{result?.value|markdownLink,true}}</div>
 ```
 */
@Pipe({
  name: 'markdownLink'
})
@Injectable()
export class MarkdownLinkPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }

  transform(value: any, openInPlace: boolean = false): string | SafeHtml {
    if (value == null) {
      return '';
    }
    if (isString(value)) {
      if (value.indexOf('[') > -1) { // quick check if anything has to be down
        if (this.hasNestedBrackets(value)) {
          // we don not want to crash the application but return a static message that indicates cleary there is problem
          return 'ERROR: Unsecure content: The markdown has nested brackets';
        }
        if (openInPlace) {
          value = value.replace(/(?:\[([^\[]*?)\])\((.*?)\)/g, `<a href="$2">$1</a>`);
        } else {
          value = value.replace(/(?:\[([^\[]*?)\])\((.*?)\)/g, `<a href="$2" rel="noreferrer" target="_blank">$1</a>`);
        }
        return this.domSanitizer.sanitize(SecurityContext.HTML, value);
      }
    }
    return value;
  }

  private hasNestedBrackets(markDown: string) {
    if (markDown == null || markDown.length === 0) {
      return false;
    }
    let openBrackets = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < markDown.length; i++) {
      if (markDown[i] === '(') {
        openBrackets++;
      } else if (markDown[i] === ')') {
        openBrackets--;
      }
      if (openBrackets > 1) { // as soon as we find a scenario with two opening brackets the condition is met
        return true;
      }
    }
    return false;
  }

}
