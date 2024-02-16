import Food from "./Food.js";

export default class FoodSpawner {
    constructor(game) {
        this.game = game;
        this.maxFood = null;
        if(!this.game.smallMap) {
            this.maxFood = 300;
        } else if(this.game.smallMap) {
            this.maxFood = 150;
        }
        if(this.game.maxFoodOverride != null) { 
            this.maxFood = this.game.maxFoodOverride;
        }
        
        this.spawnDelay = 10000;
        this.spawnTimer = Date.now();

        for(let i = 0; i < this.maxFood - this.game.food.length; i++) {
            let f = new Food(this.game); 
            
            this.game.food.push(f);
        }

    }

    update() {
        let currentTime = Date.now(); 
        let differenceTime = currentTime - this.spawnTimer;

        if(differenceTime >= this.spawnDelay) { 
            for(let i = 0; i < this.maxFood - this.game.food.length; i++) {
                let f = new Food(this.game); 
               
                this.game.food.push(f);
            }
            this.spawnTimer = Date.now();
        }
    }
}