import CheckWin from "./CheckWin.js";
import Grid from "./Grid.js";

class AI
{
    //will need to return curX and symbols back to the grid
    static playerAI(symbols,curX,size,playerX)
    {
        if((!curX&&playerX)||(curX&&!playerX))
        {
           if(size!==3)
                [symbols,curX] = this.randomAI(symbols,curX,size);
            else
            {
                [symbols,curX] = this.advancedAI(symbols,curX,size,playerX);
            }
        }
        let won = CheckWin.DidWin(symbols,curX,playerX,size);
        Grid.switchPlayer(symbols,curX,won);
        return;
    }

    static randomAI(symbols,curX,size)
    {
        let choices;
        choices = this.getRemainingTiles(symbols,size);
        let random = Math.floor(Math.random()*choices.size);
        symbols[choices.get(random).key] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }

    static getRemainingTiles(symbols,size)
    {
        let choices = new Map();
        for(let i=0;i<Math.pow(size,2);i++)
        {
            if(symbols[i]!=='X'&&symbols[i]!=='O')
            {
                choices.set(choices.size,{key:i});
            }
        }
        return choices;
    }
    
    static advancedAI(symbols,curX,size,playerX)
    {
        let node = {};
        let choices = {};
        choices = this.getRemainingTiles(symbols,size);
        node.children = choices;

        let [,choosenKey] = this.minimax(choices.size,true,symbols,curX,size,playerX);
        symbols[choosenKey] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }
    static checkHeuristic(symbols,curX,playerX,depth)
    {
        //check if some ending condition occurred return heuristic
        let heuristic = CheckWin.gameEnd(symbols,curX,playerX,3);
         //adding this to heuristic makes it so defence counters you more
        if(((curX||!playerX)&&!curX||playerX)&&heuristic===20)
            return heuristic+depth;
        return heuristic;
    }
    static minimax(depth,maxPlayer,symbols,curX,size,playerX)
    {   
        //check heuristic
        let heuristic = this.checkHeuristic(symbols,!curX,playerX,depth);
        if(heuristic!==undefined)
        {
            return [heuristic];
        }
        let node = {};
        let choices = {};
        choices = this.getRemainingTiles(symbols,size);
        node.children = choices;
        let value;
        if(maxPlayer)
        {
            value = -Infinity;
            let max = -Infinity;
            let childkey;
            for (let child of node.children)
            {
                symbols[child[1].key] = ((maxPlayer&&playerX)||(!maxPlayer&&!playerX)) ? "O" : "X";
                
                value = Math.max(value,this.minimax(depth-1,false,symbols,!curX,size,playerX)[0])
                if(max<value){
                    max = value;
                    childkey = child[1].key;
                }
                symbols[child[1].key] = undefined;
            }
            return [value,childkey];
        }else{
            value = Infinity;
            for (let child of node.children)
            {
                symbols[child[1].key] = ((maxPlayer&&playerX)||(!maxPlayer&&!playerX)) ? "O" : "X";

                value = Math.min(value,this.minimax(depth-1,true,symbols,!curX,size,playerX)[0]);

                symbols[child[1].key] = undefined;

            }
            return [value];
        }
    }
}
export default AI;