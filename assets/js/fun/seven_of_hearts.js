const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suitValues = ['H', 'S', 'C', 'D']
let deck = [];
const Suit = Object.freeze({ HEART: 0, DIAMOND: 2, CLUB: 3, SPADE: 1 });

//Using cardsJS from https://richardschneider.github.io/cardsJS/

// Create a deck of cards
for (let i = 0; i < 4; i++) {
    cardValues.forEach(value => deck.push(value + suitValues[i]));
}
console.log(deck)

deck.sort(() => Math.random() - 0.5); // Shuffle the deck
console.log(deck)
// let currentCard = deck.pop();
// console.log(currentCard)
// Variables
let score = 0;
let cur_scores = [0, 0, 0]
let cur_hand = []
let reached_three = [0,0,0]
let cur_win = []
let cur_num_cards = [0,0,0]
let cur_player = -1
let game_over = 0
let seven_played = [0,0,0,0]
let upper = ['8', '8', '8', '8']
let lower = ['6', '6', '6', '6']
let upper_deck = [[],[],[],[]]
let lower_deck = [[],[],[],[]]
//let options = []
let player_chose = 0
let sel_card = ''

for (let i = 0; i < 3; i++ ){
	cur_hand.push([])
}
console.log(cur_hand)
const player_hand = document.getElementById('player_hand');
console.log(player_hand)

const player1 = document.getElementById('player1');
const comp1 = document.getElementById('comp1');
const comp2 = document.getElementById('comp2');
const players = [player1, comp1, comp2]
const player_names = ["Player", "Comp1", "Comp2"]

const card1 = document.getElementById('c1');
const card2 = document.getElementById('c2');
const card3 = document.getElementById('c3');
const card4 = document.getElementById('c4');
const card5 = document.getElementById('c5');
const card6 = document.getElementById('c6');
const card7 = document.getElementById('c7');
const card8 = document.getElementById('c8');
const card9 = document.getElementById('c9');
const card10 = document.getElementById('c10');
const card11 = document.getElementById('c11');
const card12 = document.getElementById('c12');
const card13 = document.getElementById('c13');
const card14 = document.getElementById('c14');
const card15 = document.getElementById('c15');
const card16 = document.getElementById('c16');
const card17 = document.getElementById('c17');
const card18 = document.getElementById('c18');
const card19 = document.getElementById('c19');
const all_cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19]

const HeartDisplay = document.getElementById('HeartDisplay');
const ClubDisplay = document.getElementById('ClubDisplay');
const DiamondDisplay = document.getElementById('DiamondDisplay');
const SpadeDisplay = document.getElementById('SpadeDisplay');

const HeartDisplayUp = document.getElementById('HeartDisplayUp');
const ClubDisplayUp = document.getElementById('ClubDisplayUp');
const DiamondDisplayUp = document.getElementById('DiamondDisplayUp');
const SpadeDisplayUp = document.getElementById('SpadeDisplayUp');

const HeartDisplayDown = document.getElementById('HeartDisplayDown');
const ClubDisplayDown = document.getElementById('ClubDisplayDown');
const DiamondDisplayDown = document.getElementById('DiamondDisplayDown');
const SpadeDisplayDown = document.getElementById('SpadeDisplayDown');
const allDisplays = [HeartDisplay, ClubDisplay, DiamondDisplay, SpadeDisplay, HeartDisplayUp, ClubDisplayUp, DiamondDisplayUp, SpadeDisplayUp, HeartDisplayDown, ClubDisplayDown, DiamondDisplayDown, SpadeDisplayDown]

const scoreDisplay = document.getElementById('score');
const C1scoreDisplay = document.getElementById('comp1_score');
const C2scoreDisplay = document.getElementById('comp2_score');
const all_scores = [scoreDisplay, C1scoreDisplay, C2scoreDisplay]
const playerDisplay = document.getElementById('cur_player');
//const higherBtn = document.getElementById('higherBtn');
//const lowerBtn = document.getElementById('lowerBtn');

//cardDisplay.src = "cardsJS/cards/" + currentCard + ".svg";

// higherBtn.addEventListener('click', () => guess('higher'));
// lowerBtn.addEventListener('click', () => guess('lower'));
startBtn.addEventListener('click', () => startGame());
resetBtn.addEventListener('click', () => resetGame());

function guess(direction) {
    const nextCard = deck.pop();
    //cardDisplay.textContent = nextCard;
    cardDisplay.src = "cardsJS/cards/" + nextCard + ".svg";
    
    if ((direction === 'higher' && getValue(nextCard) > getValue(currentCard)) ||
        (direction === 'lower' && getValue(nextCard) < getValue(currentCard))) {
        score++;
    } else {
        alert('Game Over!');
        score = 0;
    }

    currentCard = nextCard;
    scoreDisplay.textContent = score;

    if (deck.length === 0) {
        alert('You went through the entire deck!');
        resetGame();
    }
}

function getValue(card) {
    if (card === 'J') return 11;
    if (card === 'Q') return 12;
    if (card === 'K') return 13;
    if (card === 'A') return 14;
    return card;
}

function resetGame() {
    deck.push(...cardValues.flatMap(value => [value, value, value, value]));
    deck.sort(() => Math.random() - 0.5);
    currentCard = deck.pop();
    cardDisplay.textContent = currentCard;
}

function get_score(hand){
	sum = 0
	for (let i = 0; i < hand.length; i++){
		cur_num = hand[i][0]
		// console.log(cur_num)
		// console.log(sum)
		if (cur_num === 'J') cur_num = 11;
		if (cur_num === 'Q') cur_num = 12;
		if (cur_num === 'K') cur_num = 13;
		if (cur_num === 'A') cur_num = 10;
		if (cur_num === '1') cur_num = 10;
		else cur_num = Number(cur_num)
		sum = sum + cur_num
	}
	return sum
}
function sortCards(cards) {
    const suitOrder = ['H', 'C', 'D', 'S']; // Clubs, Diamonds, Hearts, Spades
    const rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    cards.sort((a, b) => {
        const suitA = a.slice(-1);
        const suitB = b.slice(-1);
        const rankA = a.slice(0, -1);
        const rankB = b.slice(0, -1);

        if (suitA !== suitB) {
            return suitOrder.indexOf(suitA) - suitOrder.indexOf(suitB);
        }

        return rankOrder.indexOf(rankA) - rankOrder.indexOf(rankB);
    });

    return cards;
}

function process_click(c_card){
	//console.log(c_card)
	str = c_card.src
	// Find the starting index of the part you want to extract const 
	startIndex = str.indexOf('cards/') + 'cards/'.length; // Find the ending index of the part you want to extract const 
	endIndex = str.indexOf('.svg'); // Extract the desired part of the string const 
	extractedString = str.substring(startIndex, endIndex);
	//console.log(extractedString)
	if (cur_player == 0) {
		if (options.indexOf(extractedString) >= 0){
			console.log(extractedString + " is playable")
			sel_card = extractedString
			player_chose  = 1
		}
		else{
			console.log(extractedString + " NOT playable")
		}
	}
}

function display_hand(hand){
	for (let i = 0; i < hand.length; i++){
		all_cards[i].src = "cardsJS/cards/" + hand[i] + ".svg";
		all_cards[i].addEventListener('click', function() { 
			//console.log(`Card ${i + 1} clicked!`); 
			//console.log('Card source:', this.src); 
			process_click(this) 
		});
	}
	total_cards_len = all_cards.length
	images = player_hand.getElementsByTagName('img');
	imageArray = Array.from(images);
	// for (let i = hand.length ; i < total_cards_len; i++){
	// 	all_cards[i].style.visibility = 'hidden';
	// }
	for (let i = imageArray.length - 1; i >= hand.length; i--) { 
		player_hand.removeChild(imageArray[i]); 
	}

}

function init_cards(){
	player = Math.floor(Math.random()*3)
	cur_player = player
	//console.log(player)
	//console.log("distribute cards")
	three_kings = 1
	while(three_kings){
		dlen = deck.length
		for( let i = 0; i < dlen; i++){
			cur_hand[player].push(deck.pop())
			player = (player + 1) % 3
			//console.log(player)
		}
		for( let i = 0; i < 3; i++){
			num_kings = 0
			for(let j = 0; j < cur_hand[i].length; j++){
				rank = cur_hand[i][j][0]
				if(rank === "K"){
					num_kings +=1
				}
			}
			if(num_kings >= 3){
				console.log("Player " + i + " has 3 kings")
				three_kings = 1
				// Create a deck of cards
				for (let i = 0; i < 4; i++) {
				    cardValues.forEach(value => deck.push(value + suitValues[i]));
				}
				deck.sort(() => Math.random() - 0.5); // Shuffle the deck
				cur_hand = []
				for (let i = 0; i < 3; i++ ){
					cur_hand.push([])
				}

				break
			} else{
				three_kings = 0
			}
		}
	}
	
	for (let i = 0; i < 3; i++){
		//cur_hand[i].sort()
		cur_hand[i] = sortCards(cur_hand[i])

		cur_num_cards[i] = cur_hand[i].length
		cur_scores[i] = get_score(cur_hand[i])
		if (i === 0){
			player1.textContent = "Player: " + cur_num_cards[i] + " cards"
			display_hand(cur_hand[i])
			//comp1.innerHTML += cur_num_cards[i] + " cards"
		}
		else {
			players[i].textContent = player_names[i] + ": " + cur_num_cards[i] + " cards"
		}
	}
	console.log(cur_hand)
	console.log(cur_num_cards)
	console.log(cur_scores)
	
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function update_next (curr_num, direction) {
	if(curr_num == '1'){
		curr_num = 10
	}
	if(curr_num == 'J'){
		curr_num = 11
	}
	if(curr_num == 'Q'){
		curr_num = 12
	}
	if(curr_num == 'K'){
		curr_num = 13
	}
	if(curr_num == 'A'){
		curr_num = 1
	}
	curr_num = parseInt(curr_num, 10);
	if(direction){
		new_num = curr_num + 1
	}
	else {
		new_num = curr_num - 1
	}
	new_num = new_num.toString();
	if(new_num == '11'){
		new_num = 'J'
	}
	if(new_num == '12'){
		new_num = 'Q'
	}
	if(new_num == '13'){
		new_num = 'K'
	}
	if(new_num == '1'){
		new_num = 'A'
	}
	if(new_num == '10'){
		new_num = '1'
	}

	return new_num
}

async function play_init_seven() {
	for (let i = 0; i < 3; i ++){
		seven_index = cur_hand[i].indexOf("7H")
		if (seven_index >= 0){
			cur_player = i
			playerDisplay.textContent = cur_player;
			players[cur_player].style.background = 'green'
			console.log(i + " has the 7H")
			break;
		}
	}
	await sleep(2000)
	
	seven_played[Suit.HEART] = 1
	cur_hand[cur_player].splice(seven_index, 1);
	// HeartDisplay.src = "cardsJS/cards/" + "7H" + ".svg"
	let seven_img = HeartDisplay.firstElementChild;
	seven_img.src = "cardsJS/cards/" + "7H" + ".svg"
	seven_img.classList.add('card');
	//HeartDisplay.appendChild(seven_img);

	for (let i = 0; i < 3; i++){
		cur_num_cards[i] = cur_hand[i].length
		cur_scores[i] = get_score(cur_hand[i])
		if(cur_num_cards[i] <= 3){
			reached_three[i] = 1
		}
		if (i === 0){
			if(reached_three[i] == 1){
				options = []
				temp_options = get_options(cur_hand[i])
				temp_length = cur_hand[cur_player].length
				player1.textContent = "Player: " + temp_options.length + " sure / " + (cur_num_cards[i] - temp_options.length) + " unsure"
				options = []
				display_hand(cur_hand[i])
			}
			else{
				player1.textContent = "Player: " + cur_num_cards[i] + " cards"
				display_hand(cur_hand[i])
			}
			
			//comp1.innerHTML += cur_num_cards[i] + " cards"
		}
		else {
			if(reached_three[i] == 1){
				options = []
				temp_options = get_options(cur_hand[i])
				temp_length = cur_hand[cur_player].length
				players[i].textContent = "Player: " + temp_options.length + " sure / " + (cur_num_cards[i] - temp_options.length) + " unsure"
				options = []
			}
			else{
				players[i].textContent = "Player: " + cur_num_cards[i] + " cards"
			}
		}
	}
	console.log(cur_hand)
	console.log(cur_num_cards)
	console.log(cur_scores)
	//await sleep(5000)
	players[cur_player].style.background = '#d3d3d3'
	cur_player = (cur_player + 1) % 3
	playerDisplay.textContent = cur_player;
	players[cur_player].style.background = 'green'
}

function get_options(hand){
	options = []
	for(let i = 0; i < hand.length; i++){
		if (hand[i][0] === '7'){
			options.push(hand[i])
		}
		// console.log("OPTIONS: " + hand[i][0] +hand[i].slice(-1))
		suit = hand[i].slice(-1)
		rank = hand[i][0][0] 
		//console.log(rank + suit)
		console.log(upper[Suit.HEART])
		if (suit === 'H' && seven_played[Suit.HEART] == 1){
			if (rank === upper[Suit.HEART] || rank === lower[Suit.HEART]) {
				options.push(hand[i])
			}
		}
		if (suit === 'C' && seven_played[Suit.CLUB] == 1){
			if (rank === upper[Suit.CLUB] || rank === lower[Suit.CLUB]) {
				options.push(hand[i])
			}
		}
		if (suit === 'D' && seven_played[Suit.DIAMOND] == 1){
			if (rank === upper[Suit.DIAMOND] || rank === lower[Suit.DIAMOND]) {
				options.push(hand[i])
			}
		}
		if (suit === 'S' && seven_played[Suit.SPADE] == 1){
			if (rank === upper[Suit.SPADE] || rank === lower[Suit.SPADE]) {
				options.push(hand[i])
			}
		}
	}
	return options
}

function random_comp_choice(options){
	if (options.length == 0) {
		return -1
	}
	return options[Math.floor(Math.random()*options.length)]
}
// Function to wait until a card is clicked 
function waitForPlayerChoice() { 
return new Promise((resolve) => { const interval = setInterval(() => { 
	if (player_chose === 1) { clearInterval(interval); 
		resolve(sel_card); } }, 100); // Check every 100 milliseconds 
	}); 
}

function play_card(c_card) {

	sel_rank = sel_card[0]
	sel_suit = sel_card.slice(-1)
	// Playing a 7
	if (sel_rank === '7'){
		if (sel_suit === "S"){
			seven_played[Suit.SPADE] = 1
			let seven_img = SpadeDisplay.firstElementChild;
			seven_img.src = "cardsJS/cards/" + sel_card + ".svg"
			seven_img.classList.add('card');
		}
		if (sel_suit === "D"){
			seven_played[Suit.DIAMOND] = 1
			let seven_img = DiamondDisplay.firstElementChild;
			seven_img.src = "cardsJS/cards/" + sel_card + ".svg"
			seven_img.classList.add('card');
		}
		if (sel_suit === "C"){
			seven_played[Suit.CLUB] = 1
			let seven_img = ClubDisplay.firstElementChild;
			seven_img.src = "cardsJS/cards/" + sel_card + ".svg"
			seven_img.classList.add('card');
		}
	} 
	else {
		if (sel_suit === "H"){
			if (sel_rank == upper[Suit.HEART]){
				if(upper[Suit.HEART] === "8"){
					let new_img = HeartDisplayUp.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					HeartDisplayUp.insertBefore(new_img, HeartDisplayUp.firstElementChild)
				}
				let num = upper[Suit.HEART]
				upper[Suit.HEART] = update_next(num, 1)
			} else {
				if(lower[Suit.HEART] === "6"){
					let new_img = HeartDisplayDown.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					HeartDisplayDown.appendChild(new_img)
				}
				let num = lower[Suit.HEART]
				lower[Suit.HEART] = update_next(num, 0)
			}
		}
		if (sel_suit === "S"){
			if (sel_rank == upper[Suit.SPADE]){
				if(upper[Suit.SPADE] === "8"){
					let new_img = SpadeDisplayUp.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					SpadeDisplayUp.insertBefore(new_img, SpadeDisplayUp.firstElementChild)
				}
				let num = upper[Suit.SPADE]
				upper[Suit.SPADE] = update_next(num, 1)
			} else {
				if(lower[Suit.SPADE] === "6"){
					let new_img = SpadeDisplayDown.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					SpadeDisplayDown.appendChild(new_img)
				}
				let num = lower[Suit.SPADE]
				lower[Suit.SPADE] = update_next(num, 0)
			}
		}
		if (sel_suit === "D"){
			if (sel_rank == upper[Suit.DIAMOND]){
				if(upper[Suit.DIAMOND] === "8"){
					let new_img = DiamondDisplayUp.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					DiamondDisplayUp.insertBefore(new_img, DiamondDisplayUp.firstElementChild)
				}
				let num = upper[Suit.DIAMOND]
				upper[Suit.DIAMOND] = update_next(num, 1)
			} else {
				if(lower[Suit.DIAMOND] === "6"){
					let new_img = DiamondDisplayDown.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					DiamondDisplayDown.appendChild(new_img)
				}
				let num = lower[Suit.DIAMOND]
				lower[Suit.DIAMOND] = update_next(num, 0)
			}
		}
		if (sel_suit === "C"){
			if (sel_rank == upper[Suit.CLUB]){
				if(upper[Suit.CLUB] === "8"){
					let new_img = ClubDisplayUp.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					ClubDisplayUp.insertBefore(new_img, ClubDisplayUp.firstElementChild)
				}
				let num = upper[Suit.CLUB]
				upper[Suit.CLUB] = update_next(num, 1)
			} else {
				if(lower[Suit.CLUB] === "6"){
					let new_img = ClubDisplayDown.firstElementChild;
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
				}
				else{
					let new_img = document.createElement('img');
					new_img.src = "cardsJS/cards/" + sel_card + ".svg"
					new_img.classList.add('card');
					ClubDisplayDown.appendChild(new_img)
				}
				let num = lower[Suit.CLUB]
				lower[Suit.CLUB] = update_next(num, 0)
			}
		}
	}
	console.log("Before: " + cur_hand[cur_player])
	sel_index = cur_hand[cur_player].indexOf(sel_card)
	cur_hand[cur_player].splice(sel_index, 1);
	// if(cur_player == 0){
	// 	//all_cards[cur_player].splice(sel_index, 1)
	// 	//console.log("All cards" + all_cards)
	// }
	console.log("After: " + cur_hand[cur_player])

	for (let i = 0; i < 3; i++){
		//cur_hand[i].sort()
		cur_hand[i] = sortCards(cur_hand[i])

		cur_num_cards[i] = cur_hand[i].length
		if(cur_num_cards[i] <= 3){
			reached_three[i] = 1
		}
		cur_scores[i] = get_score(cur_hand[i])

		if (i === 0){
			if(reached_three[i] == 1){
				options = []
				temp_options = get_options(cur_hand[i])
				temp_length = cur_hand[cur_player].length
				player1.textContent = "Player: " + temp_options.length + " sure / " + (cur_num_cards[i] - temp_options.length) + " unsure"
				options = []
				display_hand(cur_hand[i])
			}
			else{
				player1.textContent = "Player: " + cur_num_cards[i] + " cards"
				display_hand(cur_hand[i])
			}
			//comp1.innerHTML += cur_num_cards[i] + " cards"
		}
		else {
			if(reached_three[i] == 1){
				options = []
				temp_options = get_options(cur_hand[i])
				temp_length = cur_hand[cur_player].length
				players[i].textContent = player_names[i] + ": " + temp_options.length + " sure / " + (cur_num_cards[i] - temp_options.length) + " unsure"
				options = []
			}
			else {
				players[i].textContent = player_names[i] + ": " + cur_num_cards[i] + " cards"

			}
		}
	}
}

function calculate_score(){
	for(let i = 0; i < 3; i++){
		i_score = 0
		for(let j = 0; j < cur_hand[i].length; j++){
			rank = cur_hand[i][j][0] 
			console.log("Calculate score: " + rank)
			if(rank == "1"){
				rank = "10"
			}
			if(rank == "A"){
				rank = "10"
			}
			if(rank == "J"){
				rank = "11"
			}
			if(rank == "Q"){
				rank = "12"
			}
			if(rank == "K"){
				rank = "13"
			}
			num_rank = parseInt(rank, 10);
			i_score += num_rank
		}
		all_scores[i].textContent = i_score
	}
}

async function main_game () {
	test_cnt = 0
	while(game_over == 0 || test_cnt == 5){
		options = get_options(cur_hand[cur_player])
		//console.log("Options: ")
		console.log("Current Player: " + cur_player)
		console.log(cur_hand[cur_player])
		console.log(options)
		if (options.length == 0) {
			players[cur_player].textContent = "SKIP"
			players[cur_player].style.background = 'red'
			await sleep (2000)
			players[cur_player].textContent = player_names[cur_player] + ": " + cur_num_cards[cur_player] + " cards"
			players[cur_player].style.background = '#d3d3d3'
			cur_player = (cur_player + 1) % 3
			playerDisplay.textContent = cur_player;
			players[cur_player].style.background = 'green'
			continue
		}
		players[cur_player].style.background = 'green'
		if (cur_player != 0){
			sel_card = random_comp_choice(options)
			await sleep (2000)
		} else {
			new_card = await waitForPlayerChoice();
			player_chose = 0
		}
		options = []
		
		console.log("Playing: " + sel_card)
		play_card(sel_card)
		if(reached_three[cur_player] == 1){
			options = []
			temp_options = get_options(cur_hand[cur_player])
			temp_length = cur_hand[cur_player].length
			players[cur_player].textContent = player_names[cur_player] + ": " + temp_options.length + " sure / " + (cur_num_cards[cur_player] - temp_options.length) + " unsure"
			options = []
		}
		else {
			players[cur_player].textContent = player_names[cur_player] + ": " + cur_num_cards[cur_player] + " cards"
		}
		
		players[cur_player].style.background = '#d3d3d3'
		cur_player = (cur_player + 1) % 3
		test_cnt += 1
		await sleep(500)
		playerDisplay.textContent = cur_player;
		players[cur_player].style.background = 'green'

		// Checks if there is a winner and ends the game
		for(let i = 0; i < 3; i++){
			if(cur_num_cards[i] == 0){
				console.log("Player " + i + " wins!")
				game_over = 1
				players[i].textContent = "Winner!"
				players[i].style.background = 'gold'
				break
			}
		}
		//game_over = 1
		// if (cur_player == 0) {
		// 	options = get_options(cur_hand[cur_player])
		// 	console.log(options)
		// }
	}
	calculate_score()
}




async function startGame() {
	startBtn.style.visibility = 'hidden'
	resetBtn.style.visibility = 'visible'
	init_cards()
	await sleep(2000)
	play_init_seven()
	await sleep(5000)
	main_game()
}

async function resetGame() {
	score = 0;
	cur_scores = [0, 0, 0]
	cur_hand = []
	reached_three = [0,0,0]
	cur_win = []
	cur_num_cards = [0,0,0]
	cur_player = -1
	game_over = 0
	seven_played = [0,0,0,0]
	upper = ['8', '8', '8', '8']
	lower = ['6', '6', '6', '6']
	upper_deck = [[],[],[],[]]
	lower_deck = [[],[],[],[]]
	//let options = []
	player_chose = 0
	sel_card = ''
	resetBtn.style.visibility = 'hidden'
	startBtn.style.visibility = 'visible'
	deck = []
		// Create a deck of cards
	for (let i = 0; i < 4; i++) {
	    cardValues.forEach(value => deck.push(value + suitValues[i]));
	}
	console.log(deck)
	deck.sort(() => Math.random() - 0.5); // Shuffle the deck
	console.log(deck)
	cur_hand = []
	for (let i = 0; i < 3; i++ ){
		cur_hand.push([])
	}
	// Clear out display
	for(let i = 0; i < allDisplays.length; i++){
		images = allDisplays[i].getElementsByTagName('img');
		// Loop through all the images and remove them 
		while (images.length > 0) { 
			allDisplays[i].removeChild(images[0]); 
		}
		let new_img = document.createElement('img');
		new_img.src = "cardsJS/cards/" + "BLUE_BACK" + ".svg"
		new_img.classList.add('card');
		allDisplays[i].appendChild(new_img)
	}
	//startGame()
}






