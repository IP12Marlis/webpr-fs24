/**
 * @module mod/modTest Testing how the module system works
 */

import { pi, a, b, setA, setB } from './mod.js'  // <- note the URL format !
import { report }               from '../util/test.js'

( () => {
    const ok = [];

    ok.push(a === null);
    ok.push(b === null);

    setA("Dierk"); // there is no object exposed and so no target to attack
    setB("König");

    ok.push(a === "Dierk");
    ok.push(b === "König");

    // console.log(x); // newly introduced global x should not be visible but when using bundlers, it is

    // Hier ist der Test, ob die von anderem Ort importierten Variablen wirklich read only machen
    // Will man Veränderung zulassen, muss man explizit Funktionen coden -> setter
    // Das hier ist so falsch, dass es nicht durch die Kontrollen des bundler kommt - es ist nicht ausführbar.
    // this kind of test does not work with the bundler as it checks the erroneous assignment
    // try {
    //     a = "shall not work";   // this is expected to fail ...
    //     ok.push(false);         // ... therefore this line is not reached ...
    // } catch (e) {
    //     ok.push(true);          // ... but this one
    // }

    report("mod-singleton", ok);
}) ();



