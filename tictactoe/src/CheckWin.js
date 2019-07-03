    class CheckWin
    {
        //check to see if you won,lost,or tied
        //Lost = 0, Tied = 1, Won = 2
        static gameEnd(symbols,latestMove,selectedX,size)
        {
            let diagonal1 = "";
            let diagonal2 = "";

            for(let i=0;i<size;i++)
            {
                //diagonals
                diagonal1 += symbols[(size+1)*i];
                diagonal2 += symbols[(size-1)*i+(size-1)];

                let horizontals = "";
                let verticals = "";
                for(let j=0;j<size;j++)
                {
                    //horizontals
                    horizontals += symbols[size*i+j];
                    //verticals
                    verticals += symbols[i+size*j];
                }
                //check to see if horizontals,and verticals have n in a row
                let horizontalV = this.validateWin(horizontals,latestMove,selectedX,size);
                let verticalV = this.validateWin(verticals,latestMove, selectedX,size);
                if(horizontalV!==undefined)
                    return horizontalV;
                if(verticalV !==undefined)
                    return verticalV;
            }
            //check to see if diagonals have n in a row
            let diagonalV1 = this.validateWin(diagonal1,latestMove,selectedX,size);
            let diagonalV2 = this.validateWin(diagonal2,latestMove,selectedX,size);
            
            if(diagonalV1 !==undefined)
                return diagonalV1;
            if(diagonalV2 !==undefined)
                return diagonalV2;
            
            //check for tie
            if(symbols.filter(symbol => (symbol!=='X'||symbol!=='O')).length===Math.pow(size,2))
                return 1;
        }

        //check to see if the we have three in a row
        static validateWin(direction,latestMove,selectedX,size)
        {
            if(direction==="X".repeat(size)||direction==="O".repeat(size))
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