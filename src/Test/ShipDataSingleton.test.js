import {shipData} from "../Singletons/ShipDataSingleton";

describe('Default init', () => {
    it('contains a null length', () => expect(shipData.length).toBeNull())
    it('contains a null coordinate0', () => expect(shipData.coordinate0).toBeNull())
    it('contains a null coordinateToMove', () => expect(shipData.coordinateToMove).toBeNull())
})

describe('Test reset function', () => {
    it('sets correctly length to 3', () => {
        shipData.setLength(3);
        expect(shipData.length).toBe(3)})
    it('reset length to null correctly', () => {
        shipData.reset();
        expect(shipData.length).toBeNull()})
})