class Snadder{
    constructor(startIndex, endIndex){
        this.startIndex = startIndex
        this.endIndex = endIndex
        if(endIndex>startIndex){
            this.type = "LADDER";
        } else {
            this.type = "SNAKE";
        }
    }
}