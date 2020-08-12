import { Direction, Snake } from './Snake'
import Square from './Square'

/**
 * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
 * leer los eventos del teclado para controlar la nave del jugador.
 */
export default class Game {
  /**
   * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
   * leer los eventos del teclado para controlar la nave del jugador.
   * @param {string} idCanvas Lienzo donde dibujar el juego.
   */
  constructor (idCanvas) {
    this.canvas = document.getElementById(idCanvas)
    this.canvas.width = 800
    this.canvas.height = 600
    this.canvas.style.backgroundColor = 'black'
    this.canvas.style.position = 'absolute'
    this.div = document.createElement('div')
    this.div.style.display = 'none'
    this.div.style.width = '800px'
    this.div.style.top = this.canvas.offsetTop
    this.div.style.left = this.canvas.offsetLeft
    this.div.style.width = this.canvas.width
    this.div.style.height = this.canvas.height
    this.div.style.position = 'absolute'
    this.div.style.textAlign = 'center'
    this.div.style.color = 'yellow'
    this.div.style.fontSize = 'x-large'
    document.body.appendChild(this.div)
    this.downKeyPressed = false
    this.enable = false
    this.gameOver = false
    this.leftKeyPressed = false
    this.size = 40
    this.rightKeyPressed = false
    this.timer = 0
    this.upKeyPressed = false

    this.initialize()
  }

  /**
   * Genera un objeto Square en una posición aleatoria del canvas, donde actualmente
   * no se encuentre la Serpiente.
   */
  createFood () {
    let x,
      xEquals,
      y,
      yEquals

    do {
      xEquals = false
      x = Math.round(Math.random() * (this.canvas.width - this.size) / this.size)
      for (let i = 0; i < this.snake.listOfSquares.length; i++) {
        xEquals = (x === this.snake.listOfSquares[i].x) || xEquals
      }
    } while (xEquals)
    do {
      yEquals = false
      y = Math.round(Math.random() * (this.canvas.height - this.size) / this.size)
      for (let i = 0; i < this.snake.listOfSquares.length; i++) {
        yEquals = (y === this.snake.listOfSquares[i].y) || yEquals
      }
    } while (yEquals)

    this.food = new Square(x, y, this.size, 'yellow')
  }

  /**
   * Establece todas las propiedades de la clase a su valor inicial.
   */
  initialize () {
    this.score = 0
    this.snake = new Snake(0, 0, this.size, 'blue')
    this.speed = 5
    this.createFood()
  }

  /**
   * Notifica a la instancia de Game cuando una tecla ha sido pulsada.
   * @param {Object} e Tecla pulsada
   */
  keyPress (e) {
    e.preventDefault()
    if (this.gameOver && e.keyCode === 13) {
      this.start()
    } else if (e.keyCode === 37) {
      this.leftKeyPressed = true
      this.upKeyPressed = false
      this.rightKeyPressed = false
      this.downKeyPressed = false
    } else if (e.keyCode === 38) {
      this.upKeyPressed = true
      this.leftKeyPressed = false
      this.rightKeyPressed = false
      this.downKeyPressed = false
    } else if (e.keyCode === 39) {
      this.rightKeyPressed = true
      this.upKeyPressed = false
      this.leftKeyPressed = false
      this.downKeyPressed = false
    } else if (e.keyCode === 40) {
      this.downKeyPressed = true
      this.rightKeyPressed = false
      this.upKeyPressed = false
      this.leftKeyPressed = false
    }
  }

  /**
   * Inicia la ejecución del juego.
   */
  launch () {
    if (this.enable) {
      this.run()
    } else {
      this.enable = true
    }
  }

  /**
   * Muestra un mensaje en pantalla para iniciar una nueva partida.
   */
  notify () {
    this.div.innerHTML = 'Has perdido el juego.<br />Presiona ENTER para intentarlo de nuevo.'
    this.gameOver = true
  }

  /**
   * Ciclo principal del juego.
   */
  run () {
    if (this.enable) {
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.snake.draw(this.canvas.getContext('2d'))
      this.food.draw(this.canvas.getContext('2d'))

      if (!this.gameOver) {
        this.snake.update()
        this.snake.move()
        if (this.snake.crashWithTheWall(this.canvas.width, this.canvas.height) ||
          this.snake.crashWithMyself()) {
          this.notify()
        }
        if (this.snake.eat(this.food)) {
          this.food.color = 'blue'
          this.food.x = this.snake.newX
          this.food.y = this.snake.newY
          this.snake.listOfSquares.unshift(this.food)
          this.score += 10
          this.speed += 1
          this.createFood()

          clearInterval(this.timer)
          this.timer = setInterval(() => this.launch(), 1000 / this.speed)
        }
      }
      if (this.gameOver) {
        this.div.style.display = 'block'
      } else {
        this.div.style.display = 'none'
      }
      this.canvas.getContext('2d').fillStyle = 'yellow'
      this.canvas.getContext('2d').font = 'bold 20px monospace'
      this.canvas.getContext('2d').fillText(this.score + ' Puntos', this.canvas.width - 120, 30)
      if (this.downKeyPressed && !this.leftKeyPressed && !this.rightKeyPressed && !this.upKeyPressed) {
        this.snake.direction = Direction.DOWN
      } else if (this.leftKeyPressed && !this.downKeyPressed && !this.rightKeyPressed && !this.upKeyPressed) {
        this.snake.direction = Direction.LEFT
      } else if (this.rightKeyPressed && !this.downKeyPressed && !this.leftKeyPressed && !this.upKeyPressed) {
        this.snake.direction = Direction.RIGHT
      } else if (this.upKeyPressed && !this.downKeyPressed && !this.leftKeyPressed && !this.rightKeyPressed) {
        this.snake.direction = Direction.UP
      }
    }
  }

  /**
   * Establece todas las propiedades de la clase a su valor inicial para iniciar una nueva partida.
   */
  start () {
    this.initialize()
    this.downKeyPressed = false
    this.gameOver = false
    this.leftKeyPressed = false
    this.rightKeyPressed = false
    this.upKeyPressed = false

    clearInterval(this.timer)
    this.timer = setInterval(() => this.launch(), 1000 / this.speed)
  }
}
