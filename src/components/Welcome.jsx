/* global  */
import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert2'
import {
  sha512
}
from 'js-sha512'

import FoundationContext from '../FoundationContext.jsx'
import GameContext from '../GameContext.jsx'



async function createPlayer(Model, doc) {
  const response = await Model.add(doc)
  return response
}



export default function Welcome() {
  const foundation = useContext(FoundationContext)
  const context = useContext(GameContext)
  const { Player } = foundation.data

  const history = useHistory()

  const handleStart = (e) => {
    e.preventDefault()
    askNamePlayer()
  }
  const handleRank = (e) => {
    e.preventDefault()
    history.push('/Rank')
  }
  const askNamePlayer = async (currentlyPlayer = 1) => {
    const { value: name } = await swal.fire({
      title: `Enter the name for player #${currentlyPlayer}`,
      input: 'text',
      inputLabel: 'Your name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    if (name) {
      const { error, data } = await Player.find({ name })
      if (data[0]) {
        confirmPasswordPlayer(data[0], currentlyPlayer)
        return
      } else {
        askPasswordPlayer(name.toString().trim(), currentlyPlayer)
      }
    }
  }


  const askPasswordPlayer = async (name, currentlyPlayer) => {
    const { value: password } = await swal.fire({
      title: `Enter the password for player #${currentlyPlayer}`,
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 10,
        minlength: 3,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    
    if (password) {
      const doc = {
        name,
        password: sha512.hex(password.toString().trim())
      }
      const r = await createPlayer(Player, doc)
      // console.log(r)
      if (r.error) {
        swal.fire('Could not create Player #1', r.error.message, 'error')
        return
      }
      if (currentlyPlayer === 1) {
        context.setPlayer1(r.data)
        context.setCurrentlyPlayer(2)
        askNamePlayer(2)
      } else if (currentlyPlayer === 2) {
        context.setPlayer2(r.data)
        
        ;(async () => {
          await context.createMatch()
          swal.fire('The game is starting')
          setTimeout(() => {
            history.push('/Game')
            swal.close()
          }, 1000);
        })()
      }
    }
  }

  const confirmPasswordPlayer = async (player, currentlyPlayer) => {
    const { value: password } = await swal.fire({
      title: `Enter the password for player #${currentlyPlayer}`,
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    
    if (password) {
      let pass = sha512.hex(password.toString().trim())
      if (pass === player.password) {
        if (currentlyPlayer === 1) {
          context.setPlayer1(player)
          context.setCurrentlyPlayer(2)
          askNamePlayer(2)
        } else if (currentlyPlayer === 2) {
          context.setPlayer2(player)
          
          ;(async () => {
            await context.createMatch()
            swal.fire('The game is starting')
            setTimeout(() => {
              history.push('/Game')
              swal.close()
            }, 1000);
          })()
        }
      } else {
        swal.fire('Error', 'wrong password', 'error')
      }
    }
  }

  return (
    <>
      <div className="welcome">
        <div className="join">
          <a className="btn b-1" onClick={handleStart}>start</a>
          <a className="btn b-1" onClick={handleRank}>rank</a>
        </div>
      </div>
    </>
  )
}
