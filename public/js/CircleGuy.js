export default class CircleGuy {
    constructor(game) {
        this.game = game;
        
        let x = Math.floor(Math.random()*this.game.playerNames.length);
        this.playerName = this.game.playerNames[x]; 
        this.size = (Math.random() * (170 - 160) + 160) * this.game.currentScale;
        this.r = this.size / 2;
        
        this.notDeleted = true;
        this.dx = (Math.random() * (6 - 3) + -3) * this.game.currentScale;
        this.dy = (Math.random() * (6- 3) + -3) * this.game.currentScale;

        this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy) * this.game.currentScale;
        
        let randX = Math.random() * (((this.game.tilemap.x + this.game.tilemap.mapWidth) - this.r) - (this.game.tilemap.x + this.r)) + (this.game.tilemap.x + this.r);
        let randY = Math.random() * (((this.game.tilemap.y + this.game.tilemap.mapHeight) - this.r) - (this.game.tilemap.y + this.r)) + (this.game.tilemap.y + this.r);
        this.x = randX;
        this.y = randY;
        
        this.target = null;
        

        let r = Math.random()*255;
        let g = Math.random()*255;
        let b = Math.random()*255;
        this.color = `rgba(${r}, ${g}, ${b})`;
        
    }

 

    update() {
        
        this.r = this.size/2;

        

        if(this.target != null) {
            if(this.target != this.game.player) {
                if(this.target.notDeleted == false) {
                    this.target = null;
                }
            }
            if(this.target == this.game.player) {
                if(this.target.deleted == true) {
                    this.target = null;
                }
            }
            
        }
        
        

        if(this.target != null) {
            if(this.target != this.game.player) {
                if(this.target.notDeleted == true) {
                    let diffX = this.x - this.target.x;
                    let diffY = this.y - this.target.y;
                    let angle = Math.atan2(diffY, diffX) + Math.PI;
                    
                    this.x += Math.cos(angle) * this.speed;
                    this.y += Math.sin(angle) * this.speed;
                    }
            }
            if(this.target == this.game.player) {
                if(this.target.deleted == false) {
                    let diffX = this.x - this.target.x;
                    let diffY = this.y - this.target.y;
                    let angle = Math.atan2(diffY, diffX) + Math.PI;
                    
                    this.x += Math.cos(angle) * this.speed;
                    this.y += Math.sin(angle) * this.speed;
                    }
            }
            

        } else {

            this.x += this.dx;
            this.y += this.dy;
            
        }


        if(this.x - this.r <= this.game.tilemap.x) {
            this.x -= this.dx;
            this.dx = -this.dx;
        }
        if(this.x + this.r >= this.game.tilemap.x + this.game.tilemap.mapWidth) {
            this.x -= this.dx;
            this.dx = -this.dx;
        }

        if(this.y - this.r <= this.game.tilemap.y) {
            this.y -= this.dy;
            this.dy = -this.dy;
        }
        if(this.y + this.r >= this.game.tilemap.y + this.game.tilemap.mapHeight) {
            this.y -= this.dy;
            this.dy = -this.dy;
        }
        
        let distanceFromTarget = Infinity;
        
        if(this.game.player.deleted == false) {
            if(this.game.playerTargettingAllowed) {
                let distX2 = this.x - this.game.player.x;
                let distY2 = this.y - this.game.player.y;
                let dist2 = Math.sqrt((distX2*distX2)+(distY2*distY2)); 
                if(dist2 < distanceFromTarget) {
                    if(this.game.player.r < this.r) {
                        this.target = this.game.player;
                        distanceFromTarget = dist2;
                    }
                }
            }
            

            let distX = this.x - this.game.player.x;
            let distY = this.y - this.game.player.y;
            let dist = Math.sqrt((distX*distX)+(distY*distY)); 
            if(dist <= this.r + this.game.player.r) {
                let newR = Math.sqrt((this.r*this.r)+(this.game.player.r*this.game.player.r));
                if(this.r > this.game.player.r) {
                    if(!this.game.invincible) {
                        this.game.player.deleted = true;
                        this.size = newR * 2;
                    }
                    
                }
                if(this.r < this.game.player.r) {
                    this.game.player.size = newR * 2;
                    this.notDeleted = false;
                }
            }
           
        }

        
        this.game.circles.forEach((c) => {
            
            if(c != this) {
            let distX = this.x - c.x;
            let distY = this.y - c.y;
            let dist = Math.sqrt((distX*distX)+(distY*distY)); 
            if(dist < distanceFromTarget) {
                if(c.r < this.r) {
                    this.target = c;
                    distanceFromTarget = dist;
                }
            }
            }
            
            if(c != this) {
                let distX = this.x - c.x;
                let distY = this.y - c.y;
                let dist = Math.sqrt((distX*distX)+(distY*distY)); 
                if(dist <= this.r + c.r) {
                    let newR = Math.sqrt((this.r*this.r)+(c.r*c.r));
                    if(this.r > c.r) {
                        c.notDeleted = false;
                        this.size = newR * 2;
                    }
                    if(this.r < c.r) {
                        c.size = newR * 2;
                        this.notDeleted = false;
                    }
                }
            }



           
        });

    }

      

    draw(ctx) {
        if(this.r > 0) {
            let UbuntuB = new FontFace('UbuntuB', 'url(../assets/Ubuntu-Bold.ttf)');
            UbuntuB.load();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            ctx.fill();
            if((0.025 * this.r) * this.game.currentScale) {
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth = (0.025 * this.r) * this.game.currentScale;
                ctx.stroke();
            }
            

            if(this.game.debugMode) {
                if(this.target != null && this.game.currentScale > 0) {
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 3 * this.game.currentScale;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.target.x, this.target.y);
                    ctx.stroke();   
                }

        
            }
            

            if(this.game.enableNames) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.strokeStyle = "rgb(0,0,0)";
                let fontSize = (10 * (this.r*0.03)); 
                ctx.lineWidth = 1.5 * (0.038*fontSize);
                let font = `bold ${fontSize}px UbuntuB`;
                let text = this.playerName;
                ctx.font = font;
                let textWidth = ctx.measureText(text).width;
                let textHeight = ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent;
        
                ctx.fillText(text, this.x - (textWidth/2), this.y + (textHeight/2));
                ctx.strokeText(text, this.x - (textWidth/2), this.y + (textHeight/2));

                if(this.game.leaderboard.topFivePlayers[0] == this) {
                    let img = new Image();
                    img.src = "../assets/king-icon.png";
                    
                    img.onload = () => {
                        let imgWidth = img.naturalWidth;
                        let imgHeight = img.naturalHeight;
                        ctx.drawImage(img, this.x - (imgWidth/2), this.y + this.r + imgHeight + 10);
                    }
                      

                }
            }
        }
    }
}