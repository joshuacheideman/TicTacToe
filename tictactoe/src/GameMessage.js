import React from 'react';
import "./GameMessage.css";
import Grid from "./Grid.js";

class GameMessage extends React.Component{
    
    render()
    {
        let message;
        let messageblock=null;
        let retry;
        if(this.props.gameEnded===true)
        {
            retry = <button className="retry" onClick={Grid.resetGrid}><span>Reset</span></button>;
            switch(this.props.gameCondition)
            {
                case 0:
                    message = <h2>You lost.</h2>;
                    break;
                case 10:
                    message = <h2>You tied.</h2>;
                    break;
                case 20:
                    message = <h2>You Won.</h2>; 
                    break;
                default:
                    message = "";
                    retry = "";
            }
            messageblock = <div className="gameMessage">
                        {message}
                        {retry}
                    </div>
        }
        return(
            messageblock
        )
    }
}

export default GameMessage;
