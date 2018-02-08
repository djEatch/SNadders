class Player {

    constructor(name){
        this.name = name;
        this.index = players.length;
        this.colourR = random(255);
        this.colourG = random(255);
        this.colourB = random(255);
        
        this.currentSpace = 0;
        this.targetSpace = 0
    }

    premove(num){
        this.targetSpace = this.currentSpace+num;
        console.log (this.name + " rolled  " +num + " would move from  " + this.currentSpace + " to " + this.targetSpace);
        

        for (snadder of snadders) {
            if(this.targetSpace == snadder.startIndex){
                this.targetSpace = snadder.endIndex;
                console.log (this.name + " will use " + snadder.type + " " + snadder.startIndex + " to " + snadder.endIndex);
            }
        }

        if (this.targetSpace >= boardRows*boardCols) {
            this.targetSpace = (boardRows*boardCols) - 1
        }
        activeSpace = this.currentSpace;
        phase = preview_phase;

    }

    move(num){


        if(this.targetSpace == (boardRows*boardCols) - 1){
            phase = reset_phase;
            console.log(this.name + " won!!!!");
            playerText.html(this.name + " won!!!");
            rollBtn.html("RESET");
            gameOver = true;
        } else {
            phase = preview_phase;
        }
    }
}