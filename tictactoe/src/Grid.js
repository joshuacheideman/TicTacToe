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
            gameCondition: undefined,
            AI: this.props.AI
        };
        //bind to the component so state is not null in function
        this.setSymbol = this.setSymbol.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
    }
    componentDidMount()
    {
        this.playerAI(this.state.symbols,this.state.xsTurn);
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
        let curX = this.state.xsTurn;
        if(curX===true)
            symbols[cellId] = "X";
        else
            symbols[cellId] = "O";
        
        curX = !curX;
        this.setState((state)=> ({symbols: symbols,xsTurn: curX}));
        let won = this.DidWin(symbols,curX,this.state.selectedX,this.state.size);
        
        if(won===undefined)
            this.playerAI(symbols,curX);
        
    }
    DidWin(symbols,curX,selectedX,size)
    {
        let DidWin = CheckWin.gameEnd(symbols,curX,selectedX,size);
        //if we won end, the game and put the code in for game end state 
        if(DidWin!==undefined)
        {
            this.setState({gameEnded: true,gameCondition:DidWin});
        }
        return DidWin;
    }
    
    playerAI(symbols,curX)
    {
        if((this.state.AI&&(!curX&&this.state.selectedX))||(this.state.AI&&(curX&&!this.state.selectedX)))
        {
            if(this.size!==3)
                [symbols,curX] = this.randomAI(symbols,curX);
        }
        this.setState({symbols: symbols,xsTurn: curX});
        this.DidWin(symbols,curX,this.state.selectedX,this.state.size);
        return;
    }
    randomAI(symbols,curX)
    {
        let choices = {};
            let numChoices = 0;
            for(let i=0;i<Math.pow(this.state.size,2);i++)
            {
                if(symbols[i]!=='X'&&symbols[i]!=='O')
                {
                    choices[numChoices]={key:i};
                    ++numChoices;
                }
            }
            let random = Math.floor(Math.random()*numChoices);
            symbols[choices[random].key] = (curX) ? "X": "O";
            curX = !curX;
            return [symbols,curX];
    }
    resetGrid()
    {
        let symbols = new Array(this.state.size);
        let xsTurn = Math.floor(Math.random()*2)===0?false: true;
        this.setState({
            symbols: symbols,
            xsTurn: xsTurn,
            gameEnded: false,
            gameCondition: undefined
        });
        this.playerAI(symbols,xsTurn);
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