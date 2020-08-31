const config = require('./../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + store.user.token },
    data: data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: { Authorization: 'Bearer ' + store.user.token },
    data: data
  })
}

const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: { Authorization: 'Bearer ' + store.user.token }
  })
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut,
  changePassword: changePassword,
  createGame: createGame
}
