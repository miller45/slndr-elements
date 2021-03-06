# slndr-elements

A small collection of minimalistic/slender angular pipes, directives and services

## Installation

The library is published as a package of  [NPMJS weirdwizard account](https://www.npmjs.com/~weirdwizard)

```
npm install slndr-elements
```


If your app is not already using the packages listed below as peer dependencies please install them to your application.

### Peer Dependencies

Besides, the default angular dependencies this module requires following packages as peer dependencies:

- [lodash-es](https://www.npmjs.com/package/lodash-es)

## Pipes and Directives

### markdownLink pipe

Converts a markdown link e.g. `[I'm an inline-style link with title](https://www.google.com "Google's Homepage")`
into real a href link. It can be used to "allow" links in plain text input elements like html textareas.

#### Usage
 ```html
 <div>{{result?.value|markdownLink}}</div>
 or if you want to open in it place (instead of new popup)
 <div>{{result?.value|markdownLink,true}}</div>
 ```

### ifNil pipe

If the value is null/undefined display an alternative text

#### Usage
```html
 <div>{{result?.value|ifNil:'--'}}</div>
 ```
If an empty string or empty collection should also show the alternative text then add `true` as last parameter
 ```html
 <div>{{result?.value|ifNil:'--':true}}</div>
 ```

### wrapIfNotEmpty pipe

If the value is not null/undefined/empty than wrap it with a prefix or postfix something 

#### Usage
 ```html
 <div>{{result?.value|wrapIfNotEmpty:'[',']' }}</div>
 ```
Above would should e.g. [yourtext] if result?.value is not empty. If the value is null/undefined or empty *nothing* would be shown.

If also an empty value should be wrapped, add a last parameter with `false`. There is still no wrapping for null/undefined of course.
 ```html
 <div>{{result?.value|wrapIfNotEmpty:'[',']':false }}</div>
 ```
 Above would should e.g. [yourtext] if not null and *nothing* if null 
 
### disableControl directive 

This directive can be used to add the functionality to disabling form controls when working with reactive forms in angular.

With the default [disable] tag, you get the message: 
It looks like you???re using the disabled attribute with a reactive form directive.

If you set disabled to true in the control in your component class,
the disabled attribute will actually be set in the DOM for you.
We recommend using this approach to avoid ???changed after checked??? errors.

This can be used if you don't want to disable/enable the control
in code like formControl.disable() or formControl.enable() or new FormControl({value: '', disabled: true})

#### Usage
```html
<input matInput formControlName="coolName" [disableControl]="isDisabled">
```

### disableComponent directive

This is the same as disableControl directive but this does not work with material controls (TODO: talk to developer if that was the real reason)

#### Usage
```html
<input matInput formControlName="coolName" [disableComponent]="isDisabled">
```

## Services

### BrowserLocationService

A service to access the browsers window.location object. It is very handy if you want to write unit tests.
The interface is like https://developer.mozilla.org/en-US/docs/Web/API/Location
