# jQuery UI alert/confirm/prompt

Provides fully customizable jQuery UI-styled alert, confirm, and prompt dialogs. Requires jQuery and jQuery UI, with at least the dialog module.

Test it out at http://scimonster.github.io/jquery-ui-alert/testcases.html

## Links
* [jQuery](http://jquery.com)
* [jQuery UI](http://jqueryui.com)
* [jQuery UI `dialog` reference](http://api.jqueryui.com/dialog/)

## Usage
This plugin exposes the `jqUI` object to the global scope. It contains 3 methods: alert, confirm, and prompt.

Each of these methods creates a jQuery UI dialog, and returns a reference to the dialog, for additional scripting.

### `alert`
The `jqUI.alert()` function takes one or two arguments.
The first argument must be a string or object. If it's a string, it refers to the content of the alert dialog. The title is given as "Alert Message", and the button label as "OK". If it's an object, it accepts all of the same properties as the native jQuery UI dialog method, with the exception of `buttons` and `close`, which are set by `jqUI`. `jqUI` also looks for 3 additional properties: `text` (string, required), `title` (string, defaults to "Alert Message"), and `buttonLabel` (string, defaults to "OK").
The second argument is the callback function that gets executed when the dialog is closed. It is passed 1 argument, the jQuery UI `event` object.

### `confirm`
The `jqUI.confirm()` function takes one or two arguments.
The first argument must be a string or object. If it's a string, it refers to the content of the confirm dialog. The title is given as "Confirm", and the button labels as "OK" and "Cancel". If it's an object, it accepts all of the same properties as the native jQuery UI dialog method, with the exception of `buttons` and `close`, which are set by `jqUI`. `jqUI` also looks for 3 additional properties: `text` (string, required), `title` (string, defaults to "Confirm"), and `buttonLabel` (array of 2 strings, defaults to `["OK","Cancel"]`).
The second argument is the callback function that gets executed when the dialog is closed. It is passed 2 arguments: the return value as a boolean, and the jQuery UI `event` object.

### `prompt`
The `jqUI.prompt()` function takes one, two, or three arguments.
The first argument must be a string or object. If it's a string, it refers to the content of the prompt dialog. The title is given as "Prompt", and the button labels as "OK" and "Cancel". If it's an object, it accepts all of the same properties as the native jQuery UI dialog method, with the exception of `buttons` and `close`, which are set by `jqUI`. `jqUI` also looks for 4 additional properties: `text` (string, required), `title` (string, defaults to "Prompt"), `buttonLabel` (array of 2 strings, defaults to `["OK","Cancel"]`, or string for the first button label (the second defaults to "Cancel")), and `value` (string, value to be used as a default, see below).
The optional second argument must be a string. It is used as the default value in the text insert. It can also be set from the `value` property in the first argument, if passing an object.
The last argument is the callback function that gets executed when the dialog is closed. It is passed 2 arguments: the return value (is `null` if cancel is clicked), and the jQuery UI `event` object.

## Examples
Here are some simple examples for each of the methods.

### `alert`
Basic alert dialog:

```javascript
jqUI.alert("I'm a jqUI alert dialog!");
```

Alert dialog with a title:

```javascript
jqUI.alert({text:"I'm a jqUI alert dialog!",title:"This is a title"});
```

Basic alert dialog with a callback:

```javascript
jqUI.alert("I'm a jqUI alert dialog!",function(){console.log("jqUI alert dialog closed")});
```

Alert dialog with a title and callback:

```javascript
jqUI.alert({text:"I'm a jqUI alert dialog!",title:"This is a title"},function(){console.log("jqUI alert dialog closed")});
```

Alert dialog with a title, custom button label, and callback:

```javascript
jqUI.alert({text:"I'm a jqUI alert dialog!",title:"I'm hungry",buttonLabel:"pizza"},function(){console.log("What kind of answer is pizza?")});
```

### `confirm`

Basic confirm dialog with a callback:

```javascript
jqUI.confirm("I'm a jqUI confirm dialog!",function(yes){console.log("You pressed "+yes?"OK":"Cancel")});
```

Confirm dialog with a title and callback:

```javascript
jqUI.confirm({text:"I'm a jqUI confirm dialog!",title:"This is a title"},function(yes){console.log("You pressed "+yes?"OK":"Cancel")});
```

Confirm dialog with a title, custom button label, and callback:

```javascript
jqUI.confirm({text:"True or false: jqUI is cool.",title:"This is a title",buttonLabel:["true","false"]},function(true_or_false){console.log("Your answer is "+true_or_false)});
```

### `prompt`

Basic prompt dialog with a callback:

```javascript
jqUI.prompt("Please type your name.",function(name){jqUI.alert("Hello "+name)});
```

Prompt dialog with a title and callback:

```javascript
jqUI.prompt({text:"Please type your name.",title:"Have we met before?..."},function(name){jqUI.alert("Hello "+name)});
```

Prompt dialog with a title, custom button label, and callback:

```javascript
jqUI.prompt({text:"Please type your name.",title:"Have we met before?...",buttonLabel:["Nice to meet you","I like to keep my personal information private"]},function(name){jqUI.alert("Hello "+name)});
```

Prompt dialog with a default value and callback:

```javascript
jqUI.prompt("What's your favorite source-sharing site?","GitHub",function(site){
	if (site=="GitHub") jqUI.alert("I like GitHub too.")
	else if (site=="SourceForge") jqUI.alert("I'm starting to move away from SourceForge...")
	else jqUI.alert("I've never heard of that one.")
});
```

Prompt dialog with a title, default, and callback:

```javascript
jqUI.prompt({text:"What's your favorite source-sharing site?",title:"Open source FTW!"},"GitHub",function(site){
	if (site==null) jqUI.alert("What, you like proprietary?")
	else if (site=="GitHub") jqUI.alert("I like GitHub too.")
	else if (site=="SourceForge") jqUI.alert("I'm starting to move away from SourceForge...")
	else jqUI.alert("I've never heard of that one.")
});
```

The same example above, but set using `{value:"default"}`:

```javascript
jqUI.prompt({text:"What's your favorite source-sharing site?",title:"Open source FTW!",value:"GitHub"},function(site){
	if (site==null) jqUI.alert("What, you like proprietary?")
	else if (site=="GitHub") jqUI.alert("I like GitHub too.")
	else if (site=="SourceForge") jqUI.alert("I'm starting to move away from SourceForge...")
	else jqUI.alert("I've never heard of that one.")
});
```

Prompt dialog with a default value and no callback (useful for getting a user to copy something) (currently buggy):

```javascript
jqUI.prompt("Copy this code:","0a6e846b954e345951e710cd6ce3440e"); // MD5 of jquery-2.0.3.min.js
```
