import React from 'react';
import "./Cell.css";

class Cell extends React.Component{
    render()
    {
        let symbol = this.props.symbol;
        let cell= [];
        let position = this.props.position;
        if(symbol===undefined)
        {
            cell =<td className="clickable" onClick={this.props.setSymbol.bind(this,position)}></td>
        }
        else
            cell = <td>{symbol}</td>
        return(    
            cell
        ) 
    };
}

export default Cell;