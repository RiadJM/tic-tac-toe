'use strict'
const events = require('./auth/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-out').hide()
  $('#change-password-form').hide()
  $('#create-game').hide()
  $('#board').hide()
  $('#restart-game').hide()
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#sign-out').on('submit', events.onSignOut)
  $('#change-password-form').on('submit', events.onChangePassword)
  $('#create-game').on('submit', events.onCreateGame)
  $('.box').on('click', events.onBoxClick)
  $('#get-games').on('submit', events.onGetAllGames)
  $('#restart-game').on('submit', events.onRestartGame)
})
