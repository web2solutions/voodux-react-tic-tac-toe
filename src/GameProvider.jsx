import React from 'react'
import swal from 'sweetalert2'

import FoundationContext from './FoundationContext.jsx'


import GameContext from './GameContext.jsx'

function getPlayerBySymbol(symbol, state){
  const p1 = state.players.get(1)
  const p2 = state.players.get(2)
  if (symbol ===  p1.symbol) {
    return p1
  } else if (symbol ===  p2.symbol) {
    return p2
  }
}
const emptMatches = Array(9).fill(null)

export default class GameProvider extends React.Component {
  constructor(props) {
    super()
    // console.log(props)
    this.state = {
      matchId: null,
      players: null,
      squares: emptMatches,
      isXNext: true,
      player1: null,
      player2: null,
      currentlyPlayer: 1,
      matchDoc: {},
      winner: null
    }
  }

    render() {
        return (
          <GameContext.Provider
            value={{
              matchId: this.state.matchId,
              matchDoc:  this.state.matchDoc,
              players: this.state.players,
              squares: this.state.squares,
              isXNext: this.state.isXNext,
              player1: this.state.player1,
              player2: this.state.player2,
              currentlyPlayer: this.state.currentlyPlayer,
              winner: this.state.winner,
              setSquares: squares => {
                this.setState({
                  squares
                });
              },
              setIsXNext: isXNext => {
                this.setState({
                  isXNext
                });
              },
              setPlayer1: player1 => {
                this.setState({
                  player1
                });
              },
              setPlayer2: player2 => {
                this.setState({
                  player2
                });
              },
              setCurrentlyPlayer: n => {
                // console.warn('>>>>>>>', n)
                this.setState({
                  currentlyPlayer: n
                })
                // console.log('<<<<<<<<<', this.state.currentlyPlayer)
              },
              createMatch: async () => {
                const { Match } = this.props.foundation.data
                // start reset
                this.setState({
                  currentlyPlayer: 1
                })
                this.setState({
                  squares: emptMatches
                })
                this.setState({
                  isXNext: true
                })
                // end reset
                const { error, data } = await Match.add({
                  player1: this.state.player1.__id,
                  player2: this.state.player2.__id,
                })
                if (error) {
                  swal.fire('Could not create Match', error.message, 'error')
                  return
                }
                this.setState({
                  matchId: data.__id
                })
                this.setState({
                  matchDoc: data
                })
                // console.warn('>>>>>>>', this.state.player1)
                // console.warn('>>>>>>>', this.state.player2)
                if (this.state.players == null) {
                  const players = new Map()
                  players.set(1, {
                    symbol: 'X',
                    player: this.state.player1
                  })
                  players.set(2, {
                    symbol: 'O',
                    player: this.state.player2
                  })
                  this.setState({
                    players
                  })
                }
              },
              getPlayerBySymbol: (symbol) => {
                const p1 = this.state.players.get(1)
                const p2 = this.state.players.get(2)
                if (symbol ===  p1.symbol) {
                  return p1
                } else if (symbol ===  p2.symbol) {
                  return p2
                }
              },
              saveMatch: async winner => {
                if (winner) {
                  this.setState({
                    winner
                  })
                }
                const {
                  Match
                } = this.props.foundation.data
                const doc = {
                  __id: this.state.matchId,
                  _id: this.state.matchDoc._id,
                  id: this.state.matchDoc.id,
                  player1: this.state.player1.__id,
                  player2: this.state.player2.__id,
                  status: 'end',
                  winner: winner ? winner.player.__id : 0,
                  matches: [...this.state.squares]
                }
                console.log(this.state.matchId, doc)
                const {
                  error,
                  data
                } = await Match.edit(this.state.matchId, doc)
                console.log({ error, data })
                if (error) {
                  swal.fire('Could not create save match', error.message, 'error')
                  // return
                }
              },
              checkWinner: () => {
                const possibleLines = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6]
                ]
                
                for (let i = 0; i < possibleLines.length; i++) {
                  const [a, b, c] = possibleLines[i]
                  if (this.state.squares[a]) {
                    if (this.state.squares[a] === this.state.squares[b]) {
                      if (this.state.squares[a] === this.state.squares[c]) {
                        return getPlayerBySymbol(this.state.squares[a], this.state)
                      }
                    }
                  }
                }
                
                return null
              }
            }}
          >
            {this.props.children}
          </GameContext.Provider>
        )
    }
}
