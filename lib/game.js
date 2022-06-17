const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export class Game {
    constructor(name, regCB, initCB, tickCB) {
        document.title = name;
        
        this.running = false;
        this.listeners = [];

        // constants
        this.BLACK = '#000000';
        this.WHITE = '#ffffff';
        this.RED = '#ff0000';
        this.GREEN = '#00ff00';
        this.BLUE = '#0000ff';
        this.YELLOW = '#ffff00';
        this.CYAN = '#00ffff';
        this.MAGENTA = '#ff00ff';

        this.EV_KEYDOWN = 'keydown';
        this.EV_KEYUP = 'keyup';
        this.EV_MOUSEDOWN = 'mousedown';
        this.EV_MOUSEUP = 'mouseup';
        this.EV_MOUSEMOVE = 'mousemove';

        this.KEY_ESCAPE = 'Escape'; this.KEY_SPACE = ' ';
        this.KEY_LEFT = 'ArrowLeft'; this.KEY_RIGHT = 'ArrowRight';
        this.KEY_UP = 'ArrowUp'; this.KEY_DOWN = 'ArrowDown';
        this.KEY_A = 'a'; this.KEY_B = 'b'; this.KEY_C = 'c'; this.KEY_D = 'd';
        this.KEY_E = 'e'; this.KEY_F = 'f'; this.KEY_G = 'g'; this.KEY_H = 'h';
        this.KEY_I = 'i'; this.KEY_J = 'j'; this.KEY_K = 'k'; this.KEY_L = 'l';
        this.KEY_M = 'm'; this.KEY_N = 'n'; this.KEY_O = 'o'; this.KEY_P = 'p';
        this.KEY_Q = 'q'; this.KEY_R = 'r'; this.KEY_S = 's'; this.KEY_T = 't';
        this.KEY_U = 'u'; this.KEY_V = 'v'; this.KEY_W = 'w'; this.KEY_X = 'x';
        this.KEY_Y = 'y'; this.KEY_Z = 'z'; this.KEY_0 = '0'; this.KEY_1 = '1';
        this.KEY_2 = '2'; this.KEY_3 = '3'; this.KEY_4 = '4'; this.KEY_5 = '5';
        this.KEY_6 = '6'; this.KEY_7 = '7'; this.KEY_8 = '8'; this.KEY_9 = '9';

        this.BTN_LEFT = 0; this.BTN_MIDDLE = 1; this.BTN_RIGHT = 2;
        
        this.register(this, regCB);
        this.init(this, initCB);
        this.tick(this, tickCB);
    }

    register(game, regCB) {
        regCB(game);

        const events = [
            this.EV_KEYDOWN,
            this.EV_KEYUP,
            this.EV_MOUSEDOWN,
            this.EV_MOUSEUP,
            this.EV_MOUSEMOVE
        ];
        events.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                game.listeners.forEach((listener) => {
                    if(listener.eventType === eventType) listener.callback(e);
                });
            });
        }); 
    }

    init(game, initCB) {
        game.running = true;
    
        initCB(game);
    }

    tick(game, tickCB) {
        if(game.running) {
            window.requestAnimationFrame(() => this.tick(game, tickCB));

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            tickCB(game);
        }
    }

    clear() {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    colour(colour) {
        ctx.fillStyle = colour;
    }

    rect(x, y, w, h, colour, fill) {
        ctx.fillStyle = colour;
        ctx.strokeStyle = colour;

        if(!fill) { 
            ctx.strokeRect(x, y, w, h); 
        } else { 
            ctx.fillRect(x, y, w, h); 
        }
    }

    circle(x, y, r, colour, fill) {
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        
        if(!fill) {
            ctx.stroke();
        } else {
            ctx.fill();
        }
    }

    halt() {
        this.running = false;

        app.quit();
    }

    listener(evType, callback) {        
        this.listeners.push({
            eventType: evType,
            callback: callback
        });
    }
}

export class Layer {
    constructor() {
    }

    // you implement this
    register() {}
    init() {}
    tick() {}
}