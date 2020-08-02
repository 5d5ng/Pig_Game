

# Pig Game

자바스크립트를 이용한 1대1 돼지게임



[TOC]

## 게임 규칙

- 2명의 플레이어가 라운드마다 주사위 2개를 던진다.
- 매 턴 마다 플레이어는 주사위를 여러번 던질 수 있다. 주사위를 던질 때 마다 점수가 쌓인다.
- 쌓인 점수만큼만 받고 다음 플레이어에게 턴을 넘기고 싶으면  HOLD버튼을 누르면 된다.
- 만약 주사위를 던지는 도중에 1이 나오면 이번 턴에서 모았던 점수들을 모두 잃는다.
- 만약 주사위를 던지는데 6이 두번 연속 나오는 경우, 전체 게임 중에 모았던 점수를 모두 잃는다.
- FINAL SCORE에 설정해놓은 점수에 먼저 도달하는 사람이 승리한다. FINAL SCORE를 설정해놓지 않으면 자동으로 100으로 설정된다.







## 초기 변수 선언 및 주사위 1~6까지 숫자 생성

시작

```jsx
var scores,roundScore, activePlayer , dice; 

scores = [0,0]; //플레이어들의 총점수
roundScore = 0; // 현재 라운드의 점수
activePlayer = 0; //0 is first Player and 1 is second Player

dice = Math.floor(Math.random()*6)+1; // 1부터 6까지 난수 출력
console.log(dice);

```

Math활용

난수생성

```jsx
Math.random() //0부터 1사이 난수
Math.random()*6 // 0부터 6사이의 난수
Math.floor() //올림값
Math.floor(Math.random()*6) //0~5사이의 난수

```



## HTML요소 수정 및 값 저장

- textContent

    평문 출력 html 코드로 들어가지않고 일반평문으로 들어간다.

- innerHTML

    html 코드로 해석되서 들어가기 때문에 태그를 추가가능하다.

```jsx

document.querySelector('#current-'+activePlayer).textContent = dice;

//css에서 선택하는것 처럼 이 메소드를 이용하면 자바스크립트에서 가능하다.
 //textContent를 이용해 선택한 부분의 요소에 dice변수값을 저장해주었다.
 //textContent는 html코드에 평문을 출력시켜주는 역할을 한다. html코드가 아닌 평문만 가능하다.

document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>'
//innerHTML을 이용해 태그문을 포함해서 출력가능하다.

var x = document.querySelector('#score-0').textContent; //html 코드에 있는 평문도 접근가능하다. 
console.log(x); //score-0 아이디에 있는 요소가 출력

```



## 주사위 그림 숨기기

### CSS요소 수정

- style.display

```jsx
//화면 시작시 주사위를 지우려는 코드
document.querySelector('.dice').style.display = 'none'; // css코드 수정을 위해 style이용 display property의 'none'

```

클래스가 dice인 요소의 css 부분에 display 프로퍼티부분을 0으로 바꾸어주는 부분이다.

## 나온 주사위에 따라 원하는 이미지 출력하기

#### 이벤트리스너 활용과 익명함수

- 콜백함수

    개발자에 의해 직접 호출되지않고 다른 함수에 의해서 호출되는 함수이다.

    addEventListener의 두번째 인자에 함수를 사용할 때 ()를 넣지 않는 이유

- 익명함수는 주로 콜백함수에서 사용되는데 그 함수를 사용하는 경우가 한번 뿐인 경우 따로 선언하지않고 익명으로 선언하는 방식이다.

```jsx
document.querySelector('.btn-roll').addEventListener('click',btn)
//html 코드내에 클래스가 btn-roll인 요소에 btn이라고 정의된 함수를 click시에 호출하라는 의미이다. 
//'click'이외에도 여러가지 이벤트가 존재한다.
```

addEventListener를 이용해 클릭 시 실행되는 함수를 만들어 주사위 결과에 따라 다른 이미지가 출력되도록하는 코드

```jsx

//Anonymouys function 한번만 호출되는 함수를 만들 때 익명함수를 유용하게 사용가능하다.
document.querySelector('.btn-roll').addEventListener('click',function(){

  //1.Random number
  var dice = Math.floor(Math.random()*6)+1; // 1부터 6까지 난수 출력

  //2.Display the result
  //주사위가 나온 값마다 다른 이미지를 출력해주어야한다.
  var diceDOM =document.querySelector('.dice'); //코드길이를 줄이기 위해 이렇게도 작성가능하다.
  diceDOM.style.display = 'block' //다시 주사위를 보이게 설정
  diceDOM.src = 'dice-'+dice+'.png'; //주사위 값에 맞게 이미지를 변경해주어야하므로 이렇게 작성

  //3. Update th round score If the rolled number was not a 1 (depnd on the rule of game)

});
```

### getElementbyID

- querySelecor 를 사용해도되지만 속도면에서 더 빠르다.
- ID만 접근할 수 있다.

    플레이어들의 점수와 현재 점수를 0으로 초기화하는 부분

    ```jsx
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    ```

- querySelector 와 달리 앞에 #을 붙이지 않아도 된다.



## 주사위에 1이 나왔을 때 턴오버 해주기

#### 삼항연산자 활용(1이 나왔을 때 선수 변경 )

```jsx
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // 삼항연산자

```



### CSS 요소 추가 및 제거 - classList 활용,toggle

```jsx
document.querySelector('.player-0-panel').classList.remove('active'); // active 클래스를 .player-0-panel요소에서 제거함
document.querySelector('.player-1-panel').classList.add('active');// active 클래스를 .player-1-panel요소에서 추기함

document.querySelector('.player-0-panel').classList.toggle('active'); 
//toggle은 존재하면 제거 , 존재하지않으면 추가

```

```jsx
//Anonymouys function 한번만 호출되는 함수를 만들 때 익명함수를 유용하게 사용가능하다.
document.querySelector(".btn-roll").addEventListener("click", function () {

  var dice = Math.floor(Math.random() * 6) + 1;
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3. Update the round score If the rolled number was not a 1 (depnd on the rule of game)
  if (dice !== 1) {
    //다른 언어에서 !=와 동일 자바스크립트에서 !=는 타입비교만..
    //Add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //1이나오는 경우
    //turn over Next player

    document.querySelector("#current-" + activePlayer).textContent = '0'; //턴 옮기기전에 0으로 변경

    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // 삼항연산자
    roundScore = 0; //현재점수 초기화

    // document.querySelector('.player-0-panel').classList.remove('active'); // active 클래스를 .player-0-panel요소에서 제거함
    // document.querySelector('.player-1-panel').classList.add('active');// active 클래스를 .player-1-panel요소에서 추기함

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //toggle은 존재하면 제거 , 존재하지않으면 추가

    document.querySelector('.dice').style.display = 'none'; //턴이 종료될떄 다시 주사위 이미지를 숨겨줌
  }
});
```



## Hold 버튼 활성화 해주기

Hold 버튼을 눌렀을 때에도 현 플레이어가 100점을 넣지 않았다면 다음 플레이어 순서로 넘겨줘야하는데 그 기능은 이미 앞에서 사용한 적이 있는 기능이다. 코드의 중복성을 줄이기 위해서 nextPlayer()라는 함수를 만들어서 코드길이를 줄였다.

```jsx
function nextPlayer(){
  document.querySelector("#current-" + activePlayer).textContent = "0"; //턴 옮기기전에 0으로 변경
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // 삼항연산자
  roundScore = 0; //현재점수 초기화
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //toggle은 존재하면 제거 , 존재하지않으면 추가
  document.querySelector(".dice").style.display = "none"; //턴이 종료될떄 다시 주사위 이미지를 숨겨줌
}
```

## Hold버튼을 눌렀을 때

```jsx
document.querySelector(".btn-hold").addEventListener("click", function () {
  // Add Current score to Global score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
  
  //Check if player won the game
  if(scores[activePlayer]>=100){
    document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none'; //승부가 나서 주사위 없애기
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    

  }else{
  
  nextPlayer();
  }
```

위에 추가해준  winner 클래스는 css파일에 아래와 같이 정의했다.

```css
.winner { background-color: #f7f7f7; }
.winner .player-name { font-weight: 300; color: #EB4D4D; }
```



## 승자가 생길 경우 게임 비활성화하기

gamePlaying 변수를 이용해 init()이 실행되면 True로 ,승자가 나온 경우 False를 반환해서 문제를 해결



## 기능추가

1. 주사위 하나 더 추가
    - html파일에 img태그하나 추가
    - css를 이용해 주사위 위치 배치
    - js파일에 dices배열 prevdices배열 생성 후 이전과 동일한 기능 구현

2. 두번 연속 주사위가 6이 나오면 해당 플레이어의 점수를 0으로 만들고 다음사람 턴으로 이동
    
    - if 문 추가
3. 목표점수(내기 할 점수)를 설정할 수 있도록 구현
    - html내에 input태그를 넣고 css로 배치

        html 파일 일부

        ```java
        	<input  type="text"placeholder="Final score" class = "goal-score">
        ```

        css 파일 일부

        ```java
        .goal-score{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
            top:520px;
            color:#555;
            font-size: 18px;
            font-family: 'Lato';
            text-align: center;
            padding:10px;
            width:160px;
            text-transform: uppercase;
        }
        .goal-score:focus{outline:none;}
        ```

        javascript파일 일부

        ```jsx
        var input = document.querySelector(".goal-score").value;

            //Undefined , 0 ,null ,or ""are Coerced to false
            if (input) {
              // 비어있다면 false 값이 들어있다면 True
              winngScore = input;
            } else {
              winngScore = 100;
            }
        ```

        **html input태그에 저장되있는 값을 value를 이용해서 가져올 수 있다는 것을 배웠다.**