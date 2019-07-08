# TicTacToe

This game of Tic-Tac-Toe was made using React and is available at <https://joshuacheideman.github.io/TicTacToe>.
With this version of Tic-Tac-Toe I have allowed customizable board sizes from 1x1 to 15x15.
The minimax algorithm has also been implemented, but you can only use it on 3x3 boards. Other board sizes computer tiles 
are selected randomly.   

## How to Play

![Photo of the opening page of Tic-Tac-Toe asking to select either an X or an O when starting.](https://github.com/joshuacheideman/TicTacToe/blob/master/images/Startup.png)

When you first start off on the web application, you will notice three different elements. At the top is the header that says
__TicTacToe__. In the middle is an input field where you can enter a value between 1 to 15 that will change the maximum rows and columns
of the playing grid. Finally, at the bottom, you can select between either an __X__ piece or an __O__ piece by clicking on either tile.
Once you have selected a piece, a grid will be displayed like the image below.

![Photo of the Tic-Tac-Toe grid with an option to set .](https://github.com/joshuacheideman/TicTacToe/blob/master/images/Grid.png)

If you did not set a value for the grid size prior to selecting your piece, the grid will automatically be a 3x3 grid.
You can change the grid size even after selecting a piece. Entering a new size into the input field will cause the board to reset.

With the grid, by clicking any of the empty tiles during your turn, you will cause your piece to show up on the board. After you have selected a 
piece, the computer will select their piece. The player that goes first is decided randomly at the start of the match.
Have your piece fill an entire row, column, or diagonal to win.  
