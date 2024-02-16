export default class TileMap {
    constructor(game) {
        this.game = game;
        
        this.tiles = [];
        this.x = 0;
        this.y = 0;
        this.size = 150;
        if(!this.game.smallMap) {
            this.maxTilesX = 300;
            this.maxTilesY = 300;
        } else if(this.game.smallMap) {
            this.maxTilesX = 50;
            this.maxTilesY = 50;
        }
        
        for(let i = 0; i < this.maxTilesY; i++) {
            for(let j = 0; j < this.maxTilesX; j++) {
                let tile = {
                    x: j,
                    y: i
                }
                this.tiles.push(tile);
            }
        }

        this.mapWidth = this.maxTilesX * this.size;
        this.mapHeight = this.maxTilesY * this.size;
    }

    update() {

    }



    draw(ctx){
        this.mapWidth = this.maxTilesX * this.size;
        this.mapHeight = this.maxTilesY * this.size;
    
        ctx.strokeStyle = "rgb(0,0,0)";
    
        if(!this.game.lowDetail) {
            if(this.size/2 > 0 && this.game.currentScale > 0) {
                this.tiles.forEach((t) => { 
                    let tx = t.x * this.size; 
                    let ty = t.y * this.size; 
                    if((tx < this.game.gameWidth - 50 || tx + this.size > 50) && (ty < this.game.gameHeight - 50 || ty + this.size > 50)) {
                        ctx.beginPath();
                        ctx.lineWidth = this.game.currentScale;
                        ctx.rect(this.x + tx, this.y + ty, this.size, this.size);
                        ctx.stroke();
                    }   
                });
            }
        } else if(this.game.lowDetail && this.game.currentScale > 0) {
            ctx.beginPath();
            ctx.lineWidth = this.game.currentScale;
            ctx.rect(this.x, this.y, this.mapWidth, this.mapHeight);
            ctx.stroke();
        }
        
    }
    
    
}

