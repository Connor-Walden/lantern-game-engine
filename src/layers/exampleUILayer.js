import { Layer } from '../../lib/game.js';

export class ExampleUILayer extends Layer {
    register(game) {
    }

    init(game) {
        console.log('Hello, from the UI World!');
    }

    tick(game) {
        // x, y, width, height, colour, fill
        game.rect(0, 0, window.innerWidth, window.innerHeight, game.RED, false);
    }
}