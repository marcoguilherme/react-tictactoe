import React, { Component } from 'react';

//  Functional component was used because, this kind of component,
//  are just use to render and does not set any value 
function Square(props) {
    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={()=>{this.props.onClick(i)}}
            />
        );
    }

    render() {      
        return(
            <div>
                <div className="board-now">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-now">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-now">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null) //Create an array with 9 indexes and set then null
            }],
            xIsNext: true //Switch to define who plays next
        }
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //Make a copy of the array state
        
        if(calculateWinner(squares) || squares[i]){
            return; //Stop the execution
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Set the value of index
        this.setState({
            history : history.concat([{
                squares: squares, //Rebuild the array just setting a single value time by time
            }]),
            xIsNext: !this.state.xIsNext //Set xIsNext to false
        });
    }
    
    render(){
        const history = this.state.history;
        const current = history[history.length -1];
        const winner = calculateWinner(current.squares);
        
        let status;
        if(winner){
            status = 'Winner' + winner;
        }else{
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares} 
                        onClick={(i)=> this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

//=============================================

export default Game;

