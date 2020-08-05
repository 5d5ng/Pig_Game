
var scores, roundScore, activePlayer, dices, gamePlaying, prevdices, winngScore;

init();

var x = document.querySelector("#score-0").textContent; 
console.log(x); 


document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1.Random number
    dices = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ]; 


    var diceDOM = document.querySelector(".dice1"); 
    diceDOM.style.display = "block"; 
    diceDOM.src = "dice-" + dices[0] + ".png"; 
    var diceDOM = document.querySelector(".dice2"); 
    diceDOM.style.display = "block"; 
    diceDOM.src = "dice-" + dices[1] + ".png"; 
 
    if (dices[0] !== 1 && dices[1] !== 1) {

      roundScore += dices[0] + dices[1];
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
   
      nextPlayer();
    }

    for (var i = 0; i < dices.length; i++) {
      for (var j = 0; j < prevdices.length; j++) {
        if (prevdices[i] == 6 && dices[j] == 6) {
          scores[activePlayer] = 0;
          document.querySelector("#score-" + activePlayer).textContent = "0";
          nextPlayer();
        }
      }
    }
    prevdices[0] = dices[0];
    prevdices[1] = dices[1];
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    prevdices = [-1, -1];

    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".goal-score").value;


    if (input) {

      winngScore = input;
    } else {
      winngScore = 100;
    }

    console.log(winngScore);
    //Check if player won the game
    if (scores[activePlayer] >= winngScore) {
      gamePlaying = false; //게임 종료표시
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none"; //승부가 나서 주사위 없애기
      document.querySelector(".dice2").style.display = "none"; //승부가 나서 주사위 없애기

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //Role Dice 버튼을 눌렀을 떄 0이 나올 경우와 똑같이 플레이어를 변경해주어야함으로 함수로 만들어서 코드 중복성제거
      nextPlayer();
    }
  }
});

function nextPlayer() {
  prevdices = [-1, -1];
  document.querySelector("#current-" + activePlayer).textContent = "0"; //턴 옮기기전에 0으로 변경
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // 삼항연산자
  roundScore = 0; //현재점수 초기화

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //toggle은 존재하면 제거 , 존재하지않으면 추가

  document.querySelector(".dice1").style.display = "none"; //턴이 종료될떄 다시 주사위 이미지를 숨겨줌
  document.querySelector(".dice2").style.display = "none"; //턴이 종료될떄 다시 주사위 이미지를 숨겨줌
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  dices = [0, 0];
  prevdices = [-1, -1];
  activePlayer = 0;
  roundScore = 0;

  gamePlaying = true;

  document.querySelector(".dice1").style.display = "none"; // css코드 수정을 위해 style이용 display property의 'none'
  document.querySelector(".dice2").style.display = "none"; // css코드 수정을 위해 style이용 display property의 'none'

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.add("active");
}
