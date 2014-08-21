Undies
======

A simple undo / redo history module for Javascript.

Based on the [Undo](https://github.com/memononen/stylii/blob/master/js/editor.js#L2) prototype in [Mikko Mononen](https://github.com/memononen/)'s [Stylii](https://github.com/memononen/stylii/)

Copyright (c) 2014 Moniker
http://studiomoniker.com

## Example

```javascript
// Your data:
var text = '';

var undies = new Undies({
    // The maximum amount of undos:
    maxUndos: 8,

    // Called whenever a snapshot is made in order to serialize your data:
    serialize: function() {
        // Clone the current state of the text string:
        return '' + text;
    },

    // Whenever undies.undo() or undies.redo() is called,
    // the restore function is called with the restored
    // data:
    restore: function(data) {
        // Unserialize the data from the undo history and replace
        // your your original data with it:
        text = data;
    }
});

console.log('Adding a to text');
text += 'a';
undies.snapshot('added A');

console.log('Adding b to text');
text += 'b';
undies.snapshot('added B');

console.log('Adding c to text');
text += 'c';
undies.snapshot('added C');

console.log('Text now contains:', text);

console.log('Undo once');
undies.undo();

console.log('Text now contains:', text); // ab

console.log('Undo once');
undies.undo();

console.log('Text now contains:', text); // a

console.log('Redo once');
undies.redo();

console.log('Text now contains:', text); // ab

```

Distributed under the MIT license.
