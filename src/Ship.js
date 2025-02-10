export class Ship {
    constructor(){
        // if(new.target === Ship)
        //     throw new Error(`Can't implement an interface`)
        this.length = null;
        this.timeHits = 0;
        this.hasSunk = false;
    }

    hit(){
        this.timeHits += 1;
        this.isSunk();
        return true;
    }
    isSunk(){
        if(this.length <= this.timeHits)
            this.hasSunk = true;
        return this.hasSunk;
    }

    debugToolSetLength(value){
        this.length = value;
    }

    debugToolSetTimeHits(value){
        this.timeHits = value;
    }
}