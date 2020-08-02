/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dices, gamePlaying, prevdices, winngScore;

init();

var x = document.querySelector("#score-0").textContent; //html 코드에 있는 평문도 접근가능하다.
console.log(x); //score-0 아이디에 있는 요소가 출력

//Anonymouys function 한번만 호출되는 함수를 만들 때 익명함수를 유용하게 사용가능하다.
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1.Random number
    dices = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ]; // 주사위 두개의 경우

    //2.Display the result
    //주사위가 나온 값마다 다른 이미지를 출력해주어야한다.
    var diceDOM = document.querySelector(".dice"); //코드길이를 줄이기 위해 이렇게도 작성가능하다.
    diceDOM.style.display = "block"; //다시 주사위를 보이게 설정
    diceDOM.src = "dice-" + dices[0] + ".png"; //주사위 값에 맞게 이미지를 변경해주어야하므로 이렇게 작성

    var diceDOM = document.querySelector(".dice2"); //코드길이를 줄이기 위해 이렇게도 작성가능하다.
    diceDOM.style.display = "block"; //다시 주사위를 보이게 설정
    diceDOM.src = "dice-" + dices[1] + ".png"; //주사위 값에 맞게 이미지를 변경해주어야하므로 이렇게 작성
    //3. Update th round score If the rolled number was not a 1 (depnd on the rule of game)
    if (dices[0] !== 1 && dices[1] !== 1) {
      //다른 언어에서 !=와 동일 자바스크립트에서 !=는 타입비교만..
      //Add score
      roundScore += dices[0] + dices[1];
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //1이나오는 경우
      //turn over Next player
      nextPlayer();
    }
    //주사위 하나로 할 때
    // if(dice === 6 && prevdice ===6 ){ // 두번 연속 6이 나온 경우 점수 잃게 만들기
    //   scores[activePlayer] = 0;
    //   nextPlayer();
    // }

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
    // Add Current score to Global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".goal-score").value;

    //Undefined , 0 ,null ,or ""are Coerced to false
    if (input) {
      // 비어있다면 false 값이 들어있다면 True
      winngScore = input;
    } else {
      winngScore = 100;
    }

    console.log(winngScore);
    //Check if player won the game
    if (scores[activePlayer] >= winngScore) {
      gamePlaying = false; //게임 종료표시
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none"; //승부가 나서 주사위 없애기
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

  document.querySelector(".dice").style.display = "none"; //턴이 종료될떄 다시 주사위 이미지를 숨겨줌
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

  document.querySelector(".dice").style.display = "none"; // css코드 수정을 위해 style이용 display property의 'none'
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
