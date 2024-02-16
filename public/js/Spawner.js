import CircleGuy from "./CircleGuy.js";

export default class Spawner {
    constructor(game, canv) {
        this.game = game;
        this.canv = canv;
        this.maxCircleGuys = null;
        if(!this.game.smallMap) {
            this.maxCircleGuys = 199;
        } else if(this.game.smallMap) {
            this.maxCircleGuys = 99;
        }
        if(this.game.maxCircleGuysOverride != null) { 
            this.maxCircleGuys = this.game.maxCircleGuysOverride;
        }
        
        this.spawnDelay = 10000;
        this.spawnTimer = Date.now();

        for(let i = 0; i < this.maxCircleGuys - this.game.circles.length; i++) {
            
            let c = new CircleGuy(this.game, this.canv);
            this.game.circles.push(c);
        }

    }

    update() {
        let currentTime = Date.now(); 
        let differenceTime = currentTime - this.spawnTimer;

        if(differenceTime >= this.spawnDelay) { 
            for(let i = 0; i < this.maxCircleGuys - this.game.circles.length; i++) {
            
                let c = new CircleGuy(this.game, this.canv);
                this.game.circles.push(c);
            }
            this.spawnTimer = Date.now();
        }
    }
}