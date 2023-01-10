var firstClick = 0
var positions = []
var boardArray = []
var countMoves = 0
var updateClock = null

var blockade = document.createElement("div")
blockade.id = "blockade"

var imgBlockade = document.createElement("div")
imgBlockade.id = "imgBlockade"

var myGame = document.createElement("div")
myGame.id = "myGame"
document.body.appendChild(myGame)

var mySlider = document.createElement("div")
mySlider.id = "mySlider"
myGame.appendChild(mySlider)

var topImg0 = document.createElement("img")
topImg0.classList.add("slide")
topImg0.id = "topImg0"
topImg0.style.backgroundImage = "url(images/image1.jpg)"
topImg0.style.left = "-150px"
mySlider.appendChild(topImg0)

var topImg1 = document.createElement("img")
topImg1.classList.add("slide")
topImg1.id = "topImg1"
topImg1.style.backgroundImage = "url(images/image2.jpg)"
topImg1.style.left = "0px"
mySlider.appendChild(topImg1)

var topImg2 = document.createElement("img")
topImg2.classList.add("slide")
topImg2.id = "topImg2"
topImg2.style.backgroundImage = "url(images/image3.jpg)"
topImg2.style.left = "150px"
mySlider.appendChild(topImg2)

var topImg3 = document.createElement("img")
topImg3.classList.add("slide")
topImg3.id = "topImg3"
topImg3.style.backgroundImage = "url(images/image1.jpg)"
topImg3.style.left = "300px"
mySlider.appendChild(topImg3)

var topImg4 = document.createElement("img")
topImg4.classList.add("slide")
topImg4.id = "topImg4"
topImg4.style.backgroundImage = "url(images/image2.jpg)"
topImg4.style.left = "450px"
mySlider.appendChild(topImg4)

var slides = mySlider.getElementsByClassName("slide")

var leftBtn = document.createElement("button")
leftBtn.classList.add("sliderBtns")
leftBtn.style.left = "-100px"
leftBtn.innerHTML = "<"
leftBtn.addEventListener("click", moveLeft)
mySlider.appendChild(leftBtn)

var rightBtn = document.createElement("button")
rightBtn.style.left = "175px"
rightBtn.classList.add("sliderBtns")
rightBtn.innerHTML = ">"
rightBtn.addEventListener("click", moveRight)
mySlider.appendChild(rightBtn)

var white = document.createElement("div")
white.id = "white"
mySlider.appendChild(white)

var white2 = document.createElement("div")
white2.id = "white2"
mySlider.appendChild(white2)

var moveIndex = 0

function moveRight() {
    moveIndex++
    if (moveIndex == 3) {
        for (x = 0; x < 5; x++) {
            moveIndex = 0
            let el = document.getElementById("topImg" + x)
            let pos = el.style.left
            pos = pos.substring(0, pos.length - 2)
            el.style.left = (parseInt(pos) + 450) + "px"
        }
    }
    var count = 0
    var int = setInterval(function () {
        count += 5
        for (x = 0; x < 5; x++) {
            let el = document.getElementById("topImg" + x)
            let pos = el.style.left
            pos = pos.substring(0, pos.length - 2)
            el.style.left = (parseInt(pos) - 5) + "px"
            if (count == 150) {
                clearInterval(int)
            }
        }
    }, 1)
}

function moveLeft() {
    moveIndex--
    if (moveIndex == -1) {
        for (x = 0; x < 5; x++) {
            moveIndex = 2
            let el = document.getElementById("topImg" + x)
            let pos = el.style.left
            pos = pos.substring(0, pos.length - 2)
            el.style.left = (parseInt(pos) - 450) + "px"
        }
    }
    var count = 0
    var int = setInterval(function () {
        count += 5
        for (x = 0; x < 5; x++) {
            let el = document.getElementById("topImg" + x)
            let pos = el.style.left
            pos = pos.substring(0, pos.length - 2)
            el.style.left = (parseInt(pos) + 5) + "px"
            if (count == 150) {
                clearInterval(int)
            }
        }
    }, 1)
}

var buttons = document.createElement("div")
buttons.id = "buttons"
for (let x = 3; x <= 6; x++) {
    let button = document.createElement("button")
    button.innerHTML = x + "x" + x
    button.id = "button" + x
    button.classList.add("buttons")
    button.addEventListener("click", function () { makeGrid(x) })
    buttons.appendChild(button)
}
myGame.appendChild(buttons)


var gameBoard = document.createElement("div")
gameBoard.id = "gameBoard"
myGame.appendChild(gameBoard)

function makeGrid(e) {


    positions = []
    boardArray = []
    let cells = document.getElementById("gameBoard").childNodes
    let len = cells.length
    for (i = 0; i < len; i++) {
        cells[0].remove()
    }

    var cellWidth = 540 / e
    var cellHeight = 540 / e
    for (let y = 0; y < e; y++) {
        boardArray.push([])
        positions.push([])
        for (let x = 0; x < e; x++) {
            if (x == e - 1 && y == e - 1) {
                boardArray[y].push(0)
                let cell = document.createElement("div")
                cell.classList.add("cells")
                cell.id = "cell." + y + "." + x
                cell.style.backgroundColor = "black"
                cell.style.width = cellHeight + "px"
                cell.style.height = cellWidth + "px"
                cell.style.top = y * cellHeight + "px"
                cell.style.left = x * cellWidth + "px"
                document.getElementById("gameBoard").appendChild(cell)
                cell.addEventListener("click", function () { move(e, this) })

            }
            else {
                if (y == e - 1 && x == e - 2) {
                    boardArray[y].push(2)
                }
                else if (y == e - 2 && x == e - 1) {
                    boardArray[y].push(2)
                }
                else {
                    boardArray[y].push(1)
                }
                let cell = document.createElement("div")
                cell.classList.add("cells")
                cell.id = "cell." + y + "." + x
                if (moveIndex == 0) {
                    cell.style.backgroundImage = "url(images/image2.jpg)"
                } else if (moveIndex == 1) {
                    cell.style.backgroundImage = "url(images/image3.jpg)"
                } else if (moveIndex == 2) {
                    cell.style.backgroundImage = "url(images/image1.jpg)"
                }
                cell.style.backgroundPosition = -(x * cellWidth) + "px " + -(y * cellHeight) + "px"
                cell.style.width = cellHeight + "px"
                cell.style.height = cellWidth + "px"
                cell.style.top = y * cellHeight + "px"
                cell.style.left = x * cellWidth + "px"
                cell.addEventListener("click", function () { firstClick = 1; move(e, this) })
                document.getElementById("gameBoard").appendChild(cell)
                positions[y].push(cell.style.backgroundPosition)
            }
        }
    }
    mix(e)
}


function move(e, el) {
    let elId = el.id.split(".")
    let x = parseInt(elId[2])
    let y = parseInt(elId[1])

    if (boardArray[y][x] == 2) {
        for (i = 0; i < e; i++) {
            for (p = 0; p < e; p++) {
                if (boardArray[i][p] == 0) {
                    var empty = document.getElementById("cell." + i + "." + p)
                    boardArray[i][p] = 1

                }
                boardArray[i][p] = 1
            }
        }
        let emptyBg = empty.style.backgroundColor

        let elBgPos = el.style.backgroundPosition
        let elBgImg = el.style.backgroundImage
        empty.style.backgroundImage = elBgImg
        empty.style.backgroundPosition = elBgPos
        el.style.backgroundImage = null
        el.style.backgroundPosition = null
        el.style.backgroundColor = emptyBg


        for (u = -1; u < 2; u++) {
            if (y + u >= 0 && y + u < e) {
                boardArray[y + u][x] = 2
            }
            if (x + u >= 0 && x + u < e) {
                boardArray[y][x + u] = 2
            }
        }
        boardArray[y][x] = 0
        if (firstClick == 1) {
            win(e)
            countMoves++
        }
    }
}

function mix(e) {
    countMoves = 0
    if (document.getElementById("imgBlockade") != null) {
        document.getElementById("imgBlockade").remove()
    }
    myGame.appendChild(blockade)
    firstClick = 0
    setTimeout(() => {
        var huj = setInterval(() => {
            let possibleMoves = []
            for (i = 0; i < e; i++) {
                for (p = 0; p < e; p++) {
                    if (boardArray[i][p] == 2) {
                        possibleMoves.push(document.getElementById("cell." + i + "." + p))
                    }
                }
            }
            let randomNum = Math.floor(Math.random() * possibleMoves.length)
            move(e, possibleMoves[randomNum])
        }, 10);
        setTimeout(() => {
            clearInterval(huj)
            document.getElementById("blockade").remove()

        }, e * 700)
    }, 200)
}

function win(e) {
    var correct = 0
    for (let y = 0; y < e; y++) {
        for (let x = 0; x < e; x++) {
            let cell = document.getElementById("cell." + y + "." + x)
            if (cell.style.backgroundPosition == positions[y][x]) {
                correct++
            }
        }
    }
    if (correct == (e * e) - 1) {
        clearInterval(updateClock)
        alert("Wygrałeś!")
        gameBoard.appendChild(imgBlockade)
    }
}