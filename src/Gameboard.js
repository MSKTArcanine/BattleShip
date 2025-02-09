import { zeros } from "mathjs";
import { shipData } from "./Singletons/ShipDataSingleton";

export default class Gameboard {
    constructor(){
        this.board = zeros(10, 10);
        this.ships = [];
        this.hitMissed = [];
    }

    placeShip(ship, x1, y1, x2, y2){
        shipData.setLength(Gameboard.checkForLine(x1, y1, x2, y2));
        if(!shipData.length)
            return false;
        if(!Gameboard.checkForLength(shipData.length, ship))
            return false;
        shipData.setX1(x1);
        shipData.setX2(x2);
        shipData.setY1(y1);
        shipData.setY2(y2);
        this.ships.push(ship);
        this.board.set([x, y], ship);
        return true;
    }

    static checkForLine(x1, y1, x2, y2){
        const diff1 = Math.abs(x2 - x1);
        const diff2 = Math.abs(y2 - y1);
        if((!diff1 == diff2) && (diff1 == !diff2))
            return Math.abs(diff2 - diff1) + 1;
        return false;
    }

    static checkForLength(length, ship){
        if(length != ship.length)
            return false;
        return true;
    }

    static checkForHorizontalVertical(){
        if(shipData.x1 - shipData.x2 === 0){
            shipData.setCoordinate0("x");
            shipData.setCoordinateToMove("y");
            shipData.setDirection('vertical');
        }else{
            shipData.setCoordinate0("y");
            shipData.setCoordinateToMove("x");
            shipData.setDirection('horizontal');
        }
    }

    static getPlacementCoordinates(){
        let i = shipData.length;
        let x1 = shipData.x1;
        let x2 = shipData.x2;
        let y1 = shipData.y1;
        let y2 = shipData.y2;

        if(shipData.direction === "horizontal"){
            shipData.addCoordinates([x1, y1])
            if(x2 > x1){
                while(i > 1){
                    shipData.addCoordinates([x1 += 1, y1]);
                    i -= 1;
                }
            }else{
                while(i > 1){
                    shipData.addCoordinates([x1 -= 1, y1]);
                    i -= 1;
                }
            }
        }else{
            shipData.addCoordinates([x1, y1])
            if(y2 > y1){
                while(i > 1){
                    shipData.addCoordinates([x1, y1 += 1]);
                    i -= 1;
                }
            }else{
                while(i > 1){
                    shipData.addCoordinates([x1, y1 -= 1]);
                    i -= 1;
                }
            }
        }
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