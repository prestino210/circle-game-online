export default class Inputs {
    constructor(game, player) {
      this.game = game;
      this.player = player;

  
      document.addEventListener("keydown", (e) => {
        this.handleKey(e.key.toLowerCase(), true);
      });
  
      document.addEventListener("keyup", (e) => {
        this.handleKey(e.key.toLowerCase(), false);
      });
  
      document.addEventListener("mousedown", (e) => {
        let button = e.button;
        if (button == 0) {
          if (!this.game.player.deleted) {
            // this.player.shooting = true;
          }
        }
  
        if (button == 2) {
          if (!this.game.player.deleted) {
            // this.player.shooting = true;
          }
        }
      });
  
      document.addEventListener("wheel", (e) => {
        if (e.wheelDelta > 0) {
          this.game.zoomIn();
        } else if (e.wheelDelta < 0) {
          this.game.zoomOut();
        }
      });
  
      document.addEventListener("mouseup", (e) => {
        let button = e.button;
        if (button == 0) {
          this.player.shooting = false;
        }
  
        if (button == 2) {
          this.player.shooting = false;
        }
      });
  
      document.addEventListener("mousemove", (e) => {
        this.player.mouseX = e.clientX;
        this.player.mouseY = e.clientY;
      });
  
      if(this.game.isMobile) { 
        let upButton = document.getElementById("up-button");
        upButton.addEventListener("touchstart", (e) => { 
          e.preventDefault();
          this.player.up = true;
        });
        upButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.player.up = false;
        });

        /////////////

        let zoomOut = document.getElementById("zoom-out-button");
        zoomOut.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.game.zoomOut();
        });
        zoomOut.addEventListener("touchend", (e) => {
          e.preventDefault();
         
        });

        let zoomIn = document.getElementById("zoom-in-button");
        zoomIn.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.game.zoomIn();
        });
        zoomIn.addEventListener("touchend", (e) => {
          e.preventDefault();
          
        });

        ///////////
    
        let leftButton = document.getElementById("left-button");
        leftButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.player.left = true;
        });
        leftButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.player.left = false;
        });
    
        let downButton = document.getElementById("down-button");
        downButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.player.down = true;
        });
        downButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.player.down = false;
        });
    
        let rightButton = document.getElementById("right-button");
        rightButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.player.right = true;
        });
        rightButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.player.right = false;
        });

        let lbToggle = document.getElementById("lb-toggle");
        lbToggle.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.game.lbToggle *= -1;
        });
        lbToggle.addEventListener("touchend", (e) => {
          e.preventDefault();
          
        });
      }
      
    }
  
    handleKey(key, isPressed) {
      if (key == "w") {
        this.player.up = isPressed;
      }
      if (key == "a") {
        this.player.left = isPressed;
      }
      if (key == "s") {
        this.player.down = isPressed;
      }
      if (key == "d") {
        this.player.right = isPressed;
      }
      if(key == "i" && isPressed) {
        this.game.zoomIn();
      }
      if(key == "o" && isPressed) {
        this.game.zoomOut();
      }
    }
  }
  
