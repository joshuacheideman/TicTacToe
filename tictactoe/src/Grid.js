import React from 'react';
import './Grid.css';
import Cell from "./Cell.js";
import GameMessage from "./GameMessage.js"
import CheckWin from "./CheckWin.js";

class Grid extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            size: this.props.boardSize,
            symbols: new Array(Math.pow(this.props.boardSize,2)),
            xsTurn: Math.floor(Math.random()*2)===0?false: true,
            selectedX : this.props.playerX,
            gameEnded: false,
            gameCondition: undefined
        };
        //bind to the component so state is not null in function
        this.setSymbol = this.setSymbol.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
    }

    //This function programatically makes the table for us instead of hard coding it
    makeGrid()
    {
        let table = [];
        let counter = 0;
        for(let i=0;i<this.state.size;i++)
        {
            //inner loop to create children elements
            let children = [];

            for(let j=0;j<this.state.size;j++)
            {
                children.push(<Cell 
                    key = {"Cell-"+counter} 
                    symbol= {this.state.symbols[counter]} 
                    setSymbol={this.setSymbol} 
                    position= {counter} 
                    gameEnded= {this.state.gameEnded}
                    size = {this.state.size}
                    >
                </Cell>)
                counter++;
            }
            //combine all children elements with the parent elements
            table.push(<tr key={"tr-"+i}>{children}</tr>);
        }
        return table;
    }

    //This function alternates between X's and O's when clicking on a tile.
    setSymbol(cellId,e)
    {
        let symbols = this.state.symbols;
        let curState = this.state.xsTurn;
        if(curState===true)
            symbols[cellId] = "X";
        else
            symbols[cellId] = "O";
        
        curState = !curState;
        this.setState((state)=> ({symbols: symbols,xsTurn: curState}));
        let DidWin = CheckWin.gameEnd(symbols,curState,this.state.selectedX,this.state.size);
        //if we won end, the game and put the code in for game end state 
        if(DidWin!==undefined)
        {
            this.setState({gameEnded: true,gameCondition:DidWin});
        }
        
    }
    resetGrid()
    {
        this.setState({
            symbols: new Array(this.state.size),
            xsTurn: Math.floor(Math.random()*2)===0?false: true,
            gameEnded: false,
            gameCondition: undefined
        });
    }
    render()
    {
        return (
    <main className="Grid-main">
        <table className="Grid-table">
            <tbody>
                {this.makeGrid()}
            </tbody>
        </table>
        <GameMessage 
            gameEnded={this.state.gameEnded} 
            gameCondition={this.state.gameCondition} 
            resetGrid = {this.resetGrid}></GameMessage>
    </main>
        )
    };
}

export default Grid;