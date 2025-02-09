import "./style.css";
import Submarine from "./ShipTypes/Submarine";
import Gameboard from "./Gameboard";
import { shipData } from "./Singletons/ShipDataSingleton";

const submarine = new Submarine();
const gameboard = new Gameboard();

gameboard.placeShip(submarine, 1, 1, 3, 1)
console.log(gameboard);
console.table(shipData);