let displayDiv = document.getElementById("display");
let newGameBtn = document.getElementById("newGame");
let gameOver = false;
winner = "";

let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");
let box4 = document.getElementById("box4");
let box5 = document.getElementById("box5");
let box6 = document.getElementById("box6");
let box7 = document.getElementById("box7");
let box8 = document.getElementById("box8");
let box9 = document.getElementById("box9");
let boxes = Array.from(document.getElementsByClassName('box'));

// Werden undefined, im Gegensatz zu var otherArray = [null, null, null]; als Beispiel
let numberArray = new Array(9);

let charArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
let counter = 0;

box1.addEventListener("click", function(){ playersTurn(0);});
box2.addEventListener("click", function(){ playersTurn(1);});
box3.addEventListener("click", function(){ playersTurn(2);});
box4.addEventListener("click", function(){ playersTurn(3);});
box5.addEventListener("click", function(){ playersTurn(4);});
box6.addEventListener("click", function(){ playersTurn(5);});
box7.addEventListener("click", function(){ playersTurn(6);});
box8.addEventListener("click", function(){ playersTurn(7);});
box9.addEventListener("click", function(){ playersTurn(8);});
newGameBtn.addEventListener("click", newGame);

pointerEventsNone();

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function newGame() {
    counter = 0;
    numberArray = new Array(9);
    charArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    for (let i = 0; i < 9; i++) {
        boxes[i].innerHTML = "";
    }
    computersTurn();
}

function playersTurn(number) {
        pointerEventsNone();
        let breakPlayersTurn = true;

        for (let i = 0; i < numberArray.length; i++) {
            if (numberArray[i] == number){
                alert("Dieses Feld ist schon belegt. Versuche es erneut!");
                pointerEventsAuto();
                breakPlayersTurn = false;
            }
        }

        if (breakPlayersTurn == true) {

            for (let i = 0; i < numberArray.length; i++) {
                if (numberArray[i] == null){
                    numberArray[i] = number;
                    break;
                }
            }

            inertSign(number, 'O');
            winnerOutput();

            if (winner != "pc" && winner != "user"){
                computersTurn();
            }

        }
}

function computersTurn() {
    pointerEventsNone()
    displayDiv.innerHTML = "Der Computer ist am Zug";
    delay(function (){
        let breakVariabel = true;
        let randomNumber;

        firstLoop:
            while (breakVariabel) {

                randomNumber = Math.floor(Math.random() * 8) + 1; // generates random number from 1 to 9
                secondLoop:
                    for (let element of numberArray) {
                        if (element == randomNumber){
                            continue firstLoop;
                        }
                    }

                for (let i = 0; i < numberArray.length; i++) {
                    if (numberArray[i] == null){
                        numberArray[i] = randomNumber;
                        break;
                    }
                }
                breakVariabel = false;
            }

        inertSign(randomNumber, 'X');
        winnerOutput();

    }, 1500);
}

function inertSign(number, char) {
    counter++;
    //console.log(counter);
    fillCharArray(number, char);
    checkForWinner();

    //console.log(numberArray);
    if (char == 'X'){
        switch (number) {
            case 0: box1.innerHTML = "X";
                break;
            case 1: box2.innerHTML = "X";
                break;
            case 2: box3.innerHTML = "X";
                break;
            case 3: box4.innerHTML = "X";
                break;
            case 4: box5.innerHTML = "X";
                break;
            case 5: box6.innerHTML = "X";
                break;
            case 6: box7.innerHTML = "X";
                break;
            case 7: box8.innerHTML = "X";
                break;
            case 8: box9.innerHTML = "X";
                break;
        }
    }
    else if (char == 'O') {
        switch (number) {
            case 0: box1.innerHTML = "O";
                break;
            case 1: box2.innerHTML = "O";
                break;
            case 2: box3.innerHTML = "O";
                break;
            case 3: box4.innerHTML = "O";
                break;
            case 4: box5.innerHTML = "O";
                break;
            case 5: box6.innerHTML = "O";
                break;
            case 6: box7.innerHTML = "O";
                break;
            case 7: box8.innerHTML = "O";
                break;
            case 8: box9.innerHTML = "O";
                break;
        }
    }

    if (counter == 8) {
        gameOver = true;
    }
    pointerEventsAuto();
}

function fillCharArray(number, char) {

    const map1 = new Map();
    map1.set(0, [0,0]);
    map1.set(1, [0,1]);
    map1.set(2, [0,2]);
    map1.set(3, [1,0]);
    map1.set(4, [1,1]);
    map1.set(5, [1,2]);
    map1.set(6, [2,0]);
    map1.set(7, [2,1]);
    map1.set(8, [2,2]);

    arr = map1.get(number)

    //console.log(arr);
    //console.log(char);
    for (let i = 0; i < charArray.length; i++) {
        for (let x = 0; x < charArray[i].length; x++) {
            if (arr[0] == i && arr[1] == x) {
                charArray[i][x] = char;
            }
        }
    }
    //console.log(charArray);
}

function winnerOutput() {

    if (winner != ""){
        displayDiv.innerHTML = winner + " hat gewonnen";
    }
    else if (winner == "user") {
        displayDiv.innerHTML = "Der User hat gewonnen!"
    }
    else if (winner == "pc") {
        displayDiv.innerHTML = "Der PC hat gewonnen!"
    }
    else if (gameOver == true) {
        displayDiv.innerHTML = "GAME OVER!";
    }
    else {
        displayDiv.innerHTML = "Du bist ist am Zug";
    }
}

function pointerEventsNone(){
    boxes.forEach(box => {
        box.style.pointerEvents = "none";
    });
}

function pointerEventsAuto(){
    boxes.forEach(box => {
        box.style.pointerEvents = "auto";
    });
}

function checkForWinner() {
    let winStringComputerX = "";
    let winStringUserO = "";
    let mapString = "";

    const map1 = new Map();
    map1.set("00", 0);
    map1.set("01", 1);
    map1.set("02", 2);
    map1.set("10", 3);
    map1.set("11", 4);
    map1.set("12", 5);
    map1.set("20", 6);
    map1.set("21", 7);
    map1.set("22", 8);

    for (let i = 0; i < charArray.length; i++) {
        for (let x = 0; x < charArray[i].length; x++) {
            if (charArray[i][x] == "O") {
                mapString = i.toString() + x.toString();
                //console.log(mapString);
                winStringUserO += map1.get(mapString);
                //console.log("winStringUserO" + " " + winStringUserO);
            }
            else if (charArray[i][x] == "X") {
                mapString = i.toString() + x.toString();
                //console.log(mapString);
                winStringComputerX += map1.get(mapString);
                //console.log("winStringComputerX" + " "  +winStringComputerX);
            }
        }
    }

    //Prüft entgültig immer wieder, ob jemand gewonnen hat mit seinem WinnerString (also der Zahlenkombination, welche eine volle Reihe je Symbol ergibt)
    if (checkStringForWinner(winStringComputerX)){
        console.log("computer won");
        winner = "pc";

    }
    else if (checkStringForWinner(winStringUserO)){
        console.log("user won");
        displayDiv.innerHTML = "Der User hat gewonnen!";
        winner = "user";
    }

}

function checkStringForWinner(winnerString) {
    //console.log("Winner String: " + winnerString)
    let winStrings = ["012", "345", "678", "036", "147", "258", "048", "246"];
    let won = false;

    checkString = "";
    winCounter= 0; // 3 is win
    for (let i = 0; i < winStrings.length; i++) {
        console.log(winStrings[i]);
        console.log("WinnerString: " + winnerString);
        winCounter = 0;
        for (let x = 0; x < winnerString.length; x++) { //23456 winnerstring prüfen ob zahlenkombi in winString[i] 345 vorkommt, geht jeden winnerstring buchstaben durch
            for (let y = 0; y < winStrings[i].length; y++) { // geht winString 345 je durch
                if (winnerString.charAt(x) == winStrings[i].charAt(y)){
                    winCounter++;
                    //console.log("Counter erhöht " + winCounter);
                    if (winCounter == 3) {
                        won = true;
                    }
                }
            }
        }
    }

    return won;
}
