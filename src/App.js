import React from 'react';
import Grid from './Grid.js';
import "./App.css";

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedPiece:false,
            playerX:null,
            boardSize: 3,
            validation:null
        }
        this.changeSize = this.changeSize.bind(this);
        this.grid = null;
    }
    //set players piece as what they selected on the buttons
    setPiece(piece){
        if(piece==='X')
        {
            this.setState({selectedPiece:true,playerX:true});
            return;
        }

        this.setState({selectedPiece:true,playerX:false});
        return;
    }
    changeSize(event)
    {
        if(event.target.value!=="")
        {
            if(event.target.value>0&&event.target.value<=15)
            {
                //call the resetGrid in callback after setState has finished
                this.setState({boardSize: parseInt(event.target.value),validation:null},()=>{
                    if(this.grid!==null)
                    Grid.resetGrid();
                });
            }
            else
                this.setState({validation: <p className="error">Must be between 1 to 15!</p>});
        }
    }
    render(){
        const SelectX = <button onClick={this.setPiece.bind(this,"X")}className="selectButton"><span className="X">X</span></button>;
        const SelectO = <button onClick={this.setPiece.bind(this,"O")}className="selectButton"><span className="O">O</span></button>;
        const SelectMessage = <h2>Player 1 Select your Piece</h2>
        let Select = <div className="selectPiece">{SelectMessage}<div className="buttonRow">{SelectX} {SelectO}</div></div>;

        if(this.state.selectedPiece)
        {
            this.grid = <Grid playerX={this.state.playerX} boardSize={this.state.boardSize}></Grid>; 
            Select = null;
        }
        return(
            <div className="App-Main">
                <form className="sizeForm" onChange={this.changeSize}>
                    Grid size:
                    <input type="text" placeholder="Accepted values: 1-15"/>
                </form>
                {this.state.validation}
                {Select}
                {this.grid}
            </div>
        )
    }
}
export default App;