import { zeros } from "mathjs";
export default class Gameboard {
    constructor(){
        this.board = zeros(10, 10);
        this.ships = [];
        this.hitMissed = [];
    }

    placeShip(ship, x1, y1, x2, y2){
        this.ships.push(ship);
        this.board.set([x, y], ship);
    }

    static checkForLine(x1, y1, x2, y2){
        const diff1 = Math.abs(x2 - x1);
        const diff2 = Math.abs(y2 - y1);
        if((!diff1 == diff2) && (diff1 == !diff2))
            return true;
        return false;
    }

    receiveAttack(x, y){
        const coordinateHit = this.board.get([x, y]);
        if(!coordinateHit){
            this.hitMissed.push([x, y]);
            return false;
        }
        coordinateHit.hit();
        this.board.set([x, y], 0);
    }
}