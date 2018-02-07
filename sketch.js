let board= []
let boardCols = 10
let boardRows = 5
let squareSize = 50
let players=[];
let activePlayer;
let gameOver = false;


function setup() {

    createCanvas(boardCols*squareSize,boardRows*squareSize);
    background(51);

    for(let i = 0; i < (boardCols*boardRows); i++){
        let space = new Space(i,boardCols);
        board.push(space);
    }
    
    console.log(board);

    let player = new Player("BooBug");
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

    while(gameOver == false){

        for(player of players){
            console.log("rolling");
            player.move(roll());
        }

    }
    console.log("outofloop");

}

function roll(){
    let diceValue = floor(random(7));
    return diceValue;
}