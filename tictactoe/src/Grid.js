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
    }
    componentDidMount()
    {
        this.playerAI(this.state.symbols,this.xsTurn);
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
        let won = this.DidWin(symbols,curX,this.props.playerX,this.props.boardSize);
        
        if(won===undefined)
            this.playerAI(symbols,curX);
        
    }
    DidWin(symbols,curX,selectedX,size)
    {
        let DidWin = CheckWin.gameEnd(symbols,curX,selectedX,size);
        //if we won end, the game and put the code in for game end state 
        if(DidWin!==undefined)
        {
            this.setState({gameEnded: true});
            this.gameCondition = DidWin;
        }
        return DidWin;
    }
    
    playerAI(symbols,curX)
    {
        if((!curX&&this.props.playerX)||(curX&&!this.props.playerX))
        {
           if(this.props.boardSize!==3)
                [symbols,curX] = this.randomAI(symbols,curX);
            else
            {
                [symbols,curX] = this.advancedAI(symbols,curX);
            }
        }
        this.setState({symbols: symbols});
        this.xsTurn = curX;
        this.DidWin(symbols,curX,this.props.playerX,this.props.boardSize);
        return;
    }
    randomAI(symbols,curX)
    {
        let choices;
        choices = this.getRemainingTiles(symbols);
        let random = Math.floor(Math.random()*choices.size);
        symbols[choices.get(random).key] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }
    getRemainingTiles(symbols)
    {
        let choices = new Map();
        for(let i=0;i<Math.pow(this.props.boardSize,2);i++)
        {
            if(symbols[i]!=='X'&&symbols[i]!=='O')
            {
                choices.set(choices.size,{key:i});
            }
        }
        return choices;
    }
    advancedAI(symbols,curX)
    {
        let node = {};
        let choices = {};
        choices = this.getRemainingTiles(symbols);
        node.children = choices;
        let value= -Infinity;
        let max = -Infinity;
        let choosenTile; 
        for (let child of node.children)
        {
            value = Math.max(value,this.minimax(child[1],choices.size-1,false,symbols,curX));
            if(value>max)
            {
                max = value;
                choosenTile = child[1];
            }
        }
        symbols[choosenTile.key] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }
    minimax(curNode,depth,maxPlayer,symbols,curX)
    {
        symbols[curNode.key] = ((maxPlayer&&this.props.playerX)||(!maxPlayer&&!this.props.playerX)) ? "O" : "X";
        
        //check if depth is 0 or if some ending condition occurred return heuristic
        let heuristic = CheckWin.gameEnd(symbols,curX,this.props.playerX,this.props.boardSize);
        if(heuristic!==undefined)
        {
            symbols[curNode.key]=undefined;

            //adding this to heuristic makes it so defence counters you more
            if(!maxPlayer&&heuristic===20)
                return heuristic+depth;
            return heuristic;
        }
        let node = {};
        let choices = {};
        choices = this.getRemainingTiles(symbols);
        node.children = choices;
        let value;
        if(maxPlayer)
        {
            value = -Infinity;
            for (let child of node.children)
            {
                value = Math.max(value,this.minimax(child[1],depth-1,false,symbols,!curX))
            }
        }else{
            value = Infinity;
            for (let child of node.children)
            {
                value = Math.min(value,this.minimax(child[1],depth-1,true,symbols,!curX))
            }
        }
        symbols[curNode.key]=undefined;
        return value;
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
        this.playerAI(symbols,this.xsTurn);
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