var killText;
var homeButton;
var againButton;
var playerScore;
class KillScene extends Phaser.Scene{
  constructor(){

      super("endGame");
  }

  init(score) {
    playerScore = score;
  }
  create()  {
    music.pause();
    killText = this.add.text(400, 200, "Game Over. \n Level Reached: " + playerScore);
    homeButton = this.add.text(400, 240, "Home");
    homeButton.setInteractive();
    againButton = this.add.text(400, 260, "Play Again");
    againButton.setInteractive();

    homeButton.on("pointerover", ()=>  {
      homeButton.setScale(1.2);
    })

    homeButton.on("pointerout", ()=>  {
      homeButton.setScale(1);
    })

    homeButton.on("pointerup", ()=>  {
      this.scene.stop("enterGame");
      this.scene.start("startMenu");
    })


    againButton.on("pointerover", ()=>  {
      againButton.setScale(1.2);
    })

    againButton.on("pointerout", ()=>  {
      againButton.setScale(1);
    })

    againButton.on("pointerup", ()=>  {
      this.scene.stop("enterGame");
      this.scene.start("enterIntro");
    })


  }
}
