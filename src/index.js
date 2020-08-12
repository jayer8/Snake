import Game from './Game'

const game = new Game('context')
const button = document.getElementById('stop')

/**
 * Inicia una nueva instancia de la clase Game, enlaza los eventos del teclado
 * y pinta el escenario de acuerdo a la velocidad en el objeto Game.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.onkeydown = function (e) {
    game.keyPress(e)
  }
  game.timer = setInterval(function () { game.launch() }, 1000 / game.speed)
})

/**
 * Detiene la ejecución del juego.
 */
button.addEventListener('click', function () {
  clearInterval(game.timer)
})
