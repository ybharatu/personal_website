// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
// https://dev.to/javascriptacademy/create-a-simple-tic-tac-toe-game-using-html-css-javascript-i4k


window.addEventListener('DOMContentLoaded', () => {
  // everything goes here
  const tiles = Array.from(document.querySelectorAll('.tile'));
  //const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const newGameButton = document.querySelector('#new_game');
  const announcer = document.querySelector('.announcer');
  const player_score = document.querySelector('.player_score');
  const comp_score = document.querySelector('.comp_score');
  p_score = 0;
  c_score = 0;

  let isGameActive = true;

  const PLAYER_WON = 'PLAYER_WON';
  const COMP_WON = 'COMP_WON';
  const TIE = 'TIE';

  tiles[0].innerText = "ROCK";
  tiles[1].innerText = "PAPER";
  tiles[2].innerText = "SCISSORS";
  tiles[3].innerText = "ROCK";
  tiles[4].innerText = "PAPER";
  tiles[5].innerText = "SCISSORS";

  const announce = (type) => {
    switch(type){
       case PLAYER_WON:
            announcer.innerHTML = 'You Won';
            break;
       case COMP_WON:
            announcer.innerHTML = 'Computer Won';
            break;
       case TIE:
            announcer.innerText = 'Tie';
            break;
       case "PLAYER_SET":
       		announcer.innerText = 'You won the Set!'
       		break;
       case "COMP_SET":
       		announcer.innerText = 'The Computer won the Set!'
       		break;
        }
    announcer.classList.remove('hide');
  };

  const player_point = (number) => {
  	p_score = p_score + number;
  	player_score.innerHTML = "Player Score: " + p_score
  	console.log("PLAYER SCORE: " + p_score)
  	player_score.classList.remove('hide');
  }

  const comp_point = (number) => {
  	c_score = c_score + number;
  	comp_score.innerHTML = "Computer Score: " + c_score
  	console.log("COMPUTER SCORE: " + c_score)
  	comp_score.classList.remove('hide');
  }

  const isValidAction = (index) => {
    if (index == 0 || index == 1 || index == 2){
        return false;
    }

    return true;
  };

  const CalcComputerChoice = () => {
  	//Computer Logic
  	rand_num = getRandomInt(8);
  	switch(rand_num){
  		case 0:
  			tiles[0].innerText = "ROCK";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "";
  			tiles[1].src="/img/fun/na.png";
  			tiles[2].src="/img/fun/na.png";
  			return 0;
  		case 1:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "PAPER";
  			tiles[2].innerText = "";
  			tiles[0].src="/img/fun/na.png";
  			tiles[2].src="/img/fun/na.png";
  			return 1;
  		case 2:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "PAPER";
  			tiles[2].innerText = "";
  			tiles[0].src="/img/fun/na.png";
  			tiles[2].src="/img/fun/na.png";
  			return 1;
  		case 3:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "SCISSORS";
  			tiles[0].src="/img/fun/na.png";
  			tiles[1].src="/img/fun/na.png";
  			return 2;
  		case 4:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "SCISSORS";
  			tiles[0].src="/img/fun/na.png";
  			tiles[1].src="/img/fun/na.png";
  			return 2;
  		case 5:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "SCISSORS";
  			tiles[0].src="/img/fun/na.png";
  			tiles[1].src="/img/fun/na.png";
  			return 2;
  		case 6:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "SCISSORS";
  			tiles[0].src="/img/fun/na.png";
  			tiles[1].src="/img/fun/na.png";
  			return 2;
  		case 7:
  			tiles[0].innerText = "";
  			tiles[1].innerText = "";
  			tiles[2].innerText = "SCISSORS";
  			tiles[0].src="/img/fun/na.png";
  			tiles[1].src="/img/fun/na.png";
  			return 2;

  	}

  }

  const handleResultValidation = (index) => {
  	choice = CalcComputerChoice();

  	/// 0 == 3 == ROCK
  	/// 1 == 4 == PAPER
  	/// 2 == 5 == SCISSORS

  	p_point = index == 3 ? 1 : index == 4 ? 5 : 2;
  	c_point = choice == 0 ? 1 : choice == 2 ? 2 : 5;

  	if ((index == 3 && choice == 2) || (index == 4 && choice == 0) || (index == 5 && choice == 1)) {
  		isGameActive = false;
  		player_point(p_point)
  		announce(PLAYER_WON);
  	}
  	else if ((index == 3 && choice == 0) || (index == 4 && choice == 1) || (index == 5 && choice == 2)) {
  		isGameActive = false;
  		announce(TIE);
  	}
  	else {
  		isGameActive = false;
  		comp_point(c_point)
  		announce(COMP_WON);
  	}

  	if (p_score >= 20){
  		isGameActive = false;
  		announce("PLAYER_SET");
  		var value = parseInt(document.getElementById('janken_player_counter').innerHTML);
  		document.getElementById('janken_player_counter').innerHTML = (value+1).toString();
  		resetButton.classList.add('hide');
  	}
  	else if (c_score >= 20){
  		isGameActive = false;
  		announce("COMP_SET");
  		var value = parseInt(document.getElementById('janken_computer_counter').innerHTML);
  		document.getElementById('janken_computer_counter').innerHTML = (value+1).toString();
  		resetButton.classList.add('hide');
  	}

  };

  const userAction = (tile, index) => {
	  if (isValidAction(index) & isGameActive) {
	  	switch(index){
	  		case 3:
	  			tiles[4].innerText = "";
	  			tiles[5].innerText = "";
	  			tile.innerText = 'ROCK';
	  			tile.src="/img/fun/rock.png";
  				tiles[4].src="/img/fun/na.png";
  				tiles[5].src="/img/fun/na.png";
	  			break;
	  		case 4:
	  			tile.innerText = 'PAPER';
	  			tiles[3].innerText = "";
	  			tiles[5].innerText = "";
	  			tile.src="/img/fun/paper.png";
  				tiles[3].src="/img/fun/na.png";
  				tiles[5].src="/img/fun/na.png";
	  			break;
	  		case 5:
	  			tile.innerText = "SCISSORS";
	  			tiles[4].innerText = "";
	  			tiles[3].innerText = "";
	  			tile.src="/img/fun/scissors.jpeg";
  				tiles[4].src="/img/fun/na.png";
  				tiles[3].src="/img/fun/na.png";
	  			break;
	  	}
	  	console.log(index)
	    //tile.innerText = currentPlayer;
	    //tile.classList.add(`player${currentPlayer}`);
	    //updateBoard(index);

	    handleResultValidation(index);
	  }


  };



  const resetBoard = () => {
    isGameActive = true;
    announcer.classList.add('hide');

    tiles.forEach(tile => {
        tile.innerText = '';
    });
    tiles[0].innerText = "ROCK";
  	tiles[1].innerText = "PAPER";
  	tiles[2].innerText = "SCISSORS";
  	tiles[3].innerText = "ROCK";
  	tiles[4].innerText = "PAPER";
  	tiles[5].innerText = "SCISSORS";
  	tiles[0].src="/img/fun/rock.png";
  	tiles[1].src="/img/fun/paper.png";
  	tiles[2].src="/img/fun/scissors.jpeg";
  	tiles[3].src="/img/fun/rock.png";
  	tiles[4].src="/img/fun/paper.png";
  	tiles[5].src="/img/fun/scissors.jpeg";
  }

  const newBoard = () => {
    isGameActive = true;
    announcer.classList.add('hide');
    player_score.classList.add('hide');
    comp_score.classList.add('hide');
    resetButton.classList.remove('hide');
    p_score = 0;
    c_score = 0;

    tiles.forEach(tile => {
        tile.innerText = '';
    });
    tiles[0].innerText = "ROCK";
  	tiles[1].innerText = "PAPER";
  	tiles[2].innerText = "SCISSORS";
  	tiles[3].innerText = "ROCK";
  	tiles[4].innerText = "PAPER";
  	tiles[5].innerText = "SCISSORS";
  	tiles[0].src="/img/fun/rock.png";
  	tiles[1].src="/img/fun/paper.png";
  	tiles[2].src="/img/fun/scissors.jpeg";
  	tiles[3].src="/img/fun/rock.png";
  	tiles[4].src="/img/fun/paper.png";
  	tiles[5].src="/img/fun/scissors.jpeg";
  }

  resetButton.addEventListener('click', resetBoard);

  newGameButton.addEventListener('click', newBoard);

  tiles.forEach( (tile, index) => {
  	console.log(index)
    tile.addEventListener('click', () => userAction(tile, index));
  });


});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
