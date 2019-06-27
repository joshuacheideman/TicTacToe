import React from 'react';
import './Grid.css';
import Cell from "./Cell.js";

class Grid extends React.Component{
    render()
    {
        return (
    <main className="Grid-main">
        <table class="Grid-table">
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
        </table>      
    </main>
        )
    };
}

export default Grid;