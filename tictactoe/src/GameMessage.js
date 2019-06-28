import React from 'react';
import "./GameMessage.css";

class GameMessage extends React.Component{
    
    render()
    {
        let message;
        let retry;
        if(this.props.gameEnded===true)
        {
            retry = <button className="retry" onClick={this.props.reset}><span>Reset</span></button>;
            switch(this.props.gameCondition)
            {
                case 0:
                    message = <h2>You lost.</h2>;
                    break;
                case 1:
                    message = <h2>You tied.</h2>;
                    break;
                case 2:
                    message = <h2>You Won.</h2>; 
                    break;
                default:
                    message = "";
                    retry = "";

            }
        }
        return(
            <div className="gameMessage">
                {message}
                {retry}
            </div>
        )
    }
}

export default GameMessage;
