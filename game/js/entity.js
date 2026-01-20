const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background/bg2.png',
    scale: 7.6
})
const chain = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './Assets/Chaint.png',
    scale: 7.6,
    countofFrames: 18,
})

const player_one = new Entity({

    position: {
        x: 140,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './Assets/PL1/Idle.png',
    countofFrames: 10,
    
    scale: 6,
    offset: {
        x: 450,
        y: 370
    },
    sprites: {
        idle_right: {
            imageSrc: './Assets/PL1/Idle.png',
            countofFrames: 10,
        },
        idle_left: {
            imageSrc: './Assets/PL1/Idle2.png',
            countofFrames: 10,
        },
        run_right: {
            imageSrc: './Assets/PL1/Run.png',
            countofFrames: 8,
        },
        run_left: {
            imageSrc: './Assets/PL1/Run2.png',
            countofFrames: 8,
        },
        jump_right: {
            imageSrc: './Assets/PL1/Jump.png',
            countofFrames: 3,
        },
        jump_left: {
            imageSrc: './Assets/PL1/Jump2.png',
            countofFrames: 3,
        },
        fall_right: {
            imageSrc: './Assets/PL1/Fall.png',
            countofFrames: 3,
        },
        fall_left: {
            imageSrc: './Assets/PL1/Fall2.png',
            countofFrames: 3,
        },
        attack_right: {
            imageSrc: './Assets/PL1/Attack1.png',
            countofFrames: 10,
        },
        attack_left: {
            imageSrc: './Assets/PL1/Attack1_2.png',
            countofFrames: 10,
        },
        takeHit_right: {
            imageSrc: './Assets/PL1/Take hit.png',
            countofFrames: 3,
        },
        takeHit_left: {
            imageSrc: './Assets/PL1/Take hit2.png',
            countofFrames: 3,
        },
        death_right: {
            imageSrc: './Assets/PL1/Death.png',
            countofFrames: 6,
        },
        death_left: {
            imageSrc: './Assets/PL1/Death2.png',
            countofFrames: 6,
        },

    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 220,
        height: 50
    },

})

const player_two = new Entity({
    position: {
        x: 1350,
        y: 300,
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './Assets/PL2/Idle.png',
    countofFrames: 8,
    scale: 6,
    offset: {
        x: 440,
        y: 360
    },
    height: 220,
    width:70,
    sprites: {
        idle_right: {
            imageSrc: './Assets/PL2/Idle.png',
            countofFrames: 8,
        },
        idle_left: {
            imageSrc: './Assets/PL2/Idle2.png',
            countofFrames: 8,
        },
        run_right: {
            imageSrc: './Assets/PL2/Run.png',
            countofFrames: 8,
        },
        run_left: {
            imageSrc: './Assets/PL2/Run2.png',
            countofFrames: 8,
        },
        jump_right: {
            imageSrc: './Assets/PL2/Jump.png',
            countofFrames: 2,
        },
        jump_left: {
            imageSrc: './Assets/PL2/Jump2.png',
            countofFrames: 2,
        },
        fall_right: {
            imageSrc: './Assets/PL2/Fall.png',
            countofFrames: 2,
        },
        fall_left: {
            imageSrc: './Assets/PL2/Fall2.png',
            countofFrames: 2,
        },
        attack_right: {
            imageSrc: './Assets/PL2/Attack1.png',
            countofFrames: 8,
        },
        attack_left: {
            imageSrc: './Assets/PL2/Attack1_2.png',
            countofFrames: 8,
        },
        takeHit_right: {
            imageSrc: './Assets/PL2/Take hit.png',
            countofFrames: 4,
        },
        takeHit_left: {
            imageSrc: './Assets/PL2/Take hit2.png',
            countofFrames: 4,
        },
        death_right: {
            imageSrc: './Assets/PL2/Death.png',
            countofFrames: 6,
        },
        death_left: {
            imageSrc: './Assets/PL2/Death2.png',
            countofFrames: 6,
        },

    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 160,
        height: 50
    }

})