
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const speedOFwalk = 8;


canvas.width = 1520;
canvas.height = 620;

const gravity = 1.01;

c.fillRect(0, 0, canvas.width, canvas.height);

const keys = {
  a: {
    press: false
  },
  d: {
    press: false
  },
  t: {
    press: false
  },
  ArrowRight: {
    press: false
  },
  ArrowLeft: {
    press: false
  }
}
var startTimer = false;
let KeyPL;
let lastKey;
let timer = 61;
var gameEnd = false;
var paused = false;
var element = document.querySelector('.form');
var valueMusic = 1;
var valueSound = 1;
var valueDifficulty = 0;
audio.play();
player_one.KeyPL = 1;
player_two.KeyPL = 2;

function animate() {
  if (paused == false) {
    window.requestAnimationFrame(animate);
  }
  background.update();

  player_one.update();
  player_two.update();
  chain.update();


  player_one.velocity.x = 0;
  player_two.velocity.x = 0;


  //movement
  movement1(player_one);
  movement2(player_two);


  //wall
  checkWall(player_one);
  checkWall(player_two)


  //Attacking

  AttackPL1(player_one, player_two)
  AttackPL2(player_two, player_one)

  if (player_one.death || player_two.death) {
    gameEnd = true;
  }
}

window.addEventListener('keydown', (event) => {
  if ((event.which == 82 && gameEnd) || (event.which == 82 && timer == 0) ) {
    location.reload();
  }

})


//movement player

window.addEventListener('keydown', (event) => {

  if (!player_one.death && paused == false) {
    switch (event.key) {
      case 'd':
        keys.d.press = true;
        player_one.lastKey = 'd';
        break;
      case 'a':
        keys.a.press = true;
        player_one.lastKey = 'a';
        break;
      case 'w':
        if (onFloar(player_one)) {
          player_one.velocity.y = -20;
          if (valueSound == 1) {
            jumpPL1.play();
          }

        }
        break;
    }
  }

  if (!player_two.death && paused == false) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.press = true;
        player_two.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.press = true;
        player_two.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        if (onFloar(player_two)) {
          player_two.velocity.y = -20;

          if (valueSound == 1) {
            jumpPL2.play();
          }
        }
        break;

    }
  }

})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.press = false;
      break;
    case 'a':
      keys.a.press = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.press = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.press = false;
      break;
    case 's':
      player_one.attack();
      break;
    case 'ArrowDown':
      player_two.attack();
      break;
  }
})