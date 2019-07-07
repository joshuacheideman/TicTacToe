import CheckWin from "./CheckWin.js";
import Grid from "./Grid.js";

class AI
{
    //will need to return curX and symbols back to the grid
    static playerAI(symbols,curX,size,playerX,switchPlayer)
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
        let value= -Infinity;
        let max = -Infinity;
        let choosenTile; 
        for (let child of node.children)
        {
            value = Math.max(value,this.minimax(child[1],choices.size-1,false,symbols,curX,size,playerX));
            if(value>max)
            {
                max = value;
                choosenTile = child[1];
            }
        }
        symbols[choosenTile.key] = (curX) ? "X": "O";
        curX = !curX;
        return [symbols,curX];
    }
    static minimax(curNode,depth,maxPlayer,symbols,curX,size,playerX)
    {
        symbols[curNode.key] = ((maxPlayer&&playerX)||(!maxPlayer&&!playerX)) ? "O" : "X";
        
        //check if some ending condition occurred return heuristic
        let heuristic = CheckWin.gameEnd(symbols,curX,playerX,3);
        if(heuristic!==undefined)
        {
            symbols[curNode.key]=undefined;

            //adding this to heuristic makes it so defence counters you more
            if(!maxPlayer&&heuristic===20)
                return heuristic+depth;
            return heuristic;
        }
        let node = {};
        let choices = {};
        choices = this.getRemainingTiles(symbols,size);
        node.children = choices;
        let value;
        if(maxPlayer)
        {
            value = -Infinity;
            for (let child of node.children)
            {
                value = Math.max(value,this.minimax(child[1],depth-1,false,symbols,!curX,size,playerX))
            }
        }else{
            value = Infinity;
            for (let child of node.children)
            {
                value = Math.min(value,this.minimax(child[1],depth-1,true,symbols,!curX,size,playerX))
            }
        }
        symbols[curNode.key]=undefined;
        return value;
    }
}
export default AI;