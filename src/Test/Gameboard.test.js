import { exp, getMatrixDataTypeDependencies, size } from "mathjs";
import Gameboard from "../Gameboard";
import Submarine from "../ShipTypes/Submarine";
import { shipData } from "../Singletons/ShipDataSingleton";
import { Ship } from "../Ship";

describe('Gameboard init', () => {
    let gameboard;
    beforeAll(() => { gameboard = new Gameboard() })

    it("Has a 10x10 matrix", ()=>{
        expect(size(gameboard.board._data)).toEqual([10,10])
    })

    it('has an empty storage', () => {
        expect(gameboard.ships.length).toBe(0)
    })
})

describe('Gameboard lineCheck + give correct length', ()=>{
    expect(Gameboard.checkForLine(3, 1, 4, 1)).toBeTruthy();
    expect(Gameboard.checkForLine(1, 1, 3, 1)).toBeTruthy();
    expect(Gameboard.checkForLine(1, 1, 3, 1)).toBe(3);
    expect(Gameboard.checkForLine(3, 2, 4, 1)).toBeFalsy();
    expect(Gameboard.checkForLine(3, 3, 4, 4)).toBeFalsy();
    expect(Gameboard.checkForLine(3, 1, 4, 1)).toBe(2);
})
describe('Gameboard lengthCheck', ()=>{

    const ship = new Submarine();

    expect(Gameboard.checkForLength(1, ship)).toBeFalsy();
    expect(Gameboard.checkForLength(0, ship)).toBeFalsy();
    expect(Gameboard.checkForLength(3, ship)).toBeTruthy();
})
describe('CheckForHorizontalVertical', () => {
    beforeEach(() => shipData.reset())
    it('correctly set to horizontal', () => {
        shipData.setX1(1);
        shipData.setX2(2);
        shipData.setY1(1);
        shipData.setY2(1);
        Gameboard.checkForHorizontalVertical();
        expect(shipData.direction).toEqual('horizontal');
    })

    it('correctly set to vertical', () => {
        shipData.setX1(1);
        shipData.setX2(1);
        shipData.setY1(1);
        shipData.setY2(4);
        Gameboard.checkForHorizontalVertical();
        expect(shipData.direction).toEqual('vertical');
    })
})
describe('GetPlacementCoordinates', () => {
    beforeEach(() => shipData.reset());
    it('Correctly set the coordinates on horizontal+', () => {
        shipData.setLength(2);
        shipData.setDirection("horizontal");
        shipData.setX1(1);
        shipData.setX2(2);
        shipData.setY1(1);
        shipData.setY2(1);
        Gameboard.getPlacementCoordinates();
        expect(shipData.coordinatesArray).toEqual([[1,1], [2,1]]);
    });
    it('Correctly set the coordinates on horizontal-', () => {
        shipData.setLength(2);
        shipData.setDirection("horizontal");
        shipData.setX1(2);
        shipData.setX2(1);
        shipData.setY1(1);
        shipData.setY2(1);
        Gameboard.getPlacementCoordinates();
        expect(shipData.coordinatesArray).toEqual([[2,1], [1,1]]);
    });
    it('Correctly set the coordinates on vertical+', () => {
        shipData.setLength(2);
        shipData.setDirection("vertical");
        shipData.setX1(1);
        shipData.setX2(1);
        shipData.setY1(1);
        shipData.setY2(2);
        Gameboard.getPlacementCoordinates();
        expect(shipData.coordinatesArray).toEqual([[1,1], [1,2]]);
    });
    it('Correctly set the coordinates on vertical-', () => {
        shipData.setLength(2);
        shipData.setDirection("vertical");
        shipData.setX1(1);
        shipData.setX2(1);
        shipData.setY1(2);
        shipData.setY2(1);
        Gameboard.getPlacementCoordinates();
        expect(shipData.coordinatesArray).toEqual([[1,2], [1,1]]);
    })
})

describe('placeShip(ship, x1, x2, y1, y2) function working + which is integration testing', () => {
    let gameboard;
    beforeAll(() => gameboard = new Gameboard())
    beforeEach(() => shipData.reset());

    it('correctly place a ship', () => {
        const submarine = new Submarine();
        gameboard.placeShip(submarine, 1, 1, 3, 1);
        expect(gameboard.board.get([0, 1])).toBe(0);
        expect(gameboard.board.get([1, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([2, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([3, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([4, 1])).toBe(0);
    });
    it('correctly place a ship', () => {
        const submarine = new Submarine();
        gameboard.placeShip(submarine, 1, 1, 3, 1);
        expect(gameboard.board.get([0, 1])).toBe(0);
        expect(gameboard.board.get([1, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([2, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([3, 1])).toBeInstanceOf(Submarine);
        expect(gameboard.board.get([4, 1])).toBe(0);
    });
    
})

describe('checkCoordinatesHit(x,y)', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('Correctly detects a 0 (miss) or a ship (hit)', () => {
        gameboard.placeShip(submarine, 1, 1, 3, 1);
        expect(gameboard.checkCoordinatesHit(1, 1)).toBeTruthy();
        expect(gameboard.checkCoordinatesHit(0, 1)).toBeFalsy();
    })
})

describe('replaceWithZero(x,y)', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('Correctly replace a ship with a 0', () => {
        gameboard.placeShip(submarine, 5, 1, 5, 3);
        expect(gameboard.checkCoordinatesHit(5, 1)).toBeTruthy();
        gameboard.replaceWithZero(5, 1);
        expect(gameboard.checkCoordinatesHit(5, 1)).toBeFalsy();
    })

})

describe('getShip(x,y)', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('Correctly returns ship', () => {
        gameboard.placeShip(submarine, 5, 1, 5, 3);
        expect(gameboard.getShip(5, 0)).toBe(0);
        expect(gameboard.getShip(5, 1)).toBeInstanceOf(Ship);
        expect(gameboard.getShip(5, 2)).toBeInstanceOf(Ship);
        expect(gameboard.getShip(5, 3)).toBeInstanceOf(Ship);
        expect(gameboard.getShip(5, 4)).toBe(0);
    })

})

describe('StoreMissedHit(x,y)', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('correctly store coordinates received', () => {
        expect(gameboard.hitMissed.length).toBe(0);
        gameboard.storeMissedHit(1, 1);
        expect(gameboard.hitMissed[0]).toEqual([1, 1]);
        gameboard.storeMissedHit(2, 1);
        expect(gameboard.hitMissed[1]).toEqual([2, 1]);
        gameboard.storeMissedHit(3, 1);
        expect(gameboard.hitMissed[2]).toEqual([3, 1]);
    })

})

describe('sendHit(ship)', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('correctly send hit() to ship', () => {
        expect(gameboard.sendHit(submarine)).toBeTruthy();
        expect(gameboard.sendHit(0)).toBeFalsy();
        expect(gameboard.sendHit(1)).toBeFalsy();
    })

})

describe('receiveAttack(x,y), which is integration testing of previous fns', () => {
    let gameboard, submarine;

    beforeAll(() => {
        gameboard = new Gameboard();
        submarine = new Submarine();
    });
    beforeEach(() => shipData.reset());

    it('return true on correct attacks', () => {
        gameboard.placeShip(submarine, 1, 1, 3, 1);
        expect(gameboard.getShip(1, 1)).toBeInstanceOf(Ship)
        expect(gameboard.receiveAttack(1, 1)).toBeTruthy();
        expect(gameboard.getShip(1, 1)).toBe(0);
    })
    it('return false on missed attacks + stores it', () => {
        gameboard.placeShip(submarine, 1, 1, 3, 1);
        expect(gameboard.getShip(0, 1)).toBe(0)
        expect(gameboard.receiveAttack(0, 1)).toBeFalsy();
        expect(gameboard.hitMissed.length).toBe(1);
        expect(gameboard.hitMissed[0]).toEqual([0, 1]);
    })
})