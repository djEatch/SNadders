let board= []
let boardCols = 10
let boardRows = 5
let squareSize = 50
let players=[];
let activePlayer;
let snadders=[];
let snadderCount = 5;


let gameOver = false;

let phase;

const setup_phase = 0
const roll_phase = 1
const preview_phase = 2
const move_phase = 3
const snadder_phase = 4
const evaluation_phase = 5
const reset_phase = 6

let playerText;
let turnCount = 0;

function setup() {

    phase = setup_phase;
    createCanvas(boardCols*squareSize,boardRows*squareSize);
    background(51);

    for(let i = 0; i < (boardCols*boardRows); i++){
        let space = new Space(i,boardCols);
        board.push(space);
    }
    
    console.log(board);

    // let snadder = new Snadder(19,5,board);
    // snadders.push(snadder);
    // snadder = new Snadder(6,20,board);
    // snadders.push(snadder);
    for (let i = 0; i<5;i++){
        calcSnadder();
    }

    let player = new Player("BooBug");
    players.push(player);
    player = new Player("PeekyPie");
    players.push(player);
    player = new Player("Duuuuuude");
    players.push(player);

    // player = new Player("E");
    // players.push(player);
    // player = new Player("F");
    // players.push(player);
    // player = new Player("G");
    // players.push(player);
    // player = new Player("H");
    // players.push(player);
    
    playerText = createDiv();
    playerText.html("Loading...",true);

    drawBoard();
    drawSnadders();
    drawPlayers();
    
    setActivePlayer()

    rollBtn = createButton('Roll');
    rollBtn.mousePressed(buttonPress);
    rollBtn.style('background-color', activePlayer.colourR,activePlayer.colourG,activePlayer.colourB)

}

function draw() {
    frameRate(5);
}




function buttonPress(){
    // activePlayer = players[turnCount%players.length]
    // playerText.html(activePlayer.name + "'s turn.");
    if(!gameOver){
        activePlayer.move(roll());
        drawBoard();
        drawSnadders();
        drawPlayers();
        turnCount++;
        if(!gameOver){
            setActivePlayer()
        }
    } else {
        reset();
    }
}

function setActivePlayer(){
    activePlayer = players[turnCount%players.length]
    playerText.html(activePlayer.name + "'s turn.");
    playerText.style('color', color(activePlayer.colourR,activePlayer.colourG,activePlayer.colourB));
}

function reset(){
    for(player of players){
        player.currentSpace = 0
    }
    gameOver = false;

    drawBoard();
    drawSnadders();
    drawPlayers();

    turnCount=0;
    setActivePlayer()
}

function roll(){
    let diceValue = floor(random(1,7));
    return diceValue;
}

function snadderClash(index){
    for(snadder of snadders){
        if(snadder.startIndex==index || snadder.endIndex==index){
            return true;
            break;
        }
    }
    return false;
}

function calcSnadder(mode){
    if (!mode){
        console.log("NO MODE");
        if(floor(random(2))==1){
            mode = "LADDER";
        } else {
            mode = "SNAKE";
        }
        console.log("Picked - " + mode);
    }

    let tryCount;
    const maxTry = 3;
    let startSet;
    let endSet;
    let myStart;
    let myEnd;

    tryCount = 0;
    startSet = false;
    while((tryCount<maxTry) && (!startSet)){
        tryCount++;
	if(mode == "LADDER"){
        myStart = floor(random(1,board.length-boardCols));
	} else {
	myStart = floor(random(boardCols,board.length-2));
	}
        if (snadderClash(myStart)==false){
            startSet=true;
        }
    }

    if(startSet){
        endSet = false;
        tryCount = 0;
        while((tryCount<maxTry) && (!endSet)){
            tryCount++;
	    if(mode=="LADDER"){
            myEnd = floor(random((floor(myStart/boardCols)+1)*boardCols,board.length-1));
	    } else {
	    myEnd = floor(random(1,(floor(myStart/boardCols))*boardCols));
	    }
            if (snadderClash(myEnd)==false){
                endSet=true;
            }
        }
    }

    if(startSet && endSet){
        addSnadder(myStart,myEnd);
    } else {
        console.log("Failed to add " + mode + " in " + tryCount + " attempts");
    }

}

function addSnadder(startIndex,endIndex){
    let snadder = new Snadder(startIndex,endIndex,board);
    snadders.push(snadder);
}

