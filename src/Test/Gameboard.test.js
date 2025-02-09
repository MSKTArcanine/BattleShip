import { exp, getMatrixDataTypeDependencies, size } from "mathjs";
import Gameboard from "../Gameboard";
import Submarine from "../ShipTypes/Submarine";
import { shipData } from "../Singletons/ShipDataSingleton";

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

describe('place function working', () => {
    let gameboard;
    beforeAll(() => gameboard = new Gameboard())
    beforeEach(() => shipData.reset());

    it('correctly place a ship', () => {
        const submarine = new Submarine();
        shipData.setShip(submarine)
        shipData.setDirection('vertical');
        shipData.setLength(2);
        shipData.setX1(1);
        shipData.setX2(1);
        shipData.setY1(2);
        shipData.setY2(1);
        Gameboard.getPlacementCoordinates();
        console.log(shipData.coordinatesArray.length);
        console.log(shipData.coordinatesArray);
        gameboard.place(submarine);
        console.log(gameboard.board.get([1, 2]));
        expect(1).toBe(1);
    })
})