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

let setup_phase = 0
let roll_phase = 1
let preview_phase = 2
let move_phase = 3
let snadder_phase = 4
let evaluation_phase = 5
let reset_phase = 6

let playerText;

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

    activePlayer = players[0];
    console.log(activePlayer);
    playerText = createDiv();
    playerText.html("Loading...",true);

    drawBoard();
    drawSnadders();
    drawPlayers();

}

function drawBoard(){
    for(space of board){
        colorMode(RGB);
        fill(255,255,255);
        stroke(0,0,0);
        rect(space.xo,space.yo,squareSize,squareSize)
        textSize(32);
        textAlign(CENTER,CENTER);
        fill(0, 102, 153);
        text(space.index, space.xo+(squareSize*0.5),space.yo+(squareSize*0.5));
    }
}

function drawPlayers(){
    for(player of players){
        for(space of board){
            if(player.currentSpace == space.index){
                colorMode(RGB);
                stroke(0,0,0);
                fill(player.colourR,player.colourG,player.colourB);
                ellipse(space.xo+(squareSize*0.5),space.yo+(squareSize*0.5),squareSize*0.6,squareSize*0.6);
                break;
            }
        }
    }
}

function drawSnadders(){
    for (snadder of snadders){
        if(snadder.type == "SNAKE"){
            stroke(0,255,0);
        } else{
            stroke(255,255,0);
        }
        line(snadder.startLocX,snadder.startLocY,snadder.endLocX,snadder.endLocY);
    }
}

function draw() {
    frameRate(5);
    let turnCount = 0;
    while(gameOver == false){
        console.log(turnCount%players.length);
        activePlayer = players[turnCount%players.length]
        playerText.html(player.name + "'s turn.");
        activePlayer.move(roll());
        drawBoard();
        drawSnadders();
        drawPlayers();
        turnCount++;
    }
    noLoop();
    
    reset();
}

function reset(){
    for(player of players){
        player.currentSpace = 0
    }
    gameOver = false;
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

