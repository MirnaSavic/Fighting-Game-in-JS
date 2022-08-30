

let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')


const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerHTML = `${p1.name}`
  p2NameDiv.innerHTML = `${p2.name}`
  p1HealthDiv.innerHTML = `${p1.health}`
  p2HealthDiv.innerHTML = `${p2.health}`
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if ((p1.health <= 0) || (p2.health <= 0)) {
    game.isOver = true;
    gameState == game.isOver
    result.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }

}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike(player, enemy, attackDmg) {


    let damageAmount = Math.floor(Math.random() * attackDmg)
    enemy.health -= damageAmount
    updateGame(player, enemy, game.isOver)
    let message = `${player.name} attacks ${enemy.name} for ${damageAmount} damage`
    return message
  }

  heal(player) {


    let hpAmount = Math.floor(Math.random() * 5)
    player.health += hpAmount
    updateGame(player, p2, game.isOver)
    let message = `${player.name} heals for ${hpAmount}`
    return message

  }
}


// game = new Game()
// game.isOver 👉 false
class game {
  constructor() {
    this.isOver = false;
  }


  declareWinner(isOver, p1, p2) {
    let message
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    }
    console.log(isOver, p1.health, p2.health)
    // Play victory sound
    document.getElementById('victory').play()
    return message
  }

  reset(p1, p2) {

    p1.health = 100;
    p2.health = 100;
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(pa, p2, this.isOver)

  }


  play(p1, p2) {

    this.reset(p1, p2)
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg)
      p1.heal(p1)
      //Make sure both players get strike() and heal() once each loop
    } return this.declareWinner(this.isOver, p1, p2)


  }

}

let player1 = new Player("Mirna", 100, 10)
let player2 = new Player("Nikola", 100, 10)

let p1 = player1;
let p2 = player2;

game = new game()

updateGame(p1, p2, game.isOver)

let gameState = game.isOver;


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **

playButton.onclick = () => result.innerHTML = game.play(p1,p2)


// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {

  if (e.key == "q" && p2.health > 0 && game.isOver == false) {
    console.log(p1.strike(p1, p2, p1.attackDmg))
  }
  document.getElementById("p1attack").play()

});

document.addEventListener('keydown', function(e) {


  if (e.key == "a" && p2.health > 0 && game.isOver == false) {
    p1.heal(p1)
  }
  document.getElementById("p1heal").play()
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {


  if (e.key == "p" && p1.health > 0 && game.isOver == false)
    p2.strike(p2, p1, p2.attackDmg)
  document.getElementById("p2attack").play()
});

document.addEventListener('keydown', function(e) {

  if (e.key == "l" && p1.health > 0 && game.isOver == false)
    p2.heal(p2)
  document.getElementById("p2heal").play()
});
