export default class Projectile {
    constructor(game, player, mouseX, mouseY) {
        this.game = game;
       
        this.player = player;
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.x = player.x;
        this.y = player.y
        this.size = 15 * this.game.currentScale;
        this.originalSize = this.size;
        this.r = this.size/2;
        this.notDeleted = true;
        this.speed = 10;

        let diffx = this.player.x - this.mouseX;
        let diffy = this.player.y - this.mouseY;

        let angle = Math.atan2(diffy, diffx) + Math.PI;


        this.dx = (this.speed * Math.cos(angle)) * this.game.currentScale;
        this.dy = (this.speed * Math.sin(angle)) * this.game.currentScale;
        this.originalDx = this.dx;
        this.originalDy = this.dy;
    }

    update() {
        this.r = this.size/2;

        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx) {
        if(this.r > 0) {
            ctx.fillStyle = "rgb(255,0,0)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            ctx.fill();
        }
    }
}