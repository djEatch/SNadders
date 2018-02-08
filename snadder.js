class Snadder{
    constructor(startIndex, endIndex, spaces){
        this.startIndex = startIndex
        this.endIndex = endIndex
        if(endIndex>startIndex){
            this.type = "LADDER";
        } else {
            this.type = "SNAKE";
        }
        console.log (spaces);
        for(let space of spaces){
            if(this.startIndex == space.index){
                this.startLocX = space.xo + (squareSize*0.5);
                this.startLocY = space.yo + (squareSize*0.5);
            }
            if(this.endIndex == space.index){
                this.endLocX = space.xo + (squareSize*0.5);
                this.endLocY = space.yo + (squareSize*0.5);
            }
        }

    }
}