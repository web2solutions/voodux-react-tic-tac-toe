import React, { useState, useContext } from "react"

import moment from 'moment'

import FoundationContext from '../FoundationContext.jsx'


export default function Rank() {
  const foundation = useContext(FoundationContext)
  const { Match } = foundation.data
  const [ matches, setMatches ] = useState([])

  React.useEffect(() => {
    async function findMatches() {
      const findMatches = await Match.find({})
      if (!findMatches) {
        return
      }
      if (findMatches.data) {
        setMatches(findMatches.data)
      }
    }
    if (matches.length === 0) {
      console.log('finding ')
      findMatches()
    }
  }, []) // run one time only

  return (
    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 main'>
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bcustomer-bottom'>
          <h1 className='h2'>Matches</h1>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Winner</th>
                <th align='right'>Date</th>
              </tr>
            </thead>
            <tbody>
            {matches.map((match) => (
              <tr key={match.__id}>
                <td>{match.status}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.winner === 0 ? 'none' : match.winner}</td>
                <td>{moment(match.date).calendar()}</td>
              </tr>
            ))}
              <tr>
                
              </tr>
            </tbody>
          </table>
        </div>
      </main>
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
