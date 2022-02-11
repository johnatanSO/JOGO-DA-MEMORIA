const FRONT = "cardFront"
const BACK = "cardBack"
const CARD = 'card'
const ICON = 'icon'

let pares = null

let display = document.getElementById('timerDisplay')

let timeOutDisplay = document.getElementById('timeOut')

let cards = null
let gameOverLayer = document.getElementById('gameOver')


startGame()

function startGame(){
    cards = game.createCardsFromTecs()
    shuffleCards(cards)
    initializeCards(cards)
   
    timer(game.duration, display)
    
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard")

    gameBoard.innerHTML = ''
    cards.map((card)=>{
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card,cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card,cardElement){
    createCardFace(FRONT,card,cardElement)
    createCardFace(BACK,card,cardElement)
}

function createCardFace(face,card,cardElement){
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face == FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = `./images/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    }
    else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    cardElement.appendChild(cardElementFace)
}

function shuffleCards(cards){
    let currentIndex = cards.length
    let randomIndex = 0
    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random()*currentIndex)
        currentIndex--;

        [cards[randomIndex],cards[currentIndex]]=[cards[currentIndex], cards[randomIndex]]
    }
}

function flipCard(){
    if(game.setCard(this.id)){
       this.classList.add('flip')
       if(game.secondCard){
          if(game.checkMatch()){
           game.clearCards()
           pares++
           
           if (pares == 10){                
            let gameOverLayer = document.getElementById('gameOver')
            gameOverLayer.style.display = "flex"
           }
        }else{
           setTimeout(()=>{
               
            let firstCardView = document.getElementById(game.firstCard.id)
            
            let secondCardView = document.getElementById(game.secondCard.id)

            firstCardView.classList.remove('flip')
            secondCardView.classList.remove('flip')
            game.unflipCards()            
            },1000)   
       }  
       }
    } 
}
function timer(duration,display){
    let timer = duration, minutes, seconds
    let cont = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)
        minutes = minutes < 10 ? '0' + minutes:minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        display.textContent = minutes + ':' + seconds

        if(minutes <= 2){
            display.style.color = '#FF002D'
        }

        if(--timer < 0){
            timer = duration
            
            if(minutes == 0){
                game.timeOut(timeOutDisplay)
                clearInterval(cont)
            }
        }
    }, 1000) 
}


function restart(){
    location.reload()
}