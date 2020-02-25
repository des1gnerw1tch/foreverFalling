//import { CST } from "../CST";
class LoadScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("loadGame");
  }

  preload() {

    this.load.image('space', 'assets/space.png');
      //loading hitobjects
    this.load.spritesheet('meteor', 'assets/meteorMe.png', {frameWidth: 119, frameHeight: 120});
    this.load.image('stone', 'assets/stone.png');
    this.load.image('fireball', 'assets/fireball.png');
    this.load.spritesheet('lavaMonster', 'assets/lavaMonster.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('energyBall', 'assets/energyBall.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('fairy', 'assets/fairy.png', {frameWidth: 87, frameHeight: 87});
    this.load.spritesheet('spaceship', 'assets/spaceship.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('iceCloud', 'assets/iceClouds.png', {frameWidth: 192, frameHeight: 114});
    this.load.spritesheet('plane', 'assets/plane.png', {frameWidth: 192, frameHeight: 84});
    this.load.spritesheet('satellite', 'assets/satellite.png', {frameWidth: 180, frameHeight: 186});
    this.load.spritesheet('bird', 'assets/bird.png', {frameWidth: 42, frameHeight: 28});
      //load UI.
    this.load.image('title', 'assets/title.png');
    this.load.image('mountains', 'assets/mountains2.png');
    this.load.image('playButton', 'assets/play.png');
    this.load.image('optionsButton', 'assets/options.png');
    this.load.image('extrasButton', 'assets/extras.png');
  //  this.load.image('bluePanel', 'spaceUI/PNG/metalPanel_blue.png');
      //background objects
    this.load.image('star', 'assets/star.png');
    this.load.image('smallMars', 'assets/smallMars.png');
    this.load.image('saturn', 'assets/saturn.png');
    this.load.image('bigPlanet1', 'assets/bigPlanet1.png');
    this.load.image('pluto', 'assets/pluto.png');
    this.load.image('mesosPlanet', 'assets/mesosPlanet.png');
      //blocks
    this.load.image('block1', 'assets/block1.png');
    this.load.image('block2', 'assets/block2.png');
    this.load.image('block3', 'assets/block3.png');
    this.load.image('block4', 'assets/block4.png');
      //Sprites
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('astronaut', 'assets/astronaut.png', { frameWidth: 43.5, frameHeight: 64 });
        //theme music
      this.load.audio('spaceTheme', 'assets/menuMusic.mp3');
      //sound effects
    this.load.audio('yeet', 'assets/maxyeet.m4a');
    this.load.audio('datBei', 'assets/maxdatbei.m4a');
    //particles
    this.load.image('starParticle', 'assets/blue.png');
    this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
      //loading text
    this.add.text(20, 20, "Loading Game...");

      //loading bar
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff // white
      }
    })

    this.load.on("progress", (percent)=>{
    loadingBar.fillRect(0, 400, 800 * percent, 50);
    console.log(percent);
  })

}

  create () {
    //animations -------------------------------------------------------------
    //player movement
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('astronaut', {start: 4, end: 7}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('astronaut', {start: 8, end: 11}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('astronaut', {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'falling',
      frames: this.anims.generateFrameNumbers('astronaut', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })

    //Meteor Types
    this.anims.create({
      key: 'm0',
      frames: [ { key: 'meteor', frame: 0 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm1',
      frames: [ { key: 'meteor', frame: 1 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm2',
      frames: [ { key: 'meteor', frame: 2 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm3',
      frames: [ { key: 'meteor', frame: 3 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm4',
      frames: [ { key: 'meteor', frame: 4 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm5',
      frames: [ { key: 'meteor', frame: 5 } ],
      frameRate: 20,
    })

    //Lava Dude
    this.anims.create({
      key: 'aLavaMonster',
      frames: this.anims.generateFrameNumbers('lavaMonster', {start: 0, end: 6}),
      frameRate: 12,
      repeat: -1
    })

    //Energy Ball animations
    this.anims.create({
      key: 'aEnergyBall',
      frames: this.anims.generateFrameNumbers('energyBall', {start: 0, end: 6}),
      frameRate: 48,
      repeat: -1
    })

    //Fairy animations
    this.anims.create({
      key: 'aFairy',
      frames: this.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
    })

    //Spaceship animations
    this.anims.create({
      key: 'aSpaceship',
      frames: this.anims.generateFrameNumbers('spaceship', {start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
    })

    //Ice cloud animations
    this.anims.create({
      key: 'aIceCloud',
      frames: this.anims.generateFrameNumbers('iceCloud', {start: 0, end: 2}),
      frameRate: 9,
      repeat: -1
    })

    //Plane animation
    this.anims.create({
      key: 'aPlane',
      frames: this.anims.generateFrameNumbers('plane', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })
    //satellite animation
    this.anims.create({
      key: 'aSatellite',
      frames: this.anims.generateFrameNumbers('satellite', {start: 0, end: 3}),
      frameRate: 3,
      repeat: -1
    })

    //bird animations
      //black bird
    this.anims.create({
        key: 'aBBird',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
      //red bird
    this.anims.create({
        key: 'aRBird',
        frames: this.anims.generateFrameNumbers('bird', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        //yellow bird
    this.anims.create({
          key: 'aYBird',
          frames: this.anims.generateFrameNumbers('bird', { start: 4, end: 5 }),
          frameRate: 10,
          repeat: -1
          });
      //start menu screen
    this.scene.start("startMenu");
  }
}
