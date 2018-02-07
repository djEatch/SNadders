class Player {

    constructor(name){
        this.name = name;
        this.colourR = random(255);
        this.colourG = random(255);
        this.colourB = random(255);
        
        this.currentSpace = 0;
    }

    move(num){
        this.currentSpace = this.currentSpace+num;
        if (this.currentSpace >= boardRows*boardCols) {
            
            this.currentSpace = (boardRows*boardCols) - 1
        }
        if(this.currentSpace == (boardRows*boardCols) - 1){
            console.log(this.name + " won!!!!");
            gameOver = true;
        }
    }
}