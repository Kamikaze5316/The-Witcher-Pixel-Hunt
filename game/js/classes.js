class Sprite {
    constructor({ position, imageSrc, scale = 1, countofFrames = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.height = 200;
        this.width = 70;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.countofFrames = countofFrames;
        this.framesOffset = 0;
        this.frameTimer = 0;
        this.framePause = 10;
        this.offset = offset
    }

    draw() {
        c.imageSmoothingEnabled = false;
        c.drawImage(
            this.image,
            this.framesOffset * (this.image.width / this.countofFrames),
            0,
            (this.image.width / this.countofFrames),
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.countofFrames) * this.scale,
            this.image.height * this.scale);
    }

    animateFrames() {
        this.frameTimer++;
        if (this.frameTimer % this.framePause === 0) {
            if (this.framesOffset < this.countofFrames - 1) {
                this.framesOffset++;
            } else {
                this.framesOffset = 0;
            }
        }
    }
    
    update() {
        this.draw();
        this.animateFrames();
    }
}

class Entity extends Sprite {
    constructor({ position,
        velocity,
        imageSrc,
        scale = 1,
        countofFrames = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
            },
        death = false }) {
        super({
            position,
            imageSrc,
            scale,
            countofFrames,
            offset
        })
        this.position = position;
        this.velocity = velocity;
        this.health = 100;
        this.death = death;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height

        }
        this.isAttacking;
        this.framesOffset = 0;
        this.frameTimer = 0;
        this.framePause = 6;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }

    update() {
        this.draw();
        if (!this.death) {
            this.animateFrames();
        }

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        // c.fillStyle = 'green';
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (onFloar(this)) {
            this.velocity.y = 0;

        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        if (this.lastKey == 'd' || this.lastKey == 'ArrowRight') {
            this.switchSprite('attack_right');
        } else if (this.lastKey == 'a' || this.lastKey == 'ArrowLeft') {
            this.switchSprite('attack_left');
        }
        if (!this.isAttacking) {
            this.isAttacking = true;
        }

    }

    //shitcode at the bottom :)
    takeHit() {
        if (this.health <= 0) {
            if (this.lastKey == 'ArrowRight' || this.lastKey == 'd') {
                this.switchSprite('death_right');
            } else if (this.lastKey == 'ArrowLeft' || this.lastKey == 'a') {
                this.switchSprite('death_left');
            } else {
                if ((this.lastKey == 'ArrowRight' && this.KeyPL == 2) || (this.lastKey == undefined && this.KeyPL == 1)) {
                    this.switchSprite('death_right');
                } else if ((this.lastKey == undefined && this.KeyPL == 2) || (this.lastKey == 'a' && this.KeyPL == 1)) {
                    this.switchSprite('death_left');
                }
            }
            if (this.KeyPL == 2) {
                if (valueSound == 1) {
                    deathPL2.play();
                }
            } else if (this.KeyPL == 1) {
                if (valueSound == 1) {
                    deathPL1.play();
                }
            }
        } else if (this.lastKey == 'ArrowRight' || this.lastKey == 'd') {
            this.switchSprite('takeHit_right');
        } else if (this.lastKey == undefined && this.KeyPL == 1) {
            this.switchSprite('takeHit_right');
        } else {
            this.switchSprite('takeHit_left');
        }
    }

    switchSprite(sprite) {
        
        if (this.image === this.sprites.death_right.image) {
            if (this.framesOffset === this.sprites.death_right.countofFrames - 1) {
                this.death = true;
            }
            return

        }
        if (this.image === this.sprites.death_left.image) {
            if (this.framesOffset === this.sprites.death_left.countofFrames - 1) {
                this.death = true;
            }
            return
        }

        if (this.image === this.sprites.attack_right.image && this.framesOffset < this.sprites.attack_right.countofFrames - 1) {
            return
        } else if (this.image === this.sprites.attack_left.image && this.framesOffset < this.sprites.attack_left.countofFrames - 1) {
            return
        }

        if (this.image === this.sprites.takeHit_right.image && this.framesOffset < this.sprites.takeHit_right.countofFrames - 1) {
            return
        } else if (this.image === this.sprites.takeHit_left.image && this.framesOffset < this.sprites.takeHit_left.countofFrames - 1) {
            return
        }

        switch (sprite) {
            case 'idle_right':
                if (this.image !== this.sprites.idle_right.image) {
                    this.image = this.sprites.idle_right.image;
                    this.countofFrames = this.sprites.idle_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'idle_left':
                if (this.image !== this.sprites.idle_left.image) {
                    this.image = this.sprites.idle_left.image;
                    this.countofFrames = this.sprites.idle_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'run_right':
                if (this.image !== this.sprites.run_right.image) {
                    this.image = this.sprites.run_right.image;
                    this.countofFrames = this.sprites.run_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'run_left':
                if (this.image !== this.sprites.run_left.image) {
                    this.image = this.sprites.run_left.image;
                    this.countofFrames = this.sprites.run_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'jump_right':
                if (this.image !== this.sprites.jump_right.image) {
                    this.image = this.sprites.jump_right.image;
                    this.countofFrames = this.sprites.jump_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'jump_left':
                if (this.image !== this.sprites.jump_left.image) {
                    this.image = this.sprites.jump_left.image;
                    this.countofFrames = this.sprites.jump_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'fall_right':
                if (this.image !== this.sprites.fall_right.image) {
                    this.image = this.sprites.fall_right.image;
                    this.countofFrames = this.sprites.fall_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'fall_left':
                if (this.image !== this.sprites.fall_left.image) {
                    this.image = this.sprites.fall_left.image;
                    this.countofFrames = this.sprites.fall_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'attack_right':
                if (this.image !== this.sprites.attack_right.image) {
                    this.image = this.sprites.attack_right.image;
                    this.countofFrames = this.sprites.attack_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'attack_left':
                if (this.image !== this.sprites.attack_left.image) {
                    this.image = this.sprites.attack_left.image;
                    this.countofFrames = this.sprites.attack_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'takeHit_right':
                if (this.image !== this.sprites.takeHit_right.image) {
                    this.image = this.sprites.takeHit_right.image;
                    this.countofFrames = this.sprites.takeHit_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'takeHit_left':
                if (this.image !== this.sprites.takeHit_left.image) {
                    this.image = this.sprites.takeHit_left.image;
                    this.countofFrames = this.sprites.takeHit_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'death_right':
                if (this.image !== this.sprites.death_right.image) {
                    this.image = this.sprites.death_right.image;
                    this.countofFrames = this.sprites.death_right.countofFrames;
                    this.framesOffset = 0;
                }
                break;
            case 'death_left':
                if (this.image !== this.sprites.death_left.image) {
                    this.image = this.sprites.death_left.image;
                    this.countofFrames = this.sprites.death_left.countofFrames;
                    this.framesOffset = 0;
                }
                break;
        }
    }
}

function onFloar(player) {
    if (player.position.y + player.height >= (canvas.height - 50)) {
        return true;
    } else {
        return false;
    }
}

