import React from 'react';
import './Grid.css';
import Cell from "./Cell.js";

class Grid extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            symbols: new Array(9),
            isX: true
        };

        //bind to the component so state is not null
        this.setSymbol = this.setSymbol.bind(this);
    }

    //This function programatically makes the table for us instead of hard coding it
    makeTable()
    {
        let table = [];
        let counter = 0;
        for(let i=0;i<3;i++)
        {
            //inner loop to create children elements
            let children = [];

            for(let j=0;j<3;j++)
            {
                children.push(<Cell symbol= {this.state.symbols[counter]} setSymbol={this.setSymbol} key = {"Cell-"+counter} position= {counter}></Cell>);
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
        console.log(symbols);
        if(this.state.isX===true)
            symbols[cellId] = "X";
        else
            symbols[cellId] = "O";
        this.setState((state)=> ({symbols: symbols,isX: !state.isX}));
    }
    render()
    {
        return (
    <main className="Grid-main">
        <table className="Grid-table">
            <tbody>
                {this.makeTable()}
            </tbody>
        </table>
    </main>
        )
    };
}

export default Grid;