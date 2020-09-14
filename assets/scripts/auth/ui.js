const store = require('./../store')
const storeGame = require('./../store-game.js')
const api = require('./api')

const onSignUpSuccess = function (response) {
  $('#message').text('Thanks for signing up ' + response.user.email)
  $('#sign-up-form').trigger('reset')
  $('#sign-up-form').hide()
}

const onSignUpFailure = function () {
  $('#message').text('Sign up FAILED try again')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  $('#message').text('Thank you for signing in ' + response.user.email)
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').hide()
  $('#sign-in-form').hide()
  $('#sign-out').show()
  $('#change-password-form').show()
  $('#create-game').show()
  $('#get-games').show()
}

const onSignInFailure = function () {
  $('#message').text('Sign in FAILED try again')
}

const onSignOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#sign-out').hide()
  $('#change-password-form').hide()
  $('#board').hide()
  $('#get-games').hide()
  $('#create-game').hide()
  $('#sign-up-form').show()
  $('#sign-in-form').show()
  $('#restart-game').hide()
  $('#player-turn').hide()
  store.user = null
}

const onSignOutFailure = function () {
  $('#message').text('Error on sign out')
}

const onChangePasswordSuccess = function () {
  $('#message').text('Changed password successfully')
  $('#change-password-form').trigger('reset')
}

const onChangePasswordFailure = function () {
  $('#message').text('Error on change password')
}

const onCreateGameSuccess = function (response) {
  storeGame.id = response.game._id
  $('#message').text('New Game Created!')
  $('#board').show()
  $('#change-password-form').hide()
  $('#create-game').hide()
  $('#player-turn').show()
  $('#player-turn').text('Current player: X')
  $('get-games').hide()
}

const onCreateGameFailure = function () {
  $('#message').text('Create Game Unsuccessful')
  $('#message-failure').show()
  $('#message-failure').text('Create Game Unsuccessful!')
}

const onGetAllGamesSuccess = function (response) {
  $('#get-games-message').text('You have played ' + response.games.length + ' games so far!')
  $('#get-games-message').show()
  $('#get-games-message').hide(3000)
}

const onGetAllGamesFailure = function (error) {
  storeGame.error = error
  $('#board').hide()
  $('#get-games').text('Game History Unsuccessful')
}

const gameStage = {
  playerTurn: 'X',
  board: ['', '', '', '', '', '', '', '', '']
}
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const checkWinner = function () {
  return winArray.some(row => {
    return row.every(index => {
      return gameStage.board[index].includes(gameStage.playerTurn)
    })
  })
}

const onClickSuccess = function (boxId) {
  if ($('#' + boxId).text().length === 0) {
    gameStage.board[boxId] = gameStage.playerTurn
    $('#' + boxId).text(gameStage.playerTurn)
    $('#message-failure').hide()

    if (checkWinner(gameStage)) {
      $('#message').text('Player ' + gameStage.playerTurn + ' WINS!')
      $('#player-turn').hide()
      $('.board').hide()
      $('#restart-game').show()
      $('#get-games').show()
      api.updateGame(boxId, gameStage.playerTurn, true)
    } else if (gameStage.board.every(a => a === 'X' || a === 'O')) {
      // check tie

      $('#message').text('Tie Game!')
      $('#player-turn').hide()
      $('.board').hide()
      $('#restart-game').show()
      api.updateGame(boxId, gameStage.playerTurn, true)
    } else {
      // keep playing

      api.updateGame(boxId, gameStage.playerTurn, false)
    }

    // rotate turn
    gameStage.playerTurn = gameStage.playerTurn === 'X' ? 'O' : 'X'
    $('#player-turn').text('Current player: ' + gameStage.playerTurn)
  } else {
    $('#message-failure').show()
    $('#message-failure').text('Invalid Move')
  }
}

const onRestartSuccess = function (response) {
  storeGame.id = response.game._id
  gameStage.playerTurn = 'X'
  gameStage.board = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  $('#message').show()
  $('#message-failure').hide()
  $('#message').text('Game Restarted!')
  $('.board').show()
  $('#player-turn').show()
  $('#player-turn').text('Current player: X')
  $('#get-games').show()
}

const onRestartFailure = function () {
  $('#message').text('Restart Game Unsuccessful')
  $('#message-failure').show()
  $('#message-failure').text('Restart Game Unsuccessful!')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onClickSuccess,
  onRestartSuccess,
  onRestartFailure
}
