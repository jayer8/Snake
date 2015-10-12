/**
 * @author Vecko
 * Última modificación: Mayo 24, 2015.
 */

/**
 * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
 * leer los eventos del teclado para controlar la nave del jugador. 
 * @param {Object} idCanvas	Lienzo donde dibujar el juego.
 */
function Game(idCanvas) {
	var canvas,
		div,
		downKeyPressed,
		enable,
		food,
		gameOver,
		leftKeyPressed,
		score,
		size,
		snake,
		speed,
		rightKeyPressed,
		timer,
		upKeyPressed;
	
	this.getCanvas = function() { return canvas; };
	this.getDiv = function() { return div; };
	this.isDownKeyPressed = function() { return downKeyPressed; };
	this.setDownKeyPressed = function(newDownKeyPressed) { downKeyPressed = newDownKeyPressed; };
	this.isEnable = function() { return enable; };
	this.setEnable = function(newEnable) { enable = newEnable; };
	this.getFood = function() { return food; };
	this.setFood = function(newFood) { food = newFood; };
	this.isGameOver = function() { return gameOver; };
	this.setGameOver = function(newGameOver) { gameOver = newGameOver; };
	this.isLeftKeyPressed = function() { return leftKeyPressed; };
	this.setLeftKeyPressed = function(newLeftKeyPressed) { leftKeyPressed = newLeftKeyPressed; };
	this.getScore = function() { return score; };
	this.setScore = function(newScore) { score = newScore; };
	this.getSize = function() {return size; };
	this.setSize = function(newSize) { size = newSize; };
	this.getSnake = function() { return snake; };
	this.setSnake = function(newSnake) { snake = newSnake; };
	this.getSpeed = function() { return speed; };
	this.setSpeed = function(newSpeed) { speed = newSpeed; };
	this.isRightKeyPressed = function() { return rightKeyPressed; };
	this.setRightKeyPressed = function(newRightKeyPressed) { rightKeyPressed = newRightKeyPressed; };
	this.getTimer = function() { return timer; };
	this.setTimer = function(newTimer) { timer = newTimer; };
	this.isUpKeyPressed = function() { return upKeyPressed; };
	this.setUpKeyPressed = function(newUpKeyPressed) { upKeyPressed = newUpKeyPressed; };	
	
	canvas = document.getElementById(idCanvas);
	canvas.width = 800;
	canvas.height = 600;
	canvas.style.backgroundColor = "black";
	div = document.createElement("div");
	div.style.display = "none";
	div.style.position = "absolute";
	div.style.top = canvas.offsetTop;
	div.style.left = canvas.offsetLeft;
	div.style.width = canvas.width;
	div.style.height = canvas.height;
	div.style.paddingTop = "250px";
	div.style.textAlign = "center";
	div.style.color = "yellow";
	div.style.fontSize = "x-large";
	document.body.appendChild(div);
	downKeyPressed = false;
	enable = false;
	gameOver = false;
	leftKeyPressed = false;
	size = 40;
	rightKeyPressed = false;
	timer = 0;
	upKeyPressed = false;
	
	this.initialize();
}

/**
 * Genera un objeto Square en una posición aleatoria del canvas, donde actualmente
 * no se encuentre la Serpiente.
 */
Game.prototype.createFood = function() {
	var x,
		xEquals,
		y,
		yEquals;
	
	do {
		xEquals = false;
		x = Math.round(Math.random() * (this.getCanvas().width - this.getSize()) / this.getSize());
		for (var i = 0; i < this.getSnake().getListOfSquares().length; i++) {
			xEquals = (x == this.getSnake().getListOfSquares()[i].getX()) || xEquals;
		}
	} while (xEquals);
	do {
		yEquals = false;
		y = Math.round(Math.random() * (this.getCanvas().height - this.getSize()) / this.getSize());
		for (var i = 0; i < this.getSnake().getListOfSquares().length; i++) {
			yEquals = (y == this.getSnake().getListOfSquares()[i].getY()) || yEquals;
		}
	} while (yEquals);
	
	this.setFood(new Square(x, y, this.getSize(), "yellow"));
};

/**
 * Establece todas las propiedades de la clase a su valor inicial.
 */
Game.prototype.initialize = function() {
	this.setScore(0);
	this.setSnake(new Snake(0, 0, this.getSize(), "blue"));
	this.setSpeed(5);
	this.createFood();
};

/**
 * Notifica a la instancia de Game cuando una tecla ha sido pulsada.
 * @param {Object} e	Tecla pulsada
 */
Game.prototype.keyPress = function(e) {
	e.preventDefault();
	if (this.isGameOver() && e.keyCode == 13) {
		this.start();
		return;
	}
	else if (e.keyCode == 37) {
		this.setLeftKeyPressed(true);
		this.setUpKeyPressed(false);
		this.setRightKeyPressed(false);
		this.setDownKeyPressed(false);
	}
	else if (e.keyCode == 38) {
		this.setUpKeyPressed(true);
		this.setLeftKeyPressed(false);
		this.setRightKeyPressed(false);
		this.setDownKeyPressed(false);
	}
	else if (e.keyCode == 39) {
		this.setRightKeyPressed(true);
		this.setUpKeyPressed(false);
		this.setLeftKeyPressed(false);
		this.setDownKeyPressed(false);
	}
	else if (e.keyCode == 40) {
		this.setDownKeyPressed(true);
		this.setRightKeyPressed(false);
		this.setUpKeyPressed(false);
		this.setLeftKeyPressed(false);
	}
};

/**
 * Inicia la ejecución del juego.
 */
Game.prototype.launch = function() {
	if (this.isEnable()) {
		this.run();
	}
	else {
		this.setEnable(true);
	}
};

/**
 * Muestra un mensaje en pantalla para iniciar una nueva partida.
 */
Game.prototype.notify = function() {
	this.getDiv().innerHTML = "Has perdido el juego.<br />Presiona ENTER para intentarlo de nuevo.";
	this.setGameOver(true);
};

/**
 * Ciclo principal del juego. 
 */
Game.prototype.run = function() {
	if (this.isEnable()) {
		this.getCanvas().getContext("2d").clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
		this.getSnake().draw(this.getCanvas().getContext("2d"));
		this.getFood().draw(this.getCanvas().getContext("2d"));
		
		if (!this.isGameOver()) {
			this.getSnake().update();
			this.getSnake().move();
			if (this.getSnake().crashWithTheWall(this.getCanvas().width, this.getCanvas().height) ||
				this.getSnake().crashWithMyself()) {
					this.notify();
			}			
			if (this.getSnake().eat(this.getFood())) {
				this.getFood().setColor("blue");
				this.getFood().setX(this.getSnake().getNewX());
				this.getFood().setY(this.getSnake().getNewY());
				this.getSnake().getListOfSquares().unshift(this.getFood());
				this.setScore(this.getScore() + 10);
				this.setSpeed(this.getSpeed() + 1);
				this.createFood();
				
				clearInterval(this.getTimer());
				this.setTimer(setInterval("game.launch();", 1000 / this.getSpeed()));
			}
		}
		if (this.isGameOver()) {
			this.getDiv().style.display = "block";
		}
		else {
			this.getDiv().style.display = "none";
		}
		this.getCanvas().getContext("2d").fillStyle = "yellow";
		this.getCanvas().getContext("2d").font = "bold 20px monospace";
		this.getCanvas().getContext("2d").fillText(this.getScore() + " Puntos", this.getCanvas().width - 120, 30);
		if (this.isDownKeyPressed() && !this.isLeftKeyPressed() &&
			!this.isRightKeyPressed() && !this.isUpKeyPressed()) {
				this.getSnake().setDirection(Direction.DOWN);
		}
		else if (this.isLeftKeyPressed() && !this.isDownKeyPressed() &&
			!this.isRightKeyPressed() && !this.isUpKeyPressed()) {
				this.getSnake().setDirection(Direction.LEFT);
		}
		else if (this.isRightKeyPressed() && !this.isDownKeyPressed() &&
			!this.isLeftKeyPressed() && !this.isUpKeyPressed()) {
				this.getSnake().setDirection(Direction.RIGHT);
		}
		else if (this.isUpKeyPressed() && !this.isDownKeyPressed() &&
			!this.isLeftKeyPressed() && !this.isRightKeyPressed()) {
				this.getSnake().setDirection(Direction.UP);
		}
	}
};

/**
 * Establece todas las propiedades de la clase a su valor inicial para iniciar una nueva partida.
 */
Game.prototype.start = function() {
	this.initialize();
	this.setDownKeyPressed(false);
	this.setGameOver(false);
	this.setLeftKeyPressed(false);
	this.setRightKeyPressed(false);
	this.setUpKeyPressed(false);
	
	clearInterval(this.getTimer());
	this.setTimer(setInterval("game.launch();", 1000 / this.getSpeed()));
};