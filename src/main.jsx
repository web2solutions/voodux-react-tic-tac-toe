/* globals document */

// import React
import React from 'react'
import ReactDOM from 'react-dom'

// import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'


// import React app
import App from './App.jsx'

// import voodux
import voodux from 'voodux'

import { FoundationProvider } from './FoundationContext.jsx'
import GameProvider from './GameProvider.jsx'


// import data schemas

import PlayerSchema from './schemas/Player.jsx'
import MatchSchema from './schemas/Match.jsx'

// foundation event handlers
import onApplicationStart from './events/onApplicationStart'

(async () => {
  const foundation = new voodux.Foundation({
    name: 'React Tic Tac Toe',
    schemas: {
      Player: PlayerSchema,
      Match: MatchSchema
    }
  })
  
  const appStartListener = foundation.on('foundation:start', onApplicationStart.bind(foundation))
  
  window.addEventListener('unload', (event) => {
    foundation.stopListenTo(appStartListener)
  })

  const start = await foundation.start()
  if (start.error) {
    throw new Error(`Error starting foundation stack: ${start.error}`)
  }

  // console.debug('start', start)
  ReactDOM.render(
    <FoundationProvider value={foundation}>
      <GameProvider foundation={foundation}>
        <App  />
      </GameProvider>
    </FoundationProvider>,
    document.getElementById('root')
  )
})()
