    class CheckWin
    {
        //check to see if you won,lost,or tied
        //Lost = 0, Tied = 1, Won = 2
        static gameEnd(symbols,latestMove,selectedX)
        {
            let diagonal1 = "";
            let diagonal2 = "";

            for(let i=0;i<3;i++)
            {
                //diagonals
                diagonal1 += symbols[4*i];
                diagonal2 += symbols[2*i+2];

                let horizontals = "";
                let verticals = "";
                for(let j=0;j<3;j++)
                {
                    //horizontals
                    horizontals += symbols[3*i+j];
                    //verticals
                    verticals += symbols[i+3*j];
                }
                //check to see if horizontals,and verticals have 3 in a row
                let horizontalV = this.validateWin(horizontals,latestMove,selectedX);
                let verticalV = this.validateWin(verticals,latestMove, selectedX);
                if(horizontalV!==undefined)
                    return horizontalV;
                if(verticalV !==undefined)
                    return verticalV;
            }
            //check to see if diagonals have 3 in a row
            let diagonalV1 = this.validateWin(diagonal1,latestMove,selectedX);
            let diagonalV2 = this.validateWin(diagonal2,latestMove,selectedX);
            
            if(diagonalV1 !==undefined)
                return diagonalV1;
            if(diagonalV2 !==undefined)
                return diagonalV2;
            
            //check for tie
            if(symbols.filter(symbol => (symbol!=='X'||symbol!=='O')).length===9)
                return 1;
        }

        //check to see if the we have three in a row
        static validateWin(direction,latestMove,selectedX)
        {
            if(direction==="XXX"||direction==="OOO")
                {

                    //Win if not your turn
                    if((!latestMove && selectedX)||(latestMove && !selectedX))
                    {
                        return 2;
                    }
                    //Loss if it is your turn
                    else
                    {
                        return 0;
                    }
                }
        }
    }
    export default CheckWin;