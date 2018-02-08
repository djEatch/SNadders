class Space {
    constructor(index,columns){
        this.index = index;
        this.x = index%columns;
        this.y= floor(index/columns);
        this.colour = color(255,255,255);

        if (this.y%2==0){
            this.xo = this.x*squareSize;
        } else {
            this.xo = (boardCols*squareSize) - ((this.x + 1)*squareSize);
        }
        this.yo = (boardRows*squareSize) - ((this.y+1)*squareSize)

    }

    highlight(){
        this.colour = color(100,255,100);
    }

    default(){
        this.colour = color(255,255,255);
    }
}