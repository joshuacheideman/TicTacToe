import React from 'react';
import "./Cell.css";

class Cell extends React.Component{
    render()
    {
        let symbol = this.props.symbol;
        let cell= [];
        let position = this.props.position;
        let size = this.props.size;
        const adjustedwidth = (60/size)+"%";
        const adjustedheight = (300/size)+"px";
        const adjustedfontSize = Math.floor(250/size)+"px";
        const adjustedCellStyle= {width:adjustedwidth,height:adjustedheight,fontSize:adjustedfontSize};

        if(symbol===undefined&&!this.props.gameEnded)
        {
                cell =<td style={adjustedCellStyle} 
                    className="clickable" 
                    onClick={this.props.setSymbol.bind(this,position)}>
                    </td>
        }
        else switch(symbol)
        {
            case "X":
                cell = <td className="X" style={adjustedCellStyle}>X</td>
                break;
            case "O":
                cell = <td className="O" style={adjustedCellStyle}>O</td>
                break;
            default:
                cell = <td style={adjustedCellStyle}>{symbol}</td>;
        }
        return(    
            cell
        ) 
    };
}

export default Cell;