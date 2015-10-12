/**
 * @author Vecko
 * Última modificación: Mayo 24, 2015.
 */

/**
 * Mantiene las cuatro direcciones posibles hacia donde se pueden mover los objetos.
 */
var Direction = {
	DOWN : 0,
	LEFT : 1,
	RIGHT: 2,
	UP	 : 3,
};

/**
 * Arreglo de objetos Square que comparten el mismo color y tamaño. Contiene al menos un elemento.
 * @param {Object} x	 Posición inicial en el eje de las abscisas del primer objeto Square.
 * @param {Object} y	 Posición inicial en el eje de las ordenadas del primer objeto Square.
 * @param {Object} size	 Ancho o alto de los objetos Square.
 * @param {Object} color Color de relleno de los objetos Square.
 */
function Snake(x, y, size, color) {
	var direction,
		listOfSquares,
		newX,
		newY;
	
	this.getX = function() { return x; };
	this.setX = function(newX) { x = newX; };
	this.getY = function() { return y; };
	this.setY = function(newY) { y = newY; };
	this.getColor = function() { return color; };
	this.setColor = function(newColor) { color = newColor; };
	this.getDirection = function() { return direction; };
	this.setDirection = function(newDirection) { direction = newDirection; };
	this.getListOfSquares = function() { return listOfSquares; };
	this.getNewX = function() { return newX; };
	this.setNewX = function(newNewX) { newX = newNewX;	};
	this.getNewY = function() { return newY; };
	this.setNewY = function(newNewY) { newY = newNewY;	};
	
	direction = -1;
	listOfSquares = [];
	listOfSquares.push(new Square(x, y, size, color));
	newX = 10;
	newY = 10;
}

/**
 * Devuelve true cuando el primer elemento del arreglo está en la misma posición que cualquier otro elemento del arreglo.
 */
Snake.prototype.crashWithMyself = function() {
	for (var i = 1; i < this.getListOfSquares().length; i++) {
		if (this.getNewX() == this.getListOfSquares()[i].getX() &&
			this.getNewY() == this.getListOfSquares()[i].getY())
			return true;
	}
};

/**
 * Devuelve true si la posición del primer elemento del arreglo es menor a cero en cualquier eje o
 * mayor a alguno de los limites pasados como parámetros.
 * @param {Object} width  Limite horizontal.
 * @param {Object} height Limite vertical.
 */
Snake.prototype.crashWithTheWall = function(width, height) {
	return (this.getNewX() <= -1 || this.getNewX() >= width / this.getListOfSquares()[0].getSize()
	|| this.getNewY() <= -1 || this.getNewY() >= height / this.getListOfSquares()[0].getSize());
};

/**
 * Dibuja el arreglo en el contexto pasado como parámetro.
 * @param {Object} context Contexto de dibujo, como el de un canvas, por ejemplo.
 */
Snake.prototype.draw = function(context) {
	for (var i = 0; i < this.getListOfSquares().length; i++) {
		this.getListOfSquares()[i].draw(context);
	}
};

/**
 * Devuelve true cuando el primer elemento del arreglo se encuentra en la misma posición que el objeto
 * pasado como parámetro.
 * @param {Object} food Objeto en el mismo contexto de dibujo.
 */
Snake.prototype.eat = function(food) {
	return (this.getNewX() == food.getX() && this.getNewY() == food.getY());
};

/**
 * Desplaza el arreglo una cantidad de píxeles igual al valor de size pasado en el constructor,
 * de acuerdo al valor de la dirección que mantiene el objeto.
 */
Snake.prototype.move = function() {
	var tail = this.getListOfSquares().pop();
	switch(this.getDirection()) {
		case Direction.DOWN:
			this.setNewY(this.getNewY() + 1);
			break;
		case Direction.LEFT:
			this.setNewX(this.getNewX() - 1);
			break;
		case Direction.RIGHT:
			this.setNewX(this.getNewX() + 1);
			break;
		case Direction.UP:
			this.setNewY(this.getNewY() - 1);
			break;	
	}
	tail.setX(this.getNewX());
	tail.setY(this.getNewY());
	this.getListOfSquares().unshift(tail);
};

/**
 * Prepara el arreglo para el siguiente movimiento.
 */
Snake.prototype.update = function() {
	this.setNewX(this.getListOfSquares()[0].getX());
	this.setNewY(this.getListOfSquares()[0].getY());
};
