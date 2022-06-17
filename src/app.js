import { Game } from '../lib/game.js';

import { ExampleLayer } from './layers/exampleLayer.js';
import { ExampleUILayer } from './layers/exampleUILayer.js';

const _ExampleLayer = new ExampleLayer();
const _ExampleUILayer = new ExampleUILayer();

const data = {
    enableGame: true,
    enableUI: true
};

new Game(
    'My Game',

    game => {
        // Click 1 or 2 to toggle the game and ui layers.
        game.listener(game.EV_KEYDOWN, (e) => {
            if(e.key == game.KEY_1) {
                data.enableGame = !data.enableGame;
            }

            if(e.key == game.KEY_2) {
                data.enableUI = !data.enableUI;
            }
        });

        _ExampleLayer.register(game);
        _ExampleUILayer.register(game);
    },
    game => {
        _ExampleLayer.init(game);
        _ExampleUILayer.init(game);
    }, 
    game => {
        if(data.enableGame) _ExampleLayer.tick(game);
        if(data.enableUI) _ExampleUILayer.tick(game);
    }
);
