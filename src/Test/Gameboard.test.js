import { size } from "mathjs";
import Gameboard from "../Gameboard";
import Submarine from "../ShipTypes/Submarine";

describe('Gameboard init', () => {
    let gameboard;

    beforeAll(() => { gameboard = new Gameboard() })

    it("Has a 10x10 matrix", ()=>{
        expect(size(gameboard.board._data)).toEqual([10,10])
    })

    it('has an empty storage', () => {
        expect(gameboard.ships.length).toBe(0)
    })

    test('placeShip place a ship at the right coordinate', ()=>{
        gameboard.placeShip(new Submarine(), 1, 1);
        expect(gameboard.board.get([1, 1])).toBeInstanceOf(Submarine);
    })
})