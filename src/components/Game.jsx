import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"

// import FoundationContext from '../FoundationContext.jsx'
import GameContext from '../GameContext.jsx'
// import Square from './Square'


function Square({ value, onClick }) {

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}


export default function Game() {
  const history = useHistory()
  const context = useContext(GameContext)
  const players = context.players
  const winner = context.checkWinner(context.squares)

  React.useEffect(async () => {
    let msg = null
    if (winner) {
      msg = 'Winner: ' + winner.player.name
    } else if (isBoardFull(context.squares)) {
      msg = 'Draw!'
    } else {
      msg = 'Next player: ' + players.get(context.currentlyPlayer).player.name
    }
    document.getElementById('game-info').innerText = msg
    document.getElementById(`player1`).classList.remove('active-player')
    document.getElementById(`player2`).classList.remove('active-player')
      
    document.getElementById(`player${context.currentlyPlayer}`).classList.add('active-player')

    if (winner) {
      await context.saveMatch(winner)
    }
    if(msg === 'Draw!') {
      await context.saveMatch()
    }

    // Especifique como limpar depois desse efeito:
    return function cleanup() {
      // 
    };
  }, [context.currentlyPlayer]);


  function play(i) {    
    if (context.squares[i] != null || winner != null) {
      return
    }
    const nextSquares = context.squares.slice()
    nextSquares[i] = players.get(context.currentlyPlayer).symbol 
    context.setSquares(nextSquares)
    context.setCurrentlyPlayer(context.currentlyPlayer === 1 ? 2 : 1)
  }

  function renderSquare(i) {
    return (
      <Square
        value={context.squares[i]}
        onClick={() => (async => {
          play(i)
        })()}
      />
    )
  }

  function renderRestartButton() {
    return (
      <button className="restart" onClick={() => {
        context.createMatch()
      }}>
        Play again
      </button>
    )
  }

  function renderRankButton() {
    return (
      <button className="restart" onClick={() => {
        history.push('/Rank')
      }}>
        Rank
      </button>
    )
  }

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 mx-auto">
          <div id="game-info" className="game-info"></div>
        </div>
      </div>
      <div className="row">
        <div id="player1" className="col-sm-12 col-md-3 player-info">
          {context.player1.name}
        </div>
        <div className="col-sm-12 col-md-5 mx-auto">
          <div className="game">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        </div>
        <div id="player2" className="col-sm-12 col-md-3 player-info">
          {context.player2.name}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3"> </div>
        <div className="col-sm-12 col-md-5 mx-auto">
          <div className="restart-button">{renderRestartButton()}{renderRankButton()}</div>
        </div>
        <div className="col-sm-12 col-md-3"></div>
      </div>
    </div>
  )
}



function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false
    }
  }
  return true
}
