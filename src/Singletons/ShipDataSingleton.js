export const shipData = {
    length:null,
    coordinate0:null,
    coordinateToMove:null,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
    direction: null,
    coordinatesArray: [],

    reset : function(){
        this.length = null;
        this.coordinate0 = null;
        this.coordinateToMove = null;
        this.x1 = null;
        this.x2 = null;
        this.y1 = null;
        this.y2 = null;
        this.direction = null;
        this.coordinatesArray = [];
    },
    setLength : function(value){
        this.length = value;
    },
    setCoordinate0 : function(value){
        this.coordinate0 = value;
    },
    setCoordinateToMove : function(value){
        this.coordinateToMove = value;
    },
    setX1 : function(value){
        this.x1 = value;
    },
    setX2 : function(value){
        this.x2 = value;
    },
    setY1 : function(value){
        this.y1 = value;
    },
    setY2 : function(value){
        this.y2 = value;
    },
    setDirection : function(value){
        this.direction = value;
    },
    addCoordinates : function(value){
        this.coordinatesArray.push(value);
    }
}