/**
 * @module mod/mod The mod module as an example for ES6 modules
 */

// put import and exports at the top

export { pi, a, b, setA, setB }

const pi = Math.PI;

// use module as a singleton

// make a single state that is only exposed as values, not references to objects

let a = null; // these variables are exported as read-only
let a = null; // these variables are exported as read-only, man kann sie nur hier drin verändern
let b = null;


// hier wird mit Absicht (nicht aus Versehen) ermöglicht, auf die Variablen a und b verändernd zuzugreifen.
const setA = v => a = v;
const setB = v => b = v;

// x = 2 // introduction of new globals is not allowed in modules
// bundlers accept it, though, and produce code without the restriction.
