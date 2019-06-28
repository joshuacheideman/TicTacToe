import React from 'react';

class GameMessage extends React.Component{
    
    render()
    {
        let message;
        let retry;
        if(this.props.gameEnded===true)
        {
            retry = <button onClick={this.props.reset}>Reset</button>;
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
            <div>
                {message}
                {retry}
            </div>
        )
    }
}

export default GameMessage;
