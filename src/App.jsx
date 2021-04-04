import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import "./App.css";

import Welcome from './components/Welcome.jsx'
import Game from './components/Game.jsx'
import Rank from './components/Rank.jsx'


/**
 * @author José Eduardo Perotta de Almeida <web2solucoes@gmail.com>
 * @function App
 * @description React main component
 */
export default function App (props) {
  
  React.useEffect(() => {
    
    // document.body.click()
    const myAudio = document.getElementById("audioID");
    // myAudio.play()
    document.body.addEventListener('click', function() {
      // myAudio.muted = false;
      // myAudio.play()
    });
    myAudio.onended = function () {
     //  myAudio.play()
    };
  }, [])

  return (
    <Router>
      <div className="main-wrapper">
        <Switch>
          <Route path='/Game'>
            <Game />
          </Route>
          <Route path='/Rank'>
            <Rank />
          </Route>
          <Route path='/'>
            <Welcome />
          </Route>
        </Switch>
      </div>
      <audio controls="controls" id="audioID" muted autoPlay style={{display: 'none'}}>
        <source src="audio1.mp3" type="audio/mp3" />
      </audio>
    </Router>
  )
}
