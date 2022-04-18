import Vertex from './Vertex';

export default class Graph {
    constructor(numVertices){
        this.numVertices = numVertices;
        this.AdjList = new Map();
    }

    // addVertex(v)
    addVertex(v){
        this.AdjList.set(v, []);
    }

    // addEdge(v, w)
    addEdge(v, w){
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }

    // isComplete()
    isComplete(){

    }

    // printGraph()
    printGraph(){
        var get_keys = this.AdjList.keys();

        for(var i of get_keys){
            var get_values = this.AdjList.get(i);
            var conc = "";

            for (var j of get_values)
                conc += j + " ";
        
            console.log(i + " -> " + conc);
        }
    }

    // bfs(v)
    // dfs(v)
}