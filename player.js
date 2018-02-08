class Player {

    constructor(name){
        this.name = name;
        this.index = players.length;
        this.colourR = random(255);
        this.colourG = random(255);
        this.colourB = random(255);
        
        this.currentSpace = 0;
    }

    move(num){
        console.log (this.name + " rolled  " +num + " moving from  " + this.currentSpace + " to " + (this.currentSpace+num));
        this.currentSpace = this.currentSpace+num;

        for (snadder of snadders) {
            if(this.currentSpace == snadder.startIndex){
                this.currentSpace = snadder.endIndex;
                console.log (this.name + " used " + snadder.type + " " + snadder.startIndex + " to " + snadder.endIndex);
            }
        }

        if (this.currentSpace >= boardRows*boardCols) {
            
            this.currentSpace = (boardRows*boardCols) - 1
        }

        if(this.currentSpace == (boardRows*boardCols) - 1){
            console.log(this.name + " won!!!!");
            playerText.html(this.name + " won!!!");
            gameOver = true;
        }
    }
}