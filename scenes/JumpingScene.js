var platforms;
var soundYeet;
var soundDatBei;
class JumpingScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("enterIntro");
  }

  create()  {
    //keys
    keys = this.input.keyboard.addKeys('W,S,A,D,');

      //Background
      for (var i = 0; i < 100; i++) {
        var aStar = this.add.image(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 600), 'star');
        aStar.setDepth(-1);
      }

          this.add.image(700, 100, 'smallMars').setScale(1);
  //  spaceBackground = this.add.image(400, 300, 'space');
    platforms = this.physics.add.staticGroup();

      //creating platforms
      //silver platforms
    for (var i = 1; i <=4; i++) {

      var y = 330 + (30*i);
      for (var x = 320 + (40*i); x <= 800; x+=40) {
      platforms.create(x, y, 'block1').setScale(.5).refreshBody();
      }
    }
      //caution platforms
    platforms.create(360, 360, 'block3').setScale(.5).refreshBody();
    platforms.create(400, 360, 'block3').setScale(.5).refreshBody();
    platforms.create(440, 360, 'block3').setScale(.5).refreshBody();
    platforms.create(480, 360, 'block3').setScale(.5).refreshBody();
      //barrels!
    platforms.create(720, 330, 'block2').setScale(.5).refreshBody();
    platforms.create(760, 330, 'block2').setScale(.5).refreshBody();
    platforms.create(760, 300, 'block2').setScale(.5).refreshBody();
    platforms.create(640, 330, 'block2').setScale(.5).refreshBody();
      //player!
    player = this.physics.add.sprite(700, 200, 'astronaut').setScale(.7);

      //player animations for "dude"!
  /*  this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });*/

    //player animations for astronaut!

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
      //gravity
    player.body.gravity.y = 800;

    //colliders
    this.physics.add.collider(player, platforms);

      //sound effects
    soundYeet = this.sound.add('yeet');
    soundDatBei = this.sound.add('datBei');

  }
  update()  {
    if (keys.A.isDown)  {
      player.setVelocityX(-200);
      player.anims.play('left', true);
    }
    else if (keys.D.isDown) {
      player.setVelocityX(200);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('idle', true);
    }
    if (keys.W.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
        soundYeet.play();
    }

    if (player.y > 600) {
      soundDatBei.play();
      this.scene.start("enterGame");
    }
  }

}
