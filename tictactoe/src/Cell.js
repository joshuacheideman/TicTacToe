import React from 'react';
import "./Cell.css";

class Cell extends React.Component{
    render()
    {
        let symbol = this.props.symbol;
        let cell= [];
        let position = this.props.position;
        if(symbol===undefined&&!this.props.gameEnded)
        {
                cell =<td className="clickable" onClick={this.props.setSymbol.bind(this,position)}></td>
        }
        else switch(symbol)
        {
            case "X":
                cell = <td style={{color:'blue'}}>X</td>
                break;
            case "O":
                cell = <td style={{color:'red'}}>O</td>
                break;
            default:
                cell = <td>{symbol}</td>;
        }
        return(    
            cell
        ) 
    };
}

export default Cell;