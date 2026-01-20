function timerOut() {

    if (timer > 0 && startTimer) {
        keyTimeout = setTimeout(timerOut, 1000);
        if (paused == false) {
            timer--;
        }
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer == 0) {
        if (player_one.health == player_two.health) {
            document.querySelector('#alertText').innerHTML = 'Tie';
            document.querySelector('#alertText').style.display = 'flex';
        } else if (player_one.health > player_two.health) {
            clearTimeout(keyTimeout);
            document.querySelector('#alertText').innerHTML = 'The Witcher Win';
            document.querySelector('#alertText').style.display = 'flex';
        } else if (player_one.health < player_two.health) {
            clearTimeout(keyTimeout);
            document.querySelector('#alertText').innerHTML = 'The Vampire Win';
            document.querySelector('#alertText').style.display = 'flex';
        }
    }
    if (player_one.health <= 0) {
        clearTimeout(keyTimeout);
        document.querySelector('#alertText').innerHTML = 'The Vampire Win';
        document.querySelector('#alertText').style.display = 'flex';
    } else if (player_two.health <= 0) {
        clearTimeout(keyTimeout);
        document.querySelector('#alertText').innerHTML = 'The Witcher Win';
        document.querySelector('#alertText').style.display = 'flex';

    }
}

function rectangularCollision(rectangular1, rectangular2) {
    return ((rectangular1.attackBox.position.x + rectangular1.attackBox.width >= rectangular2.position.x)
        && (rectangular1.attackBox.position.x <= rectangular2.position.x + rectangular2.width)
        && (rectangular1.attackBox.position.y + rectangular1.attackBox.height >= rectangular2.position.y)
        && (rectangular1.attackBox.position.y <= rectangular2.position.y + rectangular2.height)
    )
}

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    el.style.zIndex = 90;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

function StartGame() {
    if (!startTimer) {
        audio.src = '/sound/mainTheme/start.mp3';
        audio.loop = false;
        setTimeout(() => fadeOut(document.querySelector('.menu'), 1000), 3);
        if (valueMusic == 1) {
            setTimeout(() => fight.play(), 3000);
        }
        setTimeout(() => {
            timerOut();
            animate();
            PauseGame();
        }, 3);
        startTimer = true;
    }
}

function SwitchSelection(nameClass) {
    var elements = document.querySelector('.subbox');
    var notes = null;
    for (var i = 0; i < elements.childNodes.length; i++) {
        if (i % 2 != 0 && elements.childNodes[i].className != nameClass) {
            notes = elements.childNodes[i].className;
            fadeOut(document.querySelector('.' + notes + ''), 1);
        }

    }
    fadeIn(document.querySelector('.' + nameClass + ''), 1, 'flex');
}

function soundInGame() {
    var element = document.querySelector('.form');
    valueMusic = element.music.value;
    valueSound = element.soundGame.value;
    valueDifficulty = element.difficulty.value;
    if (valueMusic == 1) {
        audio.play();
    } else if (valueMusic == 0) {
        audio.pause();
    }
}

function PauseGame() {
    window.addEventListener('keydown', (event) => {
        if (event.which == 27 && paused == false) {
            paused = true;
            console.log("на паузе");
            fadeIn(document.querySelector('.pause'), 1, 'flex')

        } else if (event.which == 27 && paused) {
            paused = false;
            animate();
            console.log("не на паузе");
            fadeOut(document.querySelector('.pause'), 1)
        }

    })
}

function AttackPL1(player1, player2) {
    if (rectangularCollision(player1, player2) &&
        player1.isAttacking &&
        player1.framesOffset == 4 &&
        (player1.image === player1.sprites.attack_right.image || player1.image === player1.sprites.attack_left.image)) {
        player2.health -= 10;
        player2.takeHit();
        if (valueSound == 1) {
            hitPL2.play();
        }
        player1.isAttacking = false;
        document.querySelector('#healthBar_two').style.background = 'linear-gradient(90deg, rgba(190,17,24,1) ' + player2.health + '%, rgba(74,0,0,0.5) ' + player2.health + '%)';
    } else if (!rectangularCollision(player1, player2) &&
        player1.isAttacking &&
        player1.framesOffset == 4 &&
        (player1.image === player1.sprites.attack_right.image || player1.image === player1.sprites.attack_left.image)) {
        if (valueSound == 1) {
            missPL1.play();
        }
        player1.isAttacking = false;
    }

}

function AttackPL2(player1, player2) {
    if (rectangularCollision(player1, player2) &&
        player1.isAttacking &&
        player1.framesOffset == 4 &&
        (player1.image === player1.sprites.attack_right.image || player1.image === player1.sprites.attack_left.image)) {
        if (valueDifficulty == 1) {
            player2.health -= 10;
        } else {
            player2.health -= 20;
        }
        player2.takeHit();
        if (valueSound == 1) {
            hitPL1.play();
        }
        player1.isAttacking = false;
        document.querySelector('#healthBar_one').style.background = 'linear-gradient(-90deg, rgba(190,17,24,1) ' + player2.health + '%, rgba(74,0,0,0.5) ' + player2.health + '%)';
    } else if (!rectangularCollision(player1, player2) &&
        player1.isAttacking &&
        player1.framesOffset == 4 &&
        (player1.image === player1.sprites.attack_right.image || player1.image === player1.sprites.attack_left.image)) {
        if (valueSound == 1) {
            missPL2.play();
        }
        player1.isAttacking = false;
   
    }
}

