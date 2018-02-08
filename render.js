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

    let counterSize = (squareSize/players.length)*1.5;
    for(player of players){
        let xOff = (player.index-floor(players.length/2)) * (counterSize/2)
        let yOff = (player.index-floor(players.length/2)) * (counterSize/2)
        for(space of board){
            if(player.currentSpace == space.index){
                colorMode(RGB);
                stroke(0,0,0);
                fill(player.colourR,player.colourG,player.colourB);
                ellipse(space.xo+(squareSize*0.5)+xOff,space.yo+(squareSize*0.5)-yOff,counterSize,counterSize);
                textSize(counterSize);
                textAlign(CENTER,CENTER);
                fill(0, 0, 0);
                text(player.name.substr(0,1), space.xo+(squareSize*0.5)+xOff,space.yo+(squareSize*0.5)-yOff);
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