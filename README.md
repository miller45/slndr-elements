# slndr-elements

A small collection of minimal/slender angular pipes and directives

## Installation

The library is published as a package of  [NPMJS weirdwizard account](https://www.npmjs.com/~weirdwizard)

```
npm install slndr-elements
```


If your app is not already using the packages listed below as peer dependencies please install them to your application.

### Peer Dependencies

Besides, the default angular dependencies this module requires following packages as peer dependencies:

- [lodash-es](https://www.npmjs.com/package/lodash-es)

## pipes and directives

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
 

