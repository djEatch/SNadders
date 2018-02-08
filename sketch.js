let board= []
let boardCols = 10
let boardRows = 5
let squareSize = 50
let players=[];
let activePlayer;
let snadders=[];


let gameOver = false;

let phase;

let setup_phase = 0
let roll_phase = 1
let preview_phase = 2
let move_phase = 3
let snadder_phase = 4
let evaluation_phase = 5
let reset_phase = 6



function setup() {

    phase = setup_phase;
    createCanvas(boardCols*squareSize,boardRows*squareSize);
    background(51);

    for(let i = 0; i < (boardCols*boardRows); i++){
        let space = new Space(i,boardCols);
        board.push(space);
    }
    
    console.log(board);

    let snadder = new Snadder(19,5,board);
    snadders.push(snadder);
    snadder = new Snadder(6,20,board);
    snadders.push(snadder);

    let player = new Player("BooBug");
    players.push(player);
    player = new Player("PeekyPie");
    players.push(player);

}

function draw() {
    for(space of board){
        colorMode(RGB);
        fill(255,255,255);
        rect(space.xo,space.yo,squareSize,squareSize)
        //console.log(space);
        textSize(32);
        textAlign(CENTER,CENTER);
        fill(0, 102, 153);
        text(space.index, space.xo+(squareSize*0.5),space.yo+(squareSize*0.5));

        for(player of players){
            if(player.currentSpace == space.index){
                colorMode(RGB);
                fill(player.colourR,player.colourG,player.colourB);
                ellipse(space.xo+(squareSize*0.5),space.yo+(squareSize*0.5),squareSize*0.6,squareSize*0.6);
            }
        }
    }
    for (snadder of snadders){
        if(snadder.type == "SNAKE"){
            stroke(0,255,0);
        } else{
            stroke(255,255,0);
        }
        line(snadder.startLocX,snadder.startLocY,snadder.endLocX,snadder.endLocY);
    }

    while(gameOver == false){

        for(player of players){
            
            if (!gameOver){
                player.move(roll());
            }
        }

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