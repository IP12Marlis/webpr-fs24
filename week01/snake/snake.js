// mit dx, dy wird angegeben, wie gross das Delta-x, Delta-y je Richtung ist.
// Somit ist auch die Richtung klar.
const north = {dx:  0, dy: -1};
const east  = {dx:  1, dy:  0};
const south = {dx:  0, dy:  1};
const west  = {dx: -1, dy:  0};

// zu Beginn des Spiels gesetzte Richtung der Snake -> Kopf gegen den oberen Spielflächenrand zeigend.
let direction = north;

// Das wird beim Richtungswechsel durch die Pfeiltasten genutzt.
// rechte Pfeiltaste löst 'clockwise' aus und die hier gespeicherte Reihenfolge bestimmt, wohin die Snake abbiegt.
const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

// Die Snake belegt zu Beginn des Games diese vier Felder. Die Schlage ist als Array initialisiert.
const snake = [
    {x: 10, y: 5},
    {x: 10, y: 6},
    {x: 10, y: 7},
    {x: 10, y: 8},
];
let food = {x: 15, y: 15};

// a ist food; b ist head
// Trifft die Snake mit dem head auf Food,
// muss die Snake ein Element wachsen und muss der Food verschwinden und
// Das Food-Element wird zu einem Körperelement der Snake
function snakeEquals(a, b) { return a.x === b.x && a.y === b.y }

function changeDirection(orientation) {
    const idx = orientation.indexOf(direction); // wenn 'north', dann dx: 0, dy: -1
    direction = orientation[idx + 1]
}

// alles zusammenbauen:
// canvas aus dem HTML erfassen
// canvas zum Context (Spielfeld) des Spiels machen; das macht das Spielfeld einzigartig.
// Es gibt nur dieses Element, das so benannt ist und es bleibt immer dasselbe.
function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // Die keys zur links/rechts Steuerung werden bestimmt; orientation ordnet dem Keyevent
    // zu, ob Snake im Uhrzeigersinn oder im Gegenuhrzeigersinn abbiegt.
    // Info zu keycode: für Buchstaben kann ich die HTML-Codierung aus der Ascii-Tabelle verwenden.
    // keyCode soll nicht mehr eingesetzt werden, nach MDN wäre key besser -> zweite Variante unten
    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

function nextBoard() {
    const maxX = 20;
    const maxY = 20;

    // Element 0 der Snake ist ihr Kopf. Die Bewegung wird erzeugt, indem ihr Kopf zu
    // einem Zeitpunkt vom Spielfeld als "alterKopf" Stand gespeichert wird, damit
    // das Head-Objekt sich aus dieser Position die neue Position für den nächsten Zeitpunkt
    // des Spielfelds berechnen kann.
    const oldHead = snake[0];

    // Wenn Snake links oder rechts den Spielfeldrand überkriecht, wird sie auf der
    // gegenüberliegenden Seite wieder ins Spielfeld kommen.
    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    // hier wird der neue Kopf berechnet.
    const head = {
        x: inBounds(oldHead.x + direction.dx, maxX),
        y: inBounds(oldHead.y + direction.dy, maxY)
    };

    if (snakeEquals(food, head)) {  // have we found any food?
        food.x = Math.floor(Math.random() * 20);   // place new food at random location
        food.y = Math.floor(Math.random() * 20);
    } else {
        snake.pop(); // no food found => no growth despite new head => remove last element
    }

    snake.unshift(head) // put head at front of the list
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(element.x * 20 + 1, element.y * 20 + 1, 18, 18);
}


