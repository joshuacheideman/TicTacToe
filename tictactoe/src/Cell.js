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

        if(symbol===undefined&&!this.props.gameEnded)
        {
                cell =<td style={{width:adjustedwidth,height:adjustedheight,fontSize:adjustedfontSize}} 
                    className="clickable" 
                    onClick={this.props.setSymbol.bind(this,position)}>
                    </td>
        }
        else switch(symbol)
        {
            case "X":
                cell = <td style={{color:'blue', width:adjustedwidth,height:adjustedheight,fontSize:adjustedfontSize}}>X</td>
                break;
            case "O":
                cell = <td style={{color:'red',width:adjustedwidth,height:adjustedheight,fontSize:adjustedfontSize}}>O</td>
                break;
            default:
                cell = <td style={{width:adjustedwidth,height:adjustedheight,fontSize:adjustedfontSize}}>{symbol}</td>;
        }
        return(    
            cell
        ) 
    };
}

export default Cell;