import { zeros } from "mathjs";
import { shipData } from "./Singletons/ShipDataSingleton";

export default class Gameboard {
    constructor(){
        this.board = zeros(10, 10);
        this.ships = [];
        this.hitMissed = [];
    }

    placeShip(ship, x1, y1, x2, y2){
        shipData.setShip(ship);
        shipData.setLength(Gameboard.checkForLine(x1, y1, x2, y2));
        if(!shipData.length)
            return false;
        if(!Gameboard.checkForLength(shipData.length, ship))
            return false;
        shipData.setX1(x1);
        shipData.setX2(x2);
        shipData.setY1(y1);
        shipData.setY2(y2);

        Gameboard.checkForHorizontalVertical();
        Gameboard.getPlacementCoordinates();

        this.place(ship);
        this.ships.push(ship);
        return true;
    }

    static checkForLine(x1, y1, x2, y2){
        const diff1 = Math.abs(x2 - x1);
        const diff2 = Math.abs(y2 - y1);
        if((!Boolean(diff1) == Boolean(diff2)) && (Boolean(diff1) == !Boolean(diff2)))
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

    place(ship){
        for(let v of shipData.coordinatesArray){
            this.board.set(v, ship)
        }
    }

    checkCoordinatesHit(x,y){
        return Boolean(this.board.get([x,y])) ? true : false;
    }

    replaceWithZero(x, y){
        this.board.set([x,y], 0);
        return true;
    }

    getShip(x,y){
        return this.board.get([x,y]);
    }

    storeMissedHit(x,y){
        this.hitMissed.push([x,y]);
        return true;
    }

    sendHit(ship){
        if(!!ship?.hit?.())
            return ship.hit();
        return false;
    }

    receiveAttack(x, y){
        if(!this.checkCoordinatesHit(x,y)){
            this.storeMissedHit(x,y);
            return false;
        }else{
            const ship = this.getShip(x,y);
            if(!this.sendHit(ship))
                return false;
            return this.replaceWithZero(x,y);
        }

    }
}