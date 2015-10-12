/**
 * @author Vecko
 * Última modificación: Mayo 24, 2015.
 */

/**
 * Cuadrado con un color de relleno solido con inicio en el punto (x, y).
 * @param {Object} x	 Coordenada inicial en el eje de las abscisas.
 * @param {Object} y	 Coordenada inicial en el eje de las ordenadas.
 * @param {Object} size	 Ancho o alto del cuadrado.
 * @param {Object} color Color de relleno.
 */
function Square(x, y, size, color) {
	this.getX = function() { return x; };
	this.setX = function(newX) { x = newX; };
	this.getY = function() { return y; };
	this.setY = function(newY) { y = newY; };
	this.getSize = function() { return size; };
	this.setSize = function(newSize) { size = newSize; };
	this.getColor = function() { return color; };
	this.setColor = function(newColor) { color = newColor; };
}

/**
 * Dibuja el cuadrado en el contexto pasado como parámetro.
 * @param {Object} context Contexto de dibujo, como el de un canvas, por ejemplo.
 */
Square.prototype.draw = function(context) {
	context.fillStyle = this.getColor();
	context.fillRect(this.getX() * this.getSize(), this.getY() * this.getSize(), this.getSize(), this.getSize());
};