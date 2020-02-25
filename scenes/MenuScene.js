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
    menu = this.add.image(400, 300, 'title').setScale(1);

//    this.add.image(400, 200, 'title').setScale(.6);
    //play button
    let playButton = this.add.image(62, 275, 'playButton').setScale(.3);
    playButton.setInteractive();

    playButton.on("pointerover", ()=>  {
      icon = this.add.sprite(playButton.x + 75, playButton.y, 'astronaut').setScale(.5);
      icon.anims.play('falling', true);
    })

    playButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    playButton.on("pointerup", ()=>  {
    //  music.pause();
      this.scene.start("enterIntro");
    })

      //options button
    let optionsButton = this.add.image(100, 325, 'optionsButton').setScale(.3);
    optionsButton.setInteractive();

    optionsButton.on("pointerover", ()=>  {
      icon = this.add.sprite(optionsButton.x + 115, optionsButton.y, 'astronaut').setScale(.5);
      icon.anims.play('falling', true);
    })

    optionsButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    optionsButton.on("pointerup", ()=>  {
    //  this.scene.start(");
    })

    //extras button
  let extrasButton = this.add.image(85, 372, 'extrasButton').setScale(.3);
    extrasButton.setInteractive();

    extrasButton.on("pointerover", ()=>  {
    icon = this.add.sprite(extrasButton.x + 115, extrasButton.y, 'astronaut').setScale(.5);
    icon.anims.play('falling', true);
  })

  extrasButton.on("pointerout", ()=>  {
    icon.visible = false;
  })

  extrasButton.on("pointerup", ()=>  {
  //  this.scene.start(");
  })


      //menu music
      music = this.sound.add('spaceTheme');
    //  music.play();
      music.setLoop(true);
        //particles test

      //emitter.setBlendMode(Phaser.BlendModes.ADD);

  }

}
