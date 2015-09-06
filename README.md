# GimmeJS

GimmeJS is a tiny JavaScript package that lets you get some information about your object, strings etc. For example, if you give it a function, you can ask for the number of code lines of that particular function. Here's an example:

```js
function myFunction() {
	var a = true;
}
var lineCount = gimme(myFunction).lineCount();
console.log(lineCount); // 3
```

The type of information available depends on the type of the object. Since this project is taking its baby steps, the features it offers are currently rather limited. However, GimmeJS provides an easy way to extend its features with the `extend()`method to do all kinds of stuff.

## Examples
###### Getting the name of a function
```js
function myFunction() {
	var a = true;
}
var name = gimme(myFunction).name();
console.log(name); // 'myFunction'
```

###### Difference in days of two dates
```js
var firstDate = new Date(2015, 3, 5),
	secondDate = new Date(2014, 12, 12),
	diff;

diff = gimme(firstDate).difference(secondDate, 'd');
console.log(diff); // 83
```

###### Getting the type of an argument
```js
var type = gimme(1).type;
console.log(type); // 'number'
```

###### Adding a new feature (extending)
```js
gimme.extend('number', {
	times: function(val) {
		return this.entity * val;
	}
});

// lets try it out
var result = gimme(5).times(6);
console.log(result); // 30
```

## Requirements
GimmeJS requires an environment with ES5 support, so < IE 9 are not supported. You can use it in the browser (with Browserify etc.) and in Node, but RequireJS and other AMD implementations are currently not supported.

## Installation and usage
To use GimmeJS, you only need the `gimme.js` or `gimme.min.js` located in the `lib` directory. You can then reference the file from an HTML file or by using CommonJS. *AMD is currently not supported.*

## Documentation
The global function `gimme()` returns an object with a different set of methods depending on what was passed to the function as an argument. For example, it might be useful to know what type of methods an object has - not so useful for strings.

Each returned object has, by default, two properties: `entity`and `type`. `entity` points to the argument itself passed to `gimme()` and `type`tells the type of the argument. These two are useful especially when adding new functionality, but you can use `type`to check the type of a variable.

### Adding new features
You can extend GimmeJS by calling `gimme.extend()` with two arguments: a list of types as a string separated by commas or/and spaces, and an object with the methods to be added for the listed types. See an example above. 

### API Reference
#### gimme([anything])
Pass `gimme()` anything you want and it will return an object with selected methods based on the type of the argument. Additionally, the object returned will have the properties `entity`and `type`.

#### gimme([anything]).entity
References to the argument passed to `gimme()`. For example, `entity` in `gimme({}).entity` refers to the empty object itself. This is useful when adding new functionality.

#### gimme([anything]).type
Returns the type of the object passed to `gimme()`. Note that in addition to the 6 standard types in JavaScript, this differentiates functions, arrays, Date objects and RegEx objects from the plain object type.

The type is a lowercased string and one of the following: `'array'`, `'boolean'`, `'date'`, `'function'`, `'number'`, `'null'`, `'object'`, `'regexp'`, `'string'`, `'undefined'`.

#### gimme([array]).elementTypes(unique)
If `unique` is false, returns an array containing the type of each element in the array. If `unique` is true, returns an array containing the types of elements only once. `unique` is false by default.

Examples: 
`gimme(['a', 2, 'b']).elementTypes()` returns `['string', 'number', 'string']`

`gimme(['a', 2, 'b']).elementTypes(true)` returns `['string', 'number']`

#### gimme([array|string]).length()
Returns the length of an array or a string. This is exactly the same as using the `length`property of the array/string directly. This is included only for completeness/convenience.

#### gimme([date]).difference([date], accuracy)
Returns the difference of the two Date objects as a rounded down integer either in milliseconds, seconds, minutes, hours or days depending on `accuracy`. It returns the difference in milliseconds by default. `accuracy` is a string and one of the following: `'ms'`, `'s'`, `'m'`, `'h'`, `'d'`.

Dates are automatically being converted to UTC dates, so daylight saving times are ignored.

#### gimme([function]).name()
Returns the name of the function as a string.

#### gimme([function]).lineCount()
Returns the number of lines of code (loc) of the function.

#### gimme([object]).members()
#### gimme([object]).properties()
#### gimme([object]).methods()
#### gimme([object]).ownMembers()
#### gimme([object]).ownProperties()
#### gimme([object]).ownMethods()
Method `.members()`returns the all properties (including methods) of the object and objects in its prototype chain in an array. `.properties()` and `.methods()`work in a similar fashion, but `.methods()` returns only methods and `.properties()` properties that are not methods.

Methods starting with 'own' return members, properties and methods of the object without traversing the prototype chain.


#### gimme.extend(types, methods)
You can add features by using the `extend()` method. Let GimmeJS know what types you want to extend by giving the type names as a string separated by commas/spaces, and pass the methods object as the second argument.

Here's an example:

```js
gimme.extend('number', {
	times: function(val) {
		return this.entity * val;
	}
});

var result = gimme(5).times(6);
console.log(result); // 30
```

In the example above, we define a new method `times()`for numbers. So when you pass `gimme()` a number, `times()` will be available.

Inside the methods you define, you can reference to the original value passed to `gimme()` with `this.entity`and get the type of the value with `this.type`.

The list of types you want to extend must be a string. The order of the types does not matter. If you want to extend both numbers and strings, all the following strings are valid: `'number string'`, `'number,string`, `'number, string'`. If you want to extend all types, use the string `'all'`.

In the previous example, it might be a good idea to do some type checking for argument `val`. You could simply use `gimme.type(val) === 'number'` to make sure it's a number.

#### gimme.type([anything])
Returns the type of the argument as a string. See `gimme([anything]).type` for further information as these two are very similar. In most cases, it doesn't matter which of these two you use, but if you need only the type of a value and not any other features, using `gimme.type()` is a tiny bit of more memory efficient.
