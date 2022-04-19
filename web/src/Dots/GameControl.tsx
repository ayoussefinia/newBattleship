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

    addDot(key: number, value: object) {
        this.dots.set(key, value);
    }

    addLine(key: string, value: object ) {
        this.lines.set(key, value);
    }

    addBox(key: string, value: object) {
        this.boxes.set(key, value);
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