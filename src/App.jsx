import React,{Component} from "react";
import Puzzle from "./puzzle/Puzzle";

class App extends Component {

    render(){
        return <Puzzle size={4}></Puzzle>
    }
}

export default App;