//import { CST } from "../CST";
class MenuScene extends Phaser.Scene{
  constructor(){

      super("startMenu");
  }
    //testing passing data down from scene
  init(data) {
    console.log(data);
    console.log("I got it! :)");
  }

  create() {
    //create menu background image
    let menu;
    let icon;
    menu = this.add.image(400, 300, 'menu');
    menu.setScale(1);
    this.add.image(400, 200, 'title').setScale(.6);
    //play button
    let playButton = this.add.image(400, 400, 'playButton').setScale(.6);
    playButton.setInteractive();

    playButton.on("pointerover", ()=>  {
      icon = this.add.sprite(playButton.x + 150, playButton.y, 'astronaut');
      icon.anims.play('falling', true);
    })

    playButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    playButton.on("pointerup", ()=>  {
    //  music.pause();
      this.scene.start("enterIntro");
    })

    //menu astronaut animation
    this.anims.create({
      key: 'falling',
      frames: this.anims.generateFrameNumbers('astronaut', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })
      //menu music
      music = this.sound.add('spaceTheme');
    //  music.play();
      music.setLoop(true);
        //particles test

      //emitter.setBlendMode(Phaser.BlendModes.ADD);

  }

}
