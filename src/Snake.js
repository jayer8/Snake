import Square from './Square'

/**
 * Mantiene las cuatro direcciones posibles hacia donde se pueden mover los objetos.
 */
export const Direction = {
  DOWN: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3
}

/**
 * Arreglo de objetos Square que comparten el mismo color y tamaño. Contiene al menos un elemento.
 */
export class Snake {
  /**
   * Arreglo de objetos Square que comparten el mismo color y tamaño. Contiene al menos un elemento.
   * @param {number} x     Posición inicial en el eje de las abscisas del primer objeto Square.
   * @param {number} y     Posición inicial en el eje de las ordenadas del primer objeto Square.
   * @param {number} size  Ancho o alto de los objetos Square.
   * @param {string} color Color de relleno de los objetos Square.
   */
  constructor (x, y, size, color) {
    /**
     * Posición inicial en el eje de las abscisas del primer objeto Square
     * @type {number}
     */
    this.x = x
    /**
     * Posición inicial en el eje de las ordenadas del primer objeto Square
     * @type {number}
     */
    this.y = y
    /**
     * Color de relleno de los objetos Square
     * @type {string}
     */
    this.color = color
    /**
     * Dirección hacia donde se mueve la serpiente
     * @type {number}
     */
    this.direction = -1
    /**
     * Cuerpo de la serpiente
     * @type {Array}
     */
    this.listOfSquares = [new Square(x, y, size, color)]
    /**
     * Número de pixeles que avanza la serpiente en el eje x durante cada movimiento
     * @type {number}
     */
    this.newX = 10
    /**
     * Número de pixeles que avanza la serpiente en el eje y durante cada movimiento
     * @type {number}
     */
    this.newY = 10
  }

  /**
   * Devuelve true cuando el primer elemento del arreglo está en la misma posición que cualquier otro elemento del arreglo.
   * @return {boolean} true Si la serpiente ha chocado consigo misma, false en caso contrario
   */
  crashWithMyself () {
    for (let i = 1; i < this.listOfSquares.length; i++) {
      if (this.newX === this.listOfSquares[i].x && this.newY === this.listOfSquares[i].y) {
        return true
      }
    }
    return false
  }

  /**
   * Devuelve true si la posición del primer elemento del arreglo es menor a cero en cualquier eje o
   * mayor a alguno de los limites pasados como parámetros.
   * @param {number} width  Limite horizontal.
   * @param {number} height Limite vertical.
   * @return {boolean} true Si la posición de la cabeza de la serpiente ha salido del escenario,
   * false en caso contrario
   */
  crashWithTheWall (width, height) {
    return (this.newX <= -1 ||
      this.newX >= width / this.listOfSquares[0].size ||
      this.newY <= -1 ||
      this.newY >= height / this.listOfSquares[0].size)
  }

  /**
   * Dibuja el arreglo en el contexto pasado como parámetro.
   * @param {RenderingContext} context Contexto de dibujo, como el de un canvas, por ejemplo.
   */
  draw (context) {
    for (let i = 0; i < this.listOfSquares.length; i++) {
      this.listOfSquares[i].draw(context)
    }
  }

  /**
   * Devuelve true cuando el primer elemento del arreglo se encuentra en la misma posición que el objeto
   * pasado como parámetro.
   * @param {Square} food Objeto en el mismo contexto de dibujo.
   * @return {boolean} true Si la posición de la comida es la misma que la de la cabeza de la serpiente,
   * false en caso contrario
   */
  eat (food) {
    return (this.newX === food.x && this.newY === food.y)
  }

  /**
   * Desplaza el arreglo una cantidad de píxeles igual al valor de size pasado en el constructor,
   * de acuerdo al valor de la dirección que mantiene el objeto.
   */
  move () {
    const tail = this.listOfSquares.pop()
    switch (this.direction) {
      case Direction.DOWN:
        this.newY += 1
        break
      case Direction.LEFT:
        this.newX -= 1
        break
      case Direction.RIGHT:
        this.newX += 1
        break
      case Direction.UP:
        this.newY -= 1
        break
    }
    tail.x = this.newX
    tail.y = this.newY
    this.listOfSquares.unshift(tail)
  }

  /**
   * Prepara el arreglo para el siguiente movimiento.
   */
  update () {
    this.newX = this.listOfSquares[0].x
    this.newY = this.listOfSquares[0].y
  }
}
