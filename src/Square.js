/**
 * Cuadrado con un color de relleno solido con inicio en el punto (x, y).
 */
export default class Square {
  /**
   * Cuadrado con un color de relleno solido con inicio en el punto (x, y).
   * @param {number} x     Coordenada inicial en el eje de las abscisas.
   * @param {number} y     Coordenada inicial en el eje de las ordenadas.
   * @param {number} size  Ancho o alto del cuadrado.
   * @param {string} color Color de relleno.
   */
  constructor (x, y, size, color) {
    /**
     * Coordenada inicial en el eje de las abscisas
     * @type {number}
     */
    this.x = x
    /**
     * Coordenada inicial en el eje de las ordenadas
     * @type {number}
     */
    this.y = y
    /**
     * Ancho o alto del cuadrado
     * @type {number}
     */
    this.size = size
    /**
     * Color de relleno
     * @type {string}
     */
    this.color = color
  }

  /**
   * Dibuja el cuadrado en el contexto pasado como parámetro.
   * @param {RenderingContext} context Contexto de dibujo, como el de un canvas, por ejemplo.
   */
  draw (context) {
    context.fillStyle = this.color
    context.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
  }
}
