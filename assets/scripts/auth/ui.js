const store = require('./../store')
const storeGame = require('./../store-game.js')

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
}

const onSignInFailure = function () {
  $('#message').text('Sign in FAILED try again')
}

const onSignOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#row-Board').hide()
  $('#get-games').hide()
  $('#new-game').hide()
  $('#sign-up').show()
  $('#sign-in').show()
  store.user = null
}

const onSignOutFailure = function (error) {
  $('#message').text('Error on sign out')
  console.error('signOutFailure ran. Error is :', error)
}

const onChangePasswordSuccess = function () {
  $('#message').text('Changed password successfully')
  $('#change-password-form').trigger('reset')
}

const onChangePasswordFailure = function (error) {
  $('#message').text('Error on change password')
  console.error('changePasswordFailure ran. Error is :', error)
}

const onCreateGameSuccess = function (response) {
  storeGame.id = response.game._id
  $('#message').text('New Game Created!')
  $('#board').show()
}

const onCreateGameFailure = function (error) {
  $('#message').text('Create Game Unsuccessful')
  console.log('error is ', error)
  console.log('Could not create new game')
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
  onCreateGameFailure
}
