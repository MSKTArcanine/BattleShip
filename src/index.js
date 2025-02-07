import "./style.css";
import Submarine from "./ShipTypes/Submarine";
import Gameboard from "./Gameboard";

const gameboard = new Gameboard();
gameboard.placeShip(new Submarine(), 1, 1);
console.log(gameboard.ships);
console.table(gameboard.board._data);