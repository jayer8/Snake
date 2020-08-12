const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: `<canvas id="context"> </canvas>
      <br />
      <ul>
        <li><code>Cursores</code> para mover la serpiente hacia arriba, abajo, derecha e izquierda.</li>
        <li><code>Entrar</code> para empezar de nuevo cuando finalice la partida.</li>
      </ul>
      <p>Basado en:
        <a href="http://cssdeck.com/labs/classic-snake-game-with-html5-canvas">
          cssdeck.com/labs/classic-snake-game-with-html5-canvas
        </a> y<br />
        <a href="http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery">
          thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery
        </a>
      </p>
      <button id="stop">Parar</button>`,
      scripts: [
        {
          src: 'bundle.js'
        }
      ],
      title: 'Snake'
    })
  ]
}
