# slndr-elements

A small collection of minimal angular pipes and directives

## Installation

The library is published as a package of  [NPMJS weirdwizard account](https://www.npmjs.com/~weirdwizard)

```
npm install slndr-elements
```


If your app is not already using the packages listed below as peer dependencies please install them to your application.

### Peer Dependencies

Besides, the default angular dependencies this module requires following packages as peer dependencies:

- [lodash-es](https://www.npmjs.com/package/lodash-es)
## markdownLink pipe

Converts a markdown link e.g. `[I'm an inline-style link with title](https://www.google.com "Google's Homepage")`
into real a href link. It can be used to "allow" links in plain text input elements like html textareas.

## Usage

* Usage Demo:
 ```html
 <div>{{result?.value|markdownLink}}</div>
 or if you want to open in it place (instead of new popup)
 <div>{{result?.value|markdownLink,true}}</div>
 ```
