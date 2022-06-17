import { Layer } from '../../lib/game.js';

export class ExampleLayer extends Layer {
    // Can optionally override the constructor to add additional variables
    constructor() {
        super(); // MUST be called when you override the constructor

        this.circleX = 100;
        this.tickMovement = false; // false = event based movement, true = frame based movement

        this.aHeld = false;
        this.dHeld = false;
    }

    register(game) {
        game.listener(game.EV_KEYDOWN, (e) => {
            // Switch from event based movement to frame based movement and vise versa
            if(e.key == game.KEY_SPACE) {
                console.log('Switching input mode');
                this.tickMovement = !this.tickMovement;
            }

            if(this.tickMovement == false) {
                if(e.key == game.KEY_D) {
                    this.circleX += 10;
                }

                if(e.key == game.KEY_A) {
                    this.circleX -= 10;
                }
            } else {
                if(e.key == game.KEY_D) {
                    this.dHeld = true;
                }

                if(e.key == game.KEY_A) {
                    this.aHeld = true;
                }
            }
        });

        game.listener(game.EV_KEYUP, (e) => {
            if(this.tickMovement) {
                if(e.key == game.KEY_D) {
                    this.dHeld = false;
                }

                if(e.key == game.KEY_A) {
                    this.aHeld = false;
                }
            }
        });

        game.listener(game.EV_MOUSEDOWN, (e) => {
            if(e.button == game.BTN_LEFT) {
                console.log('left mouse pressed');
            }
        });
    }

    init(game) {
        console.log('Hello, World!');
    }

    tick(game) {
        game.colour(game.BLACK);

        // Clears the full screen with the current colour
        game.clear();

        // x, y, width, height, colour, fill
        game.rect(0, 0, 100, 100, game.MAGENTA, true);

        // x, y, radius, colour, fill
        game.circle(this.circleX, 100, 50, game.CYAN, true);

        // if we want to use frame based movement, update position here
        if(this.tickMovement) {
            if(this.dHeld) {
                this.circleX += 10;
            }

            if(this.aHeld) {
                this.circleX -= 10;
            }
        }
    }
}