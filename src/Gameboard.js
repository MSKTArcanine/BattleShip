import { zeros } from "mathjs";
export default class Gameboard {
    constructor(){
        this.board = zeros(10, 10);
        this.ships = [];
    }

    placeShip(ship, x, y){
        this.ships.push(ship);
        this.board.set([x, y], ship);
    }
}