import React from 'react';

class GameMessage extends React.Component{
    
    render()
    {
        let message;
        if(this.props.gameEnded===true)
        {
            switch(this.props.gameCondition)
            {
                case 0:
                    message = "You lost.";
                    break;
                case 1:
                    message = "You tied.";
                    break;
                case 2:
                    message = ("You Won."); 
                    break;
                default:
                    message = "";
            }
        }
        return(
            <h2>{message}</h2>
        )
    }
}

export default GameMessage;
