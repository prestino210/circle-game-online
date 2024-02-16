import Inputs from "./Inputs.js";
import Projectile from "./Projectile.js";

export default class Player {
    constructor(game, connected) {
        this.game = game;
        this.connected = connected;

        let rName = Math.floor(Math.random()*this.game.playerNames.length);
        this.playerName = this.game.playerNames[rName]; 
        this.size = (Math.random() * (170 - 160) + 160) * this.game.currentScale;
        this.r = this.size / 2;
        this.x = this.game.gameWidth /2;
        this.y = this.game.gameHeight /2;
        this.deleted = false;
        
        this.mouseX;
        this.mouseY;
        this.dx = 0;
        this.dy = 0;
        this.accelX = 0.6;
        this.accelY = 0.6;
        this.speed = 10;
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
        this.accelBounds = 0.03;
       
        
        this.shooting = false;

        this.speed = 10;

        this.in = new Inputs(game, this);

        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;


        this.color = `rgba(${r}, ${g}, ${b})`;

        this.shootingDelay = 200;
        this.shootingTimer = Date.now();
        
    }

 

    update() { 

          this.r = this.size/2;

          if(this.dx > this.speed) {
            this.dx = this.speed;
          }
          if(this.dx < -this.speed) {
            this.dx = -this.speed;
          }
          if(this.dy > this.speed) {
            this.dy = this.speed;
          }
          if(this.dy < -this.speed) {
            this.dy = -this.speed;
          }
      
          this.dx *= this.game.groundFriction;
          this.dy *= this.game.groundFriction;
          if(this.up) {
            this.dy += -this.accelY;
          } if(this.left) {
            this.dx += -this.accelX;
          }
          if(this.right) {
            this.dx += this.accelX;
          }
          if(this.down) {
            this.dy += this.accelY;
          }


          if(this.deleted == false) {
            if(this.x - this.r <= this.game.tilemap.x) {
              this.dx = -this.dx;
              
            }
            if(this.x + this.r >= this.game.tilemap.x + this.game.tilemap.mapWidth) {
              this.dx = -this.dx;
              
            }
            if(this.y - this.r <= this.game.tilemap.y) {
              this.dy = -this.dy;
              
              
            }
            if(this.y + this.r >= this.game.tilemap.y + this.game.tilemap.mapHeight) {
              this.dy = -this.dy;
              
            }
          }

          


      
          if((this.up && this.right) || (this.up && this.left) || (this.down && this.right) || (this.down && this.left)) {
            this.game.circles.forEach((c)=> {
              c.x -= (1/Math.sqrt(2)) * this.dx;
              c.y -= (1/Math.sqrt(2)) * this.dy;
            });

            this.game.projectiles.forEach((p)=> {
                p.x -= (1/Math.sqrt(2)) * this.dx;
                p.y -= (1/Math.sqrt(2)) * this.dy;
            });

            this.game.food.forEach((f)=> {
                f.x -= (1/Math.sqrt(2)) * this.dx;
                f.y -= (1/Math.sqrt(2)) * this.dy;
            });
            this.game.spikes.forEach((s)=> {
              s.x -= (1/Math.sqrt(2)) * this.dx;
              s.y -= (1/Math.sqrt(2)) * this.dy;
            });
      
            this.game.tilemap.x -= (1/Math.sqrt(2)) * this.dx;
            this.game.tilemap.y -= (1/Math.sqrt(2)) * this.dy;
      
          } else {
            this.game.circles.forEach((c)=> {
              c.x -= this.dx; c.y -= this.dy;
            });
            this.game.projectiles.forEach((p)=> {
                p.x -= this.dx; p.y -= this.dy;
            });
            this.game.food.forEach((f)=> {
                f.x -= this.dx; f.y -=this.dy;
                
            });
            this.game.spikes.forEach((s)=> {
              s.x -= this.dx; s.y -=this.dy;
            });
            this.game.tilemap.x -= this.dx;
            this.game.tilemap.y -= this.dy;
          }
        
          
        
       if(this.shooting) {

            let currentTime = Date.now();
            let differenceTime = currentTime - this.shootingTimer;

            if(differenceTime >= this.shootingDelay) {
                let p = new Projectile(this.game, this, this.mouseX, this.mouseY); 
                this.game.projectiles.push(p);
                this.shootingTimer = Date.now();
            }
            
       }

       if(this.game.invincible) {
        this.deleted = false
       }

    }

      

    draw(ctx) {
      if(this.r > 0) {
        if(this.deleted == false) {
          let UbuntuB = new FontFace('UbuntuB', 'url(../assets/Ubuntu-Bold.ttf)');
          UbuntuB.load();
          ctx.fillStyle = this.color;
          ctx.strokeStyle = "rgb(0,0,0)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
          ctx.fill();
          if((0.025 * this.r) * this.game.currentScale > 0) {
            ctx.lineWidth = (0.025 * this.r) * this.game.currentScale;
            ctx.stroke();
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
                  ctx.drawImage(img, 0, 0);
              }
            }
          }
        }
        

        

        
        
      }

      if(this.game.debugMode) {
          
        ctx.font = "15px Arial";
        ctx.fillStyle = "rgba(255, 255, 255)";
        ctx.fillText("world x: " + ((this.mouseX - this.x) - (Math.floor(this.game.tilemap.x - this.x))), this.mouseX + 15, this.mouseY);
        ctx.fillText("world y: " + ((this.mouseY - this.y) - (Math.floor(this.game.tilemap.y - this.y))), this.mouseX + 15, this.mouseY + 15);
      }
    }
}