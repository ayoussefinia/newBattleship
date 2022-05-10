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
    setDot(key: number, value: object) {
        this.dots.set(key, value);
    }

    // retrieve dot
    getDot(key: number){
        return this.dots.get(key);
    }

    // create line
    setLine(key: string, value: object) {
        this.lines.set(key, value);
    }

    // retrieve line
    getLine(key: string){
        return this.lines.get(key);
    }

    // create box
    setBox(key: string, value: object) {
        this.boxes.set(key, value);
    }

    // retrieve box
    getBox(key: string){
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

    // after player makes a move, update data structure
    update(key: string, playerId: string, color: string){
        let tmp = this.getLine(key);
        console.log(tmp);
        tmp.active = true;
        tmp.color = color;

        let pt1 = tmp.endpoints[0];
        let pt2 = tmp.endpoints[1];
        let pt1_boxes = this.getDot(pt1).boxes;
        let pt2_boxes = this.getDot(pt2).boxes;

        let intersection = pt1_boxes.filter((bx: string) => pt2_boxes.includes(bx));
        //console.log(intersection);
        intersection.forEach((box: string) => {
            let b = this.getBox(box);
            if (b.owner === null && b.status === 3) {
                b.owner = playerId;
            }
            b.status++
        })

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