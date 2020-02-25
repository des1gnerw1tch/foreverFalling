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
    let backdrop;
    let icon;
    backdrop = this.add.image(400, 300, 'mountains').setScale(1);
    //planets
    this.add.image(700, 100, 'bigPlanet1').setScale(.5);
    this.add.image(250, 400, 'mesosPlanet').setScale(.2);

    this.add.image(100, 450, 'lavaMonster').setScale(.75).setAngle(-30);
    this.add.image(90, 485, 'lavaMonster').setScale(.75).setAngle(-30);
    this.add.image(90, 425, 'fireball').setScale(.005).setAngle(80);
    this.add.image(70, 425, 'fireball').setScale(.005).setAngle(80);
    this.add.image(60, 470, 'fireball').setScale(.005).setAngle(80);


    this.add.image(550, 120, 'satellite').setScale(.25).setAngle(-20);
    this.add.image(700, 300, 'satellite').setScale(.175).setAngle(40);

    this.add.image(500, 400, 'spaceship').setScale(.3);
    this.add.image(550, 450, 'spaceship').setScale(.3);
    //meteor chunk!
    this.add.sprite(250, 50, 'meteor').setScale(.3).anims.play('m1', true).setAngle(5);
    this.add.sprite(200, 100, 'meteor').setScale(.6).setAngle(40);
    this.add.sprite(275, 130, 'meteor').setScale(.2).anims.play('m2', true).setAngle(30);
    this.add.sprite(160, 0, 'meteor').setScale(.6).anims.play('m1', true).setAngle(20);


      //title image
    this.add.image(10, 175, 'title').setScale(.4).setOrigin(0, 0);
    //play button
    let playButton = this.add.image(23, 250, 'playButton').setScale(.3).setOrigin(0, 0);
    playButton.setInteractive();

    playButton.on("pointerover", ()=>  {
      icon = this.add.sprite(playButton.x + 130, playButton.y + 20, 'astronaut').setScale(.5);
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
    let optionsButton = this.add.image(23, 300, 'optionsButton').setScale(.3).setOrigin(0, 0);
    optionsButton.setInteractive();

    optionsButton.on("pointerover", ()=>  {
      icon = this.add.sprite(optionsButton.x + 205, optionsButton.y + 20, 'astronaut').setScale(.5);
      icon.anims.play('falling', true);
    })

    optionsButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    optionsButton.on("pointerup", ()=>  {
    //  this.scene.start(");
    })

    //extras button
  let extrasButton = this.add.image(23, 350, 'extrasButton').setScale(.3).setOrigin(0,0);
    extrasButton.setInteractive();

    extrasButton.on("pointerover", ()=>  {
    icon = this.add.sprite(extrasButton.x + 180, extrasButton.y + 20, 'astronaut').setScale(.5);
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
