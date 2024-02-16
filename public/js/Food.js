export default class Food {
    constructor(game) {
        this.game = game;
        this.notDeleted = true;
        this.size = (Math.random() * (60 - 40) + 40) * this.game.currentScale;
        this.r = this.size/2;
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        this.color = `rgba(${r}, ${g}, ${b})`;
        let randX = Math.random() * (((this.game.tilemap.x + this.game.tilemap.mapWidth) - this.r) - (this.game.tilemap.x + this.r)) + (this.game.tilemap.x + this.r);
        let randY = Math.random() * (((this.game.tilemap.y + this.game.tilemap.mapHeight) - this.r) - (this.game.tilemap.y + this.r)) + (this.game.tilemap.y + this.r);
        this.x = randX;
        this.y = randY;
    }
    

    update() {
        this.r = this.size/2;

        if(this.game.player.deleted == false) {
            let distX = this.x - this.game.player.x;
            let distY = this.y - this.game.player.y;
            let dist = Math.sqrt((distX*distX)+(distY*distY)); 
            if(dist <= this.r + this.game.player.r) {
                let newR = Math.sqrt((this.r*this.r)+(this.game.player.r*this.game.player.r));
                this.game.player.size = newR * 2;
                this.notDeleted = false;
            }
        }
        this.game.circles.forEach((c) => {
            
            if(c != this) {
                let distX = this.x - c.x;
                let distY = this.y - c.y;
                let dist = Math.sqrt((distX*distX)+(distY*distY)); 
                if(dist <= this.r + c.r) {
                    let newR = Math.sqrt((this.r*this.r)+(c.r*c.r));
                    c.size = newR * 2;
                    this.notDeleted = false;
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