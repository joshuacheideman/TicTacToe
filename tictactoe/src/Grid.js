import React from 'react';
import './Grid.css';
import Cell from "./Cell.js";
import GameMessage from "./GameMessage.js"
import CheckWin from "./CheckWin.js";
import AI from "./AI.js";

class Grid extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            symbols: new Array(Math.pow(this.props.boardSize,2)),
            gameEnded: false
        };

        //tells if you won,lost, or tied
        this.gameCondition = undefined;
        
        //tells us if x is current turn
        this.xsTurn = Math.floor(Math.random()*2)===0?false: true;

        //bind to the component so state is not null in function
        this.setSymbol = this.setSymbol.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
        Grid.switchPlayer = Grid.switchPlayer.bind(this);
    }
    componentDidMount()
    {
        AI.playerAI(this.state.symbols,this.xsTurn,this.props.boardSize,this.props.playerX);
    }
    //This function programatically makes the table for us instead of hard coding it
    makeGrid()
    {
        let table = [];
        let counter = 0;
        for(let i=0;i<this.props.boardSize;i++)
        {
            //inner loop to create children elements
            let children = [];

            for(let j=0;j<this.props.boardSize;j++)
            {
                children.push(<Cell 
                    key = {"Cell-"+counter} 
                    symbol= {this.state.symbols[counter]} 
                    setSymbol={this.setSymbol} 
                    position= {counter} 
                    gameEnded= {this.state.gameEnded}
                    size = {this.props.boardSize}
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
        let curX = this.xsTurn;
        if(curX===true)
            symbols[cellId] = "X";
        else
            symbols[cellId] = "O";
        
        curX = !curX;
        this.xsTurn = curX;
        this.setState(({symbols: symbols}));
        let won = CheckWin.DidWin(symbols,curX,this.props.playerX,this.props.boardSize);
        
        if(won===undefined)
            AI.playerAI(symbols,curX,this.props.boardSize,this.props.playerX);
        else
        {
            this.gameCondition = won;
            this.setState({gameEnded:true});
        }
    }
    
    resetGrid()
    {
        let symbols = new Array(this.props.boardSize);
        this.setState({
            symbols: symbols,
            gameEnded: false
        });
        this.gameCondition = undefined;
        this.xsTurn = Math.floor(Math.random()*2)===0?false: true;
        AI.playerAI(symbols,this.xsTurn,this.props.boardSize,this.props.playerX);
    }
    static switchPlayer(symbols,curX,won)
    {
        this.setState({symbols:symbols});
        this.xsTurn = curX;
        
        if(won!==undefined)
        {
            this.gameCondition = won;
            this.setState({gameEnded:true});
        }
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
            gameCondition={this.gameCondition} 
            resetGrid = {this.resetGrid}></GameMessage>
    </main>
        )
    };
}

export default Grid;