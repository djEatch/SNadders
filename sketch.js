let board= []
let boardCols = 10
let boardRows = 5
let squareSize = 50
let players=[];
let activePlayer;
let snadders=[];
let snadderCount = 5;

let highlightTrail = []
let activeSpace

let gameOver = false;

let phase;

const setup_phase = 0
const roll_phase = 1
const preview_phase = 2
const move_phase = 3
const snadder_preview_phase = 4
const snadder_move_phase = 5
const evaluate_phase = 6
const reset_phase = 7

let playerText;
let turnCount = -1;

function setup() {

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
    
    playerText = createDiv();
    playerText.html("Loading...",true);

    drawBoard();
    drawSnadders();
    drawPlayers();
    
    //setActivePlayer()

    rollBtn = createButton('Roll');
    rollBtn.mousePressed(buttonPress);
    
    phase = setup_phase;
}

function draw() {
    frameRate(25);
    if (phase == setup_phase) {
        
        // set the active player
        turnCount++;
        console.log ("turn count from setup_phase: " + turnCount);
        setActivePlayer()

        // enable button
        rollBtn.removeAttribute('disabled');
        rollBtn.html("Roll");
        rollBtn.style('background-color', activePlayer.colourR,activePlayer.colourG,activePlayer.colourB)
        phase = roll_phase;

    }else  if (phase == roll_phase) {
        
    }else  if(phase == preview_phase){
        animate("PREVIEW");

        if  (activeSpace == activePlayer.targetSpace){
            phase = move_phase;
            activeSpace = activePlayer.currentSpace;
        }
    } else if (phase == move_phase) {
        animate("MOVE");
        
        if (activeSpace == activePlayer.targetSpace) {
            if (!activePlayer.snadderMove()){
                phase = evaluate_phase
            }

        }
    } else if (phase == snadder_preview_phase){
        animate("PREVIEWSNADDER");
        
        if (activeSpace == activePlayer.targetSpace) {
            phase = snadder_move_phase;
            activeSpace = activePlayer.currentSpace;
        }
    }else if (phase == snadder_move_phase){
        animate("MOVE");
        
        if (activeSpace == activePlayer.targetSpace) {
            phase = evaluate_phase;
        }
    } else if (phase == evaluate_phase) {
        if(activePlayer.targetSpace == (boardRows*boardCols) - 1){
            console.log(activePlayer.name + " won!!!!");
            playerText.html(activePlayer.name + " won!!!");
            rollBtn.html("RESET");
            rollBtn.removeAttribute('disabled');
            gameOver = true;
            phase = reset_phase;
        } else {
            phase = setup_phase;
        }
    }
    

    drawBoard();
    drawSnadders();
    drawPlayers();

}

function snadimate(){
    console.log("Snaddering!!!!");
}

function animate(type){
    if(activeSpace<activePlayer.targetSpace){ // moving up the board
        activeSpace++;
    } else {
        activeSpace--; //moving down the board - snaked
    }
    if(activeSpace != activePlayer.currentSpace) {
        if(type=="MOVE"){
            board[activeSpace].default();
            activePlayer.currentSpace = activeSpace;
        } else if (type=="PREVIEW") { // PREVIEW
            board[activeSpace].highlight("ROLL");
        } else if (type=="PREVIEWSNADDER") { // PREVIEWSNADDER
            if (activePlayer.targetSpace > activePlayer.currentSpace) {
                board[activeSpace].highlight("UP");
            } else {
                board[activeSpace].highlight("DOWN");  
            }
        }
    } 
}


// 


function buttonPress(){
    if(!gameOver){
        activePlayer.premove(roll());
        rollBtn.attribute('disabled', '');
    } else {
        reset();
    }
}

function setActivePlayer(){
    activePlayer = players[turnCount%players.length]
    console.log (activePlayer.name + "'s turn.");
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

    turnCount=-1;
    phase = setup_phase;
}

function roll(){
    let diceValue = floor(random(1,7));
    return diceValue;
}

function snadderClash(index){
    for(snadder of snadders){
        if(snadder.startIndex==index){
            return "START";
            break;
        } else if (snadder.endIndex==index){
            return "END"
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

if (typeof module !== 'undefined') {
    module.exports = roll;
}