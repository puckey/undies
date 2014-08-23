Undies
======

A simple undo / redo history module for Javascript.

Based on the [Undo](https://github.com/memononen/stylii/blob/master/js/editor.js#L2) prototype in [Mikko Mononen](https://github.com/memononen/)'s [Stylii](https://github.com/memononen/stylii/)

Copyright (c) 2014 Moniker
http://studiomoniker.com

## Installing Undies

The recommended way to install Undies is through Bower for browsers, and through NPM for Node.js:

    npm install undies

With Bower installed, simply type this command in your project folder:

    bower install undies

Upon execution, you will find a `undies` folder inside the project's `bower_components` folder.

## Example

```javascript
// Your state:
var text = '';
var number;

var undies = new Undies({
    // The maximum amount of undos:
    maxUndos: 8,

    // Called whenever a snapshot is made in order to serialize your data:
    serialize: function() {
        // Serialize the state:
        return {
            number: number,
            text: '' + text
        };
    },

    // Whenever undies.undo() or undies.redo() is called,
    // the restore function is called with the restored
    // data:
    restore: function(data) {
        // Restore the state:
        text = '' + data.text;
        number = data.number;
    }
});

console.log('Adding a to text and changing number to 1');
text += 'a';
number = 1;
undies.snapshot();

console.log('Adding b to text and changing number to 3');
text += 'b';
number = 3;
undies.snapshot();

console.log('Adding c to text and changing number to 5');
text += 'c';
number = 5;
undies.snapshot();

console.log('Text now contains:', text); // abc
console.log('Number now contains:', number); // 5

console.log('Undo once');
undies.undo();

console.log('Text now contains:', text); // ab
console.log('Number now contains:', number); // 3

console.log('Undo once');
undies.undo();

console.log('Text now contains:', text); // a
console.log('Number now contains:', number); // 1

console.log('Redo once');
undies.redo();

console.log('Text now contains:', text); // ab
console.log('Number now contains:', number); // 3

```

Distributed under the MIT license.
