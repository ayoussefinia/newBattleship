import { ConstructionOutlined } from "@mui/icons-material";

export default class GameControl {
    boxes: any;
    lines: any;
    dots: any;

    constructor(){
        this.boxes = new Map();
        this.lines = new Map();
        this.dots = new Map();

    }

    setDot(key: number, value: object) {
        this.dots.set(key, value);
    }

    getDot(key: number){
        return this.dots.get(key);
    }

    setLine(key: string, value: object) {
        this.lines.set(key, value);
    }

    getLine(key: string){
        return this.lines.get(key);
    }

    setBox(key: string, value: object) {
        this.boxes.set(key, value);
    }

    getBox(key: string){
        return this.boxes.get(key);
    }

    updateDots(){ // write back box vertices to dots map, for cross-referencing in game logic 
        this.boxes.forEach((value: any, key: string) => {
            value.vertices.forEach((d: number) => {
                let tmp = this.getDot(d);
                tmp.boxes.push(key);
                this.setDot(d, {type: tmp.type, boxes: tmp.boxes});
                console.log(d, this.getDot(d));
            })
        });
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