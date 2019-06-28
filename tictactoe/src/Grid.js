import React from 'react';
import './Grid.css';
import Cell from "./Cell.js";
import GameMessage from "./GameMessage.js"

class Grid extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            symbols: new Array(9),
            xsTurn: this.props.firstTurn,
            selectedX : this.props.playerX,
            gameEnded: false,
            gameCondition: undefined
        };

        //bind to the component so state is not null in function
        this.setSymbol = this.setSymbol.bind(this);
        this.reset = this.reset.bind(this);
    }

    //This function programatically makes the table for us instead of hard coding it
    makeGrid()
    {
        let table = [];
        let counter = 0;
        for(let i=0;i<3;i++)
        {
            //inner loop to create children elements
            let children = [];

            for(let j=0;j<3;j++)
            {
                children.push(<Cell 
                    key = {"Cell-"+counter} 
                    symbol= {this.state.symbols[counter]} 
                    setSymbol={this.setSymbol} 
                    position= {counter} 
                    gameEnded= {this.state.gameEnded}>
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
        let DidWin = this.gameEnd(symbols,curState);
        
        //if we won end, the game and put the code in for game end state 
        if(DidWin!==undefined)
        {
            this.setState({gameEnded: true,gameCondition:DidWin});
        }
        
    }
    //check to see if you won,lost,or tied
    //Lost = 0, Tied = 1, Won = 2
    gameEnd(symbols,latestMove)
    {
        let diagonal1 = "";
        let diagonal2 = "";
        for(let i=0;i<3;i++)
        {
            //diagonals
            diagonal1 += symbols[4*i];
            diagonal2 += symbols[2*i+2];

            let horizontals = "";
            let verticals = "";
            for(let j=0;j<3;j++)
            {
                //horizontals
                horizontals += symbols[3*i+j];
                //verticals
                verticals += symbols[i+3*j];
            }
            //check to see if horizontals,and verticals have 3 in a row
            let horizontalV = this.validateWin(horizontals,latestMove);
            let verticalV = this.validateWin(verticals,latestMove);
            if(horizontalV!==undefined)
                return horizontalV;
            if(verticalV !==undefined)
                return verticalV;
        }
        //check to see if diagonals have 3 in a row
        let diagonalV1 = this.validateWin(diagonal1,latestMove);
        let diagonalV2 = this.validateWin(diagonal2,latestMove);
        
        if(diagonalV1 !==undefined)
            return diagonalV1;
        if(diagonalV2 !==undefined)
            return diagonalV2;
        
        //check for tie
        if(symbols.filter(symbol => (symbol!=='X'||symbol!=='O')).length===9)
            return 1;
    }

    //check to see if the we have three in a row
    validateWin(direction,latestMove)
    {
        if(direction==="XXX"||direction==="OOO")
            {

                //Win if not your turn
                if((!latestMove && this.state.selectedX)||(latestMove && !this.state.selectedX))
                {
                    return 2;
                }
                //Loss if it is your turn
                else
                    return 0;
            }
    }
    reset()
    {
        this.setState({
            symbols: new Array(9),
            xsTurn: true,
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
            reset = {this.reset}></GameMessage>
    </main>
        )
    };
}

export default Grid;