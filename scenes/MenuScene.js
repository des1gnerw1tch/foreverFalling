//import { CST } from "../CST";
var soundOn = true;
var wasdOn = true;
var soundYeet;
var soundDatBei;
var soundPlay;
var soundSelect;
var soundBack;
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
    //music
      music = this.sound.add('spaceTheme');
      music.setLoop(true);

      //sound effects
    soundYeet = this.sound.add('yeet');
    soundDatBei = this.sound.add('datBei');
    soundPlay = this.sound.add('playPlay');
    soundSelect = this.sound.add('playSelect');
    soundBack = this.sound.add('playBack');
    //create menu background image
    let backdrop;
    backdrop = this.add.image(400, 300, 'mountains').setScale(1);
    this.add.image(10, 175, 'title').setScale(.4).setOrigin(0, 0);
    //planets
    this.add.image(700, 100, 'bigPlanet1').setScale(.5);
    this.add.image(250, 400, 'mesosPlanet').setScale(.2);

    this.add.image(100, 450, 'lavaMonster').setScale(.75).setAngle(-30);
    var easterEgg1 = this.add.image(90, 485, 'lavaMonster').setScale(.75).setAngle(-30);
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
    this.scene.launch("titleScene");

    easterEgg1.setInteractive();
    easterEgg1.on("pointerup", ()=>  {
      if(soundOn)
        soundYeet.play();
    })

  }

}
