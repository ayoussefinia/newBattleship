export default class GameControl {
    boxes: any;
    lines: any;
    dots: any;

    constructor(){
        this.boxes = new Map();
        this.lines = new Map();
        this.dots = new Map();
    }

    // create dot
    setDot(key: Number, value: Object) {
        this.dots.set(key, value);
    }

    // retrieve dot
    getDot(key: Number){
        return this.dots.get(key);
    }

    // create line
    setLine(key: String, value: Object) {
        this.lines.set(key, value);
    }

    // retrieve line
    getLine(key: String){
        return this.lines.get(key);
    }

    // create box
    setBox(key: String, value: Object) {
        this.boxes.set(key, value);
    }

    // retrieve box
    getBox(key: String){
        return this.boxes.get(key);
    }

     // write back box vertices to dots map, for cross-referencing in game logic 
    updateDots(){
        this.boxes.forEach((value: any, key: string) => {
            value.vertices.forEach((d: number) => {
                let tmp = this.getDot(d);
                tmp.boxes.push(key);
                this.setDot(d, {type: tmp.type, boxes: tmp.boxes});
                //console.log(d, this.getDot(d));
            })
        });
    }

    // 
    consumeLine(key: String){
        this.getLine(key).active = true;
        //return this;
    }

    gameComplete() {
        // determine if every box is filled
        return false;
    }

    printController() {
        console.log("log controller data");
        console.log("boxes:", this.boxes);
        console.log("dots:", this.dots);
        console.log("lines:", this.lines);
    }
}