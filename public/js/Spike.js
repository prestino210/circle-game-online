export default class Spike {
    constructor(game) {
        this.game = game;
        this.size = 550 * this.game.currentScale;
        this.r = this.size/2;

        let randX = Math.random() * (((this.game.tilemap.x + this.game.tilemap.mapWidth) - this.r) - (this.game.tilemap.x + this.r)) + (this.game.tilemap.x + this.r);
        let randY = Math.random() * (((this.game.tilemap.y + this.game.tilemap.mapHeight) - this.r) - (this.game.tilemap.y + this.r)) + (this.game.tilemap.y + this.r);
        this.x = randX;
        this.y = randY;

        this.color = "rgb(0,255,0)";
    }

    update() {
        this.r = this.size/2;
        let entities = [...this.game.circles, this.game.player];

        entities.forEach((e) => {
            let distX = this.x - e.x;
            let distY = this.y - e.y;
            let dist = Math.sqrt((distX*distX)+(distY*distY)); 
            if(dist <= this.r + e.r) {
                if(this.r < e.r) {
                    if(this.game.player.deleted == false) {
                        if(e == this.game.player) {
                            if(!this.game.invincible) {
                                this.game.player.deleted = true;
                            }
                            
                        } else if(e != this.game.player) {
                            e.notDeleted = false;
                        }
                    } else if(this.game.player.deleted == true) {
                        e.notDeleted = false;
                    }
                    
                } 
            }
        });

    }

    draw(ctx) {
        if(this.r > 0) {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            ctx.fill();
            if((0.025 * this.r) * this.game.currentScale > 0) {
                ctx.lineWidth = (0.025 * this.r) * this.game.currentScale;
                ctx.stroke();
            }
        }
    }
}