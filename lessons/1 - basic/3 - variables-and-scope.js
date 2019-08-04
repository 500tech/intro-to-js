// The three ways to declare variables
var firstVar = 'let';
const firstConst = 'it';
let firstLet = `${firstVar} ${firstConst} be`;

console.log(firstLet);

// Hoisting

foo(); // what will be printed here
var foo;
function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
};

// We can override function declarations
function foo() {
  console.log(3);
}

//Scopes

var globalVariable = 'i am a global variable';

// Global Scope
function someFunction() {
	// Local Scope #1
	console.log(globalVariable);
	const hey = 'hey! ';
	function someOtherFunction() {
		// Local Scope #2
		console.log(hey);
		console.log(globalVariable);
	}
}

// The simplest way to create a block scope is with curly braces
{
	// local scope
  const scopedConst = 'i have block scope: const';
  let scopedLet = 'i also have block scope: let';
  console.log({ globalVariable, scopedConst, scopedLet });
}

try {
  console.log(scopedLet);
} catch (e) {
  console.log(e.name);
}

