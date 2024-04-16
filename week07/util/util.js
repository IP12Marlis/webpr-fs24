
// todo: implement the times function


// Alles was unter Number läuft, hat eine neue Funktion bekommen -> z.B. integer hat 2^143 Werte
Number.prototype.times = function(callback) { // funktioniert nicht mit Number, sondern nur mit dem function keyword (video 2 - gegen Ende)
    const result = [];
    for(let i=0; i<this; i++) { result.push(callback(i)) }
    return result;
};
