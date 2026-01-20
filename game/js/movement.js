

function movement1(player) {
  if (player.death) {
    player.velocity.x = 0;
  }else{
    if (keys.d.press) {
      player.velocity.x = speedOFwalk;
      if(!player.isAttacking){
        player.attackBox.offset.x = 0;
      }
      player.switchSprite('run_right');
  
    } else if (keys.a.press) {
      player.velocity.x = -speedOFwalk;
      if(!player.isAttacking){
        player.attackBox.offset.x = player.attackBox.width - player.width;
      }
      player.switchSprite('run_left');
  
    }
    else {
      if (player.lastKey == 'd') {
        player.switchSprite('idle_right');
  
      } else if (player.lastKey == 'a') {
        player.switchSprite('idle_left');
      } else if (onFloar(player)) {
        player.switchSprite('idle_right');
      }
    }
  
    if (player.velocity.y < 0) {
  
      if (player.velocity.y < 0 && (keys.d.press || player.lastKey == 'd')) {
        player.switchSprite('jump_right');
  
      } else if (player.velocity.y < 0 && (keys.a.press || player.lastKey == 'a')) {
        player.switchSprite('jump_left');
  
      } else if (player.velocity.y < 0) {
        player.switchSprite('jump_right');
  
      }
    } else if (player.velocity.y > 0) {
      if (player.velocity.y > 0 && (keys.d.press || player.lastKey == 'd')) {
        player.switchSprite('fall_right');
      } else if (player.velocity.y > 0 && (keys.a.press || player.lastKey == 'a')) {
        player.switchSprite('fall_left');
      } else if (onFloar(player) && player.lastKey == 'd') {
        player.switchSprite('idle_right');
      } else if (onFloar(player) && player.lastKey == 'a') { // stop fall if  player on floar
        player.switchSprite('idle_left');
      } else if (player.velocity.y > 0) {
        player.switchSprite('fall_right');
      }
    }
  }
  if ((player.velocity.x > 0 || player.velocity.x < 0) && onFloar(player)) {

    if (valueSound == 1) {
      stepsPL1.play();
    }
  }
}

function movement2(player) {
  if (player.death) {
    player.velocity.x = 0;
  }else{
    if (keys.ArrowRight.press) {
      player.velocity.x = speedOFwalk + 3;
      if(!player.isAttacking){
        player.attackBox.offset.x = 0;
      }
      player.switchSprite('run_right');
    } else if (keys.ArrowLeft.press) {
      player.velocity.x = -speedOFwalk - 3;
      if(!player.isAttacking){
        player.attackBox.offset.x = player.attackBox.width - player.width;
      }
      player.switchSprite('run_left');
    }
    else {
      if (player.lastKey == 'ArrowRight') {
        player.switchSprite('idle_right');
      } else if (player.lastKey == 'ArrowLeft') {
        player.switchSprite('idle_left');
      } else if (onFloar(player)) {
        player.switchSprite('idle_left');
      }
    }
  
    if (player.velocity.y < 0) {
      if (player.velocity.y < 0 && (keys.ArrowRight.press || player.lastKey == 'ArrowRight')) {
        player.switchSprite('jump_right');
      } else if (player.velocity.y < 0 && (keys.ArrowLeft.press || player.lastKey == 'ArrowLeft' || player.lastKey == undefined)) {
        player.switchSprite('jump_left');
      } else if ((player.velocity.y < 0) ){
        player.switchSprite('jump_right');
      }
    } else if (player.velocity.y > 0) {
      player.switchSprite('fall_left');
      if (player.velocity.y > 0 && (keys.ArrowRight.press || player.lastKey == 'ArrowRight' )) {
        player.switchSprite('fall_right');
      } else if (player.velocity.y > 0 && (keys.ArrowLeft.press || player.lastKey == 'ArrowLeft')) {
        player.switchSprite('fall_left');
      } else if (player.velocity.y == 0 && player.lastKey == 'ArrowRight') {
        player.switchSprite('idle_right');
      } else if (player.velocity.y == 0 && player.lastKey == 'ArrowLeft') { // stop fall if  player on floar
        player.switchSprite('idle_left');
      } else if (player.velocity.y > 0 ) {
        player.switchSprite('fall_left');
      }
    }
  } 
  if ((player.velocity.x > 0 || player.velocity.x < 0) && onFloar(player)) {

    if (valueSound == 1) {
      stepsPL2.play();
    }
  }
}
function checkWall(player) {
  if (player.position.x <= 0) {
    player.position.x = 1;
  } else if (player.position.x >= 1450) {
    player.position.x = 1449;
  }
}
