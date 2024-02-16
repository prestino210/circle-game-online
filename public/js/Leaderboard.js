export default class Leaderboard {
    constructor(game) {
        this.game = game;
        this.topFivePlayers = [];
        this.topLength = 0;
    }

    update() {
        if(this.game.player.deleted) {
            this.topFivePlayers = [...this.game.circles];
            this.topFivePlayers.sort((a, b) => b.r - a.r);
        } else if(!this.game.player.deleted) {
            this.topFivePlayers = [...this.game.circles, this.game.player];
            this.topFivePlayers.sort((a, b) => b.r - a.r);
        }

        this.game.largest = this.topFivePlayers[0]; 
        
    }

    draw(ctx) {
        if(this.game.lbToggle == 1) {
            let UbuntuB = new FontFace('UbuntuB', 'url(../assets/Ubuntu-Bold.ttf)');
            UbuntuB.load();
    
            ctx.fillStyle = "rgb(150,150,150)";
            ctx.strokeStyle = "rgb(0,0,0)";
            let fontSize = 25; 
            ctx.lineWidth = 1.5 * (0.038*fontSize);
            let font = `bold ${fontSize}px UbuntuB`;
            ctx.font = font;
            ctx.fillText("[" + this.topFivePlayers.length + " players]", 25, (7 * 50) + 50);
            ctx.strokeText("[" + this.topFivePlayers.length + " players]", 25, (7 * 50) + 50);
            
            for(let i = 0; i < 5; i++) {
                if(i == 0) {
                    if(this.topFivePlayers[i] == this.game.player) {
                        this.topLength = ctx.measureText((i+1) + ". [YOU] " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale));
                    } else if(this.topFivePlayers[i] != this.game.player) {
                        this.topLength = ctx.measureText((i+1) + ". " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale));
                    }
                }
                
                try {
                    if(this.topFivePlayers[i] == this.game.player) {
                        ctx.fillStyle = this.topFivePlayers[i].color;
                        ctx.fillText((i+1) + ". [YOU] " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                    ctx.strokeText((i+1) + ". [YOU] " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                    } else if(this.topFivePlayers[i] != this.game.player) {
                        ctx.fillStyle = this.topFivePlayers[i].color;
                        ctx.fillText((i+1) + ". " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                        ctx.strokeText((i+1) + ". " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                    }
                    
                } catch (error) {
                    ctx.fillStyle = "rgb(255,255,255)";
                    
                    ctx.fillText((i+1) + ".", 25, (i * 50) + 50);
                    ctx.strokeText((i+1) + ".", 25, (i * 50) + 50);
                    
                }
            }

            if(!this.game.player.deleted) {
                let index = this.topFivePlayers.indexOf(this.game.player)
                    
                if(index+1 > 5) {
                    ctx.fillStyle = "rgb(150,150,150)";
                    try {
                        ctx.fillText((index+1) + ". " + this.topFivePlayers[index].playerName + ": " + Math.floor(this.topFivePlayers[index].r/this.game.currentScale), 25, (6 * 50) + 50);
                        ctx.strokeText((index+1) + ". " + this.topFivePlayers[index].playerName + ": " + Math.floor(this.topFivePlayers[index].r/this.game.currentScale), 25, (6 * 50) + 50);
                    } catch (error) {
                        
                        ctx.fillText((index+1) + ". ", 25, (6 * 50) + 50);
                        ctx.strokeText((index+1) + ". ", 25, (6 * 50) + 50);
                       
                    }
                }
            } else if(this.game.player.deleted) {
                ctx.fillStyle = "rgb(150,150,150)";
                ctx.fillText("Dead", 25, (6 * 50) + 50);
                ctx.strokeText("Dead", 25, (6 * 50) + 50);

            }
          
            ctx.drawImage(this.game.kingIcon, ((this.topLength.width) + 25) + 5, 40 - (this.game.kingIconLBSize/2), this.game.kingIconLBSize, this.game.kingIconLBSize);
            
        } else if(this.game.lbToggle == -1) {
            
        }
        
    }
}