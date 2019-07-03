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
           if(this.state.size!==3)
                [symbols,curX] = this.randomAI(symbols,curX);
            else
            {
                [symbols,curX] = this.advancedAI(symbols,curX);
            }
        }
        this.setState({symbols: symbols,xsTurn: curX});
        this.DidWin(symbols,curX,this.state.selectedX,this.state.size);
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
        for(let i=0;i<Math.pow(this.state.size,2);i++)
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
        let value;
        let max = -Infinity;
        let choosenTile; 
        for (let child of node.children)
        {
            value = this.minimax(child[1],choices.size-1,false,symbols,curX);
            if(value>=max)
            {
                max = value;
                choosenTile = child[1];
            }
        }
        //console.log(value);
        symbols[choosenTile.key] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }
    minimax(curNode,depth,maxPlayer,symbols,curX)
    {
        symbols[curNode.key] = ((maxPlayer&&this.state.selectedX)||(!maxPlayer&&!this.state.selectedX)) ? "O" : "X";
        
        //check if depth is 0 or if some ending condition occurred return heuristic
        let heuristic = CheckWin.gameEnd(symbols,curX,this.state.selectedX,this.state.size);
        if(heuristic!==undefined)
        {
            symbols[curNode.key]=undefined;
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