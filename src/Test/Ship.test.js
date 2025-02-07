import { Ship } from "../Ship";


describe("Ship : basic functions testing + basic methods behaviors.", () => {
    let ship;

    beforeAll(() => {ship = new Ship();
        ship.debugToolSetLength(3);})

    it('has a length', () => expect(ship.length).toBeDefined())
    it('has a timeHits', () => expect(ship.timeHits).toBeDefined())
    it('has a hasSunk set to false', () => expect(ship.hasSunk).toBeFalsy())
    
    test('Hit() is adding 1 to timeHits', () => {
        ship.hit();
        expect(ship.timeHits).toBe(1);
    })

    test('isSunk is setting hasSunk to false if hits < length', () => {
        ship.isSunk();
        expect(ship.hasSunk).toBeFalsy();
    })

    test("isSunk is setting hasSunk to true if hits > length", () => {
        ship.debugToolSetTimeHits(3);
        ship.isSunk();
        expect(ship.hasSunk).toBeTruthy();
    })
})