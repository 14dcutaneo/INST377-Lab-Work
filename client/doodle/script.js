document.addEventListener('DOMContentLoaded', () => {
   
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')

    let doodlerLeft = 50
    let startPoint = 150
    let doodlerBottom = startPoint
    let platformCount = 5
    let score = 0

    let isGameOver = false
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false

    let platforms = []

    let upTimerID
    let downTimerID

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeft = platforms[0].left
        doodler.style.left = doodlerLeft + 'px'
        doodler.style.bottom = doodlerBottom + 'px'
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let num = 0; num < platformCount; num++) {
            let platformGap = 600 / platformCount
            let newPlatformBottom = 100 + num * platformGap
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform)
            
        }
    }

    function movePlatforms() {
        if (doodlerBottom > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerID)
        isJumping = true
        upTimerID = setInterval(function () {
            doodlerBottom += 20
            doodler.style.bottom = doodlerBottom + 'px'
            if (doodlerBottom > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    function fall(){
        clearInterval(upTimerID)
        isJumping = false
        downTimerID = setInterval(function () {
            doodlerBottom -= 5
            doodler.style.bottom = doodlerBottom + 'px'
            if (doodlerBottom <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (doodlerBottom >= platform.bottom &&
                    doodlerBottom <= platform.bottom + 15 &&
                    doodlerLeft + 60 >= platform.left &&
                    doodlerLeft <= platform.left + 85 &&
                    !isJumping) {

                        console.log('landed')
                        startPoint = doodlerBottom
                        jump()
                    }
            })

        }, 30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true

        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerID)
        clearInterval(downTimerID)
        clearInterval(leftTimerID)
        clearInterval(rightTimerID)    
    }

    function control(controller) {
        if (controller.key === "ArrowLeft") {
            moveLeft()
        } else if (controller.key === "ArrowRight") {
            moveRight()
        } else if (controller.key === "ArrowUp") {
            moveStraight()
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerID)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerID = setInterval(function () {
            if (doodlerLeft >= 0 ) {
                doodlerLeft -= 5
                doodler.style.left = doodlerLeft + 'px'
            } else moveRight()
           
        }, 30)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerID)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerID = setInterval(function () {
            if (doodlerLeft <= 340 ) {
                doodlerLeft += 5
                doodler.style.left = doodlerLeft + 'px'
            } else moveLeft()
           
        }, 30)
    }

    function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerID)
        clearInterval(rightTimerID)
    }

    function start() {
        if (isGameOver === false) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()

            document.addEventListener('keyup', control)
        }
    }

    start()
})