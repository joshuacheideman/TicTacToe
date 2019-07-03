import React from 'react';
import Grid from './Grid.js';
import "./App.css";

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedSize:false,
            playerX:null
        }
    }
    //set players piece as what they selected on the buttons
    setPiece(piece){
        if(piece==='X')
        {
            this.setState({selectedSize:true,playerX:true});
            return;
        }

        this.setState({selectedSize:true,playerX:false});
        return;
    }
    render(){
        //board size is good when going from 1 to 20
        let grid = null;
        const SelectX = <button onClick={this.setPiece.bind(this,"X")}className="selectButton"><span className="X">X</span></button>;
        const SelectO = <button onClick={this.setPiece.bind(this,"O")}className="selectButton"><span className="O">O</span></button>;
        const SelectMessage = <h2>Player 1 Select your Piece</h2>
        const Select = <div className="selectPiece">{SelectMessage}<div className="buttonRow">{SelectX} {SelectO}</div></div>;
        grid = Select;

        if(this.state.selectedSize)
        {
            grid = <Grid playerX={this.state.playerX} boardSize={3}></Grid>; 
        }
        return(
            <div>
                {grid}
            </div>
        )
    }
}
export default App;