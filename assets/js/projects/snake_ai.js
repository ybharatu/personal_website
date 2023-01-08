// Used this as the base: https://www.educative.io/blog/javascript-snake-game-tutorial

// class Node{
//   constructor(coord ,visited, left, right, up, down){
//     this.coord = coord;
//     this.visited = visited;
//     this.left = left;
//     this.right = right;
//     this.up = up;
//     this.down = down;
//   }
// }

// class Path{
//   constructor(height, width){
//     this.height = height;
//     this.width = width;
//     this.length = 0;
//     this.path = [];
//     this.init_path();
//   }

//   get_height(){
//     return this.height;
//   }

//   get_width(){
//     return this.width;
//   }

//   get_path(){
//     return this.path;
//   }

//   // Good resource: https://weblog.jamisbuck.org/2011/1/dx/maze-generation-prim-s-algorithm
//   init_path(){
//     // Making the start point the head of the snake. NEEED TO CHANGE if snake gets relocated
//     this.path[this.length] = new Node({x: dx0, y: dx0},1, 1, 1, 1, 1);
//     this.length = this.length + 1;
//   }
// }
// Another Good resource: https://github.com/CheranMahalingam/Snake_Hamiltonian_Cycle_Solver/blob/master/
const board_border = 'white';
const board_background = "black";
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';
const head_col = 'yellow';
const head_border = 'darkyellow';
const head_col_2 = "lightgreen";
const head_border_2 = "darkgreen";

const newGameButton = document.querySelector('#new_game_ai');
const showGridButton = document.querySelector('#show_grid_ai');
const showNumButton = document.querySelector('#show_num_ai');

// Get the canvas element
const snakeboard = document.getElementById("snakeboard_comp");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");

// Box width
var bw = 200;
// Box height
var bh = 200;
// Padding
var p = 0;
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 20;
let dx_2 = 20;
let dis = 20;
// Vertical velocity
let dy = 0;

// Timing Delay
delay = 200;

let snake = [  {x: snakeboard.width/2 , y: snakeboard.height/2 },  {x: snakeboard.width/2 - dx, y: snakeboard.height/2},  {x: snakeboard.width/2-2*dx, y: snakeboard.height/2},  {x: snakeboard.width/2-3*dx, y: snakeboard.height/2},  {x: snakeboard.width/2-4*dx, y: snakeboard.height/2},];
let init_length = snake.length;
grid_margin = 20

let food_x;
let food_y;

let score = 0

let grid_show = 0;

let num_show = 0;
let cur_idx = 0;

let follow_path = 0;

num_rows = snakeboard.height/grid_margin/2;
num_cols = snakeboard.width/grid_margin/2;
num_vert = num_cols * num_rows;

//let board = makeArray(40,40,0)



// let ham_path = new Path(snakeboard.height/2, snakeboard.width/2);
// console.log(ham_path.get_path())
// Start game
// main();

// gen_food();
clear_board();
newGameButton.addEventListener('click', driver);
showGridButton.addEventListener('click', changeGrid);
//showNumButton.addEventListener('click', changeNum);

document.addEventListener("keydown", change_direction);
document.addEventListener("keydown", start_new_game);;
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

directions = prim_maze();
graph = generate_cycle(directions);
path = make_hamiltonian_path(graph);

function driver() {
  //snake = [  {x: snakeboard.width/2 , y: snakeboard.height/2 },  {x: snakeboard.width/2 - dis, y: snakeboard.height/2},  {x: snakeboard.width/2-2*dis, y: snakeboard.height/2},  {x: snakeboard.width/2-3*dis, y: snakeboard.height/2},  {x: snakeboard.width/2-4*dis, y: snakeboard.height/2},];
  snake = [  {x: snakeboard.width/2 , y: snakeboard.height/2 },];
  init_length = snake.length;
  // Find initial index of snake in path
  cur_idx = get_initial_idx();

	// True if changing direction
	changing_direction = false;
	// Horizontal velocity
	dx = 20;
	// Vertical velocity
	dy = 0;

	score = 0;
  document.getElementById('score').innerHTML = score;
	main();
	gen_food();
}
// main function called repeatedly to keep the game running
function main() {
        if (has_game_ended()) return;

        changing_direction = false;
        setTimeout(function onTick() {
        clear_board();
        gridBoard();
        numPathBoard();
        drawFood();
        move_snake();
        drawSnake();
        // if(score === 10) {
        //   clear_board();
        //   gridBoard();
        //   numPathBoard();
        //   drawFood();
        //   move_snake();
        //   drawSnake();
        //   return;
        // }

        // Call main again
        main();
      }, delay)

    }

// draw a border around the canvas
function clearCanvas() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// draw a border around the canvas
function clear_board() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

function has_game_ended() {
  //console.log(num_vert*10 - init_length*10);
  if(score === num_vert*10 - init_length*10){
    return true;
  }
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - dx;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - dx;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function start_new_game(event){
  const keyPressed = event.keyCode;
  const SPACE = 32;

  if(keyPressed === SPACE){
    //driver();
    main();
  }
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -dis;
  const goingDown = dy === dis;
  const goingRight = dx === dis;
  const goingLeft = dx === -dis;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -dis;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -dis;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = dis;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = dis;
  }
}

// Draw one snake part
function drawSnakePart(snakePart, i) {
  if(i === 0){
  	// Set the colour of the snake part
    snakeboard_ctx.fillStyle = head_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = head_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, dx_2, dx_2);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, dx_2, dx_2);
  }
  else if(i === 1){
    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = head_col_2;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = head_border_2;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, dx_2, dx_2);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, dx_2, dx_2);
  }
  else {
  	// Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, dx_2, dx_2);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, dx_2, dx_2);
  }
  
}



function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / dx_2) * dx_2;
}

function gen_food() {
  if (has_game_ended()) return;
  // Generate a random number the food x-coordinate
  food_x = random_food(0, snakeboard.width - dx_2);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, snakeboard.height - dx_2);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function drawFood()
{
      snakeboard_ctx.fillStyle = 'red';
      snakeboard_ctx.strokestyle = 'darkred';
      snakeboard_ctx.fillRect(food_x, food_y, dx_2, dx_2);
      snakeboard_ctx.strokeRect(food_x, food_y, dx_2, dx_2);
}

function get_initial_idx(){
  x_sn = snake[0].x / dx_2;
  y_sn = snake[0].y / dx_2;
  //console.log("SNAKE HEAD: "+ x_sn + " " + y_sn);
  for (let idx = 0; idx < path.length; idx += 1){
    x_chk = path[idx][0];
    y_chk = path[idx][1];
    //console.log("Checking: " + x_chk + " " + y_chk);
    if(x_chk === x_sn && y_chk === y_sn){
      //console.log(idx);
      return idx;
    }
  }
  return -1;
}

function get_idx(x_sn, y_sn){
  //console.log("x_sn: " + x_sn);
  //console.log("y_sn: " + y_sn);
  for (let idx = 0; idx < path.length; idx += 1){
    x_chk = path[idx][0];
    y_chk = path[idx][1];
    //console.log("Checking: " + x_chk + " " + y_chk);
    if(x_chk === x_sn && y_chk === y_sn){
      return idx;
    }
  }
  return -1;
}

function get_distance_idx(idx0, idx1){
  //console.log("idx0: " + idx0);
  //console.log("idx1: " + idx1);
  if(idx0 - idx1 < 0){
    return (num_vert - idx1) + idx0;
  }else{
    return idx0 - idx1;
  }
}


function set_pop(s){
  let value;
  for(value of s);
  return value;
}

function get_adj_matrix(head_idx, tail_idx, food_idx){

  var adj_matrix = new Array(num_vert);

  for (var i = 0; i < adj_matrix.length; i++) {
    adj_matrix[i] = new Array(num_vert);
  }

  for (var i = 0; i < adj_matrix.length; i++){
    for (var j = 0; j < adj_matrix[0].length; j++){
      adj_matrix[i][j] = 0;
    } 
  }
  console.log("HEAD: " + head_idx);
  console.log("TAIL: " + tail_idx);
  console.log("FOOD: " + food_idx);


  for(var i = 0; i < num_vert; i += 1){

    // Check Left idx
    if(path[i][0] - 1 >= 0){
      j = get_idx(path[i][0] -1, path[i][1]);
      //console.log("LEFT: " + j);
      if (head_idx < tail_idx && j > head_idx && j < tail_idx + (i - head_idx) && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }else if ( head_idx >= tail_idx && (j > head_idx || j < tail_idx + (i - head_idx)) && j > i){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }
    }
    // Check Right idx
    if(path[i][0] + 1 <= num_cols){
      j = get_idx(path[i][0] + 1, path[i][1]);
      if (head_idx < tail_idx && j > head_idx && j < tail_idx + (i - head_idx) && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }else if ( head_idx >= tail_idx && (j > head_idx || j < tail_idx + (i - head_idx)) ){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }
    }
    // Check Up idx
    if(path[i][1] - 1 >= 0){
      j = get_idx(path[i][0], path[i][1] - 1);
      if (head_idx < tail_idx && j > head_idx && j < tail_idx + (i - head_idx) && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }else if ( head_idx >= tail_idx && (j > head_idx || j < tail_idx + (i - head_idx) ) ){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }
    }
    // Check Down Idx
    if(path[i][1] + 1 <= num_rows){
      j = get_idx(path[i][0], path[i][1] + 1);
      if (head_idx < tail_idx && j > head_idx && j < tail_idx + (i - head_idx) && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }else if ( head_idx >= tail_idx && (j > head_idx || j < tail_idx + (i - head_idx) ) ){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
      }
    }
  }

  console.log(adj_matrix);
  return adj_matrix;
}

function get_adj_matrix_2(head_idx, tail_idx, food_idx){

  var adj_matrix = new Array(num_vert);

  for (var i = 0; i < adj_matrix.length; i++) {
    adj_matrix[i] = new Array(num_vert);
  }

  for (var i = 0; i < adj_matrix.length; i++){
    for (var j = 0; j < adj_matrix[0].length; j++){
      adj_matrix[i][j] = 0;
    } 
  }
  


  count = 0;
  all_idx = get_all_idx();
  //console.log(all_idx);
  new_head = all_idx[0];
  new_tail = all_idx.slice(-1);

  // console.log("HEAD: " + new_head);
  // console.log("TAIL: " + new_tail);
  // console.log("FOOD: " + food_idx);

  changed = 0;
  next_head = -1;
  next_tail = -1;
  next_idx = -1;

  for(var i = 0; i < num_vert; i += 1){
    // Check Left idx
    if(path[i][0] - 1 >= 0 && changed == 0){
      j = get_idx(path[i][0] - 1, path[i][1]);
      // if(i == head_idx){
      //   console.log("Left: " + j);
      //   console.log("New Head: " + new_head);
      //   console.log("New Tail: " + new_tail);
      //   console.log(new_head >= new_tail);
      //   console.log((j > new_head || j < new_tail))
      //   console.log(j > i);
      // }
      
      if (new_head < new_tail && j > new_head && j < new_tail  && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }else if (new_head >= new_tail && (j > new_head || j < new_tail) && j > i){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }
      if(changed && j > next_idx){
        next_idx = j;
      }
    }
    changed = 0;
    // Check Right idx
    if(path[i][0] + 1 <= num_cols && changed == 0 ){
      j = get_idx(path[i][0] + 1, path[i][1]);
      // if(i == head_idx){
      //   console.log("Right: " + j);
      // }
      if (new_head < new_tail && j > new_head && j < new_tail  && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }else if (new_head >= new_tail && (j > new_head || j < new_tail) && j > i){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }
      if(changed && j > next_idx){

        next_idx = j;

      }
    }
    changed = 0;
    // Check Up idx
    if(path[i][1] - 1 >= 0 && changed == 0 ){
      j = get_idx(path[i][0] , path[i][1] - 1);
      // if(i == head_idx){
      //   console.log("Up: " + j);
      // }
      if (new_head < new_tail && j > new_head && j < new_tail  && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }else if (new_head >= new_tail && (j > new_head || j < new_tail) && j > i){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }
      if(changed && j > next_idx){

        next_idx = j;

      }
    }
    changed = 0;
    // Check Down idx
    if(path[i][1] + 1 <= num_rows  && changed == 0){
      j = get_idx(path[i][0] , path[i][1] + 1);
      // if(i == head_idx){
      //   console.log("Down: " + j);
      // }
      if (new_head < new_tail && j > new_head && j < new_tail  && j > i ){
        //console.log("WENT TO 1: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }else if (new_head >= new_tail && (j > new_head || j < new_tail) && j > i){
        //console.log("WENT TO 2: adj_matrix[" + i + "][" + j + "] = 1");
        adj_matrix[i][j] = 1;
        changed = 1;
      }
      if(changed && j > next_idx){
        next_idx = j;
      }
    }
    changed = 0;

    // Updating some loop variables
    // all_idx.unshift(next_idx);;
    // all_idx.pop();
    // new_head = all_idx[0];
    // new_tail = all_idx.splice(-1);

  }

  //console.log(adj_matrix);
  return adj_matrix;
}

function get_all_idx(){
  all_idx = [];
  for(var i = 0; i < snake.length; i += 1){
    idx = get_idx(snake[i].x / dx_2, snake[i].y / dx_2);
    all_idx.push(idx);
  }

  return all_idx;
}

function find_path(head_idx, tail_idx, food_idx){
  // Dijkstra’s
  // Create shortest path tree set
  // Found from https://stackoverflow.com/questions/63179867/set-of-tuples-in-javascript
  class ObjectSet extends Set{
    add(elem){
      return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
    has(elem){
    return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
  }

  adj_matrix = get_adj_matrix_2(head_idx, tail_idx, food_idx);

  // Need to keep track of vertices included in the shortest-path tree
  let spts = new ObjectSet();

  // Assign a distance value to all vertices in the input graph.
  var distances = new Array(num_vert);

  // Found path between start_idx and end_idx (i and j)
  var added = new Array(num_vert);

  // Parent array to store shortest path tree
  var parents = new Array(num_vert);

  // Indexes of the snake
  all_idx = get_all_idx();
  new_head = all_idx[0];
  new_tail = all_idx.splice(-1);


  for (var i = 0; i < distances.length; i++) {
    // directions[i] = new Array(num_vert);
    // added[i] = new Array(num_vert);
    distances[i] = 50000;
    added[i] = false;
  }

  // i is start_idx
  // j is end_idx
  // for (var i = 0; i < distances.length; i++){
  //   for (var j = 0; j < distances[0].length; j++){
  //     distances[i][j] = 50000;
  //     num_vert[i][j] = false;
  //   } 
  // }

  // Set source distance to 0
  distances[head_idx] = 0;

  // Set source parent to -1, because starting vertex does not have parent
  parents[head_idx] = -1;

  // Find shortest path for all verticies:
  for(var i = 1; i < num_vert; i += 1){
    //console.log("i: " + i);
    nearest_idx = -1;
    shortest_dist = 50000

    for(var vi = 0; vi < num_vert; vi +=1 ){
      if(!(added[vi]) && distances[vi] < shortest_dist){
        nearest_idx = vi;
        //console.log("Updating Shortest distance[" + vi + "] = " + distances[vi]);
        shortest_dist = distances[vi];
      }
    }
    if(nearest_idx != -1){
      added[nearest_idx] = true;
      all_idx.unshift(nearest_idx);
      all_idx.pop();
      new_head = all_idx[0];
      new_tail = all_idx.splice(-1);
      adj_matrix = get_adj_matrix_2(new_head, new_tail, food_idx);
      //console.log("nearest_idx: " + nearest_idx);
      //console.log("Shortest distance: " + shortest_dist);
    }else{
      continue;
    }
    
    
    for(var vi = 0; vi < num_vert; vi += 1){
      
      //console.log("vi: " + vi);
      dist = adj_matrix[nearest_idx][vi];

      if(dist > 0 && (shortest_dist + dist) < distances[vi]){
        //console.log("Dist: " + dist);
        //console.log("Shortest Dist: " + shortest_dist);
        distances[vi] = shortest_dist + dist;
        //console.log("Updating distances[" + vi + "] = " + distances[vi]);
        parents[vi] = nearest_idx;
      }
    }
  }
  //console.log(distances);
  //console.log(parents);
  return [distances, parents];
  //print_solution(head_idx, distances, parents);

  // Recursive function that goes through all verticies
  // tree = []
  // tree = find_tree(spts, head_idx, food_idx, tree);




}

// Took a lot from: https://www.geeksforgeeks.org/printing-paths-dijkstras-shortest-path-algorithm/
function print_solution(start_vertex, distances, parents){
  nVert = distances.length;

  for(var vi = 0; vi < nVert; vi += 1){
    if (vi != start_vertex){
      console.log("\n" + start_vertex + " -> " + vi + "\t\tDistance: " + distances[vi]);
      //console.log(vi + " \t\t ");
      //console.log(distances[vi] + "\t\t");
      printPath(vi, parents);
    }
  }
}

function printPath(currentVertex, parents){
  if (currentVertex === -1){
    return;
  }
  printPath(parents[currentVertex], parents);
  console.log(currentVertex + " ");
}

function get_next_idx(parents, cur_idx, head_idx, iteration){
  //console.log("Current Index: " + cur_idx);
  if (parents[cur_idx] === head_idx){
    //console.log("Returning: " + cur_idx);
    return cur_idx;
  }
  if(iteration == num_vert){
    console.log("Iteration Limit: " + cur_idx + " at iteration " + iteration);
    return cur_idx;
  }
  return get_next_idx(parents, parents[cur_idx], head_idx, iteration + 1);
}

function move_snake() {

  // New move snake logic using the hamiltonian path
  // Get next coordinate using cur_idx
  if( follow_path === 1 || score > .7 * (num_vert*10 - init_length*10)){
    next_pos = path[(cur_idx+1)%(num_vert)];
  }else{
    //console.log("Food idx: " + get_idx(food_x / dx_2, food_y / dx_2));
    //console.log("Curr idx: " + cur_idx);
    food_idx = get_idx(food_x / dx_2, food_y / dx_2);
    dist_to_food = get_distance_idx(food_idx, cur_idx);
    tail_idx = get_idx(snake.slice(-1)[0].x / dx_2, snake.slice(-1)[0].y / dx_2);
    head_idx = get_idx(snake[0].x / dx_2, snake[0].y / dx_2);
    // console.log(snake.slice(-1)[0].x + " " + snake.slice(-1)[0].y);
    // console.log("Tail idx: " + tail_idx);
    // console.log("Head idx: " + head_idx);
    // console.log("Food idx: " + food_idx);
    // console.log("Distance to Food: " + dist_to_food);
    total = find_path(head_idx, tail_idx, food_idx);
    distances = total[0];
    parents = total[1];

    // new_idx = get_next_idx(parents, food_idx, head_idx, 0);
    // console.log("New idx: " + new_idx);
    // console.log(distances);
    // next_pos = path[new_idx];

    if(distances[food_idx] < dist_to_food){
      new_idx = get_next_idx(parents, food_idx, head_idx, 0);
      console.log("New idx: " + new_idx);
      next_pos = path[new_idx];
    }else{
      // new_idx = get_next_idx(parents, food_idx, head_idx, 0);
      // console.log("New idx: " + new_idx);
      // next_pos = path[new_idx];
      console.log("Using normal hamiltonian Path");
      next_pos = path[(cur_idx+1)%(num_vert)];
    }   
    console.log(distances);
    console.log(parents);
  }

  
  //console.log(next_pos);
  const head = {x: next_pos[0]*dx_2, y: next_pos[1]*dx_2};
  head_idx = get_idx(next_pos[0], next_pos[1])
  console.log("Moving head to " + head_idx);
  //console.log("Moving head to pos: " + next_pos);
  //cur_idx = (cur_idx+1)%(num_vert);
  
  // Create the new Snake's head
  //const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
  cur_idx = get_initial_idx();
}

//found from https://stackoverflow.com/questions/11735856/draw-a-grid-on-an-html-5-canvas-element
function gridBoard(){
  //console.log("Toggle Grid")
  var count = 0;
	if(grid_show){
		for (var x = 0; x <= snakeboard.width; x += grid_margin) {
	        snakeboard_ctx.moveTo(0.5 + x + p, p);
	        snakeboard_ctx.lineTo(0.5 + x + p, snakeboard.height + p);
          // snakeboard_ctx.font = "dxpx Arial";
          // snakeboard_ctx.fillStyle = "red";
          // snakeboard_ctx.fillText("1", dx2, dx0);
	    }

	    for (var x = 0; x <= snakeboard.height; x += grid_margin) {
	        snakeboard_ctx.moveTo(p, 0.5 + x + p);
	        snakeboard_ctx.lineTo(snakeboard.width + p, 0.5 + x + p);
	    }
	    snakeboard_ctx.strokeStyle = "white";
	    snakeboard_ctx.stroke();
	}
    
}



function numBoard(){
  //console.log("Toggle Grid")
  var count = 0;
  if(num_show){
    for (var y = 0; y <= snakeboard.height - 1; y += grid_margin) {
          
      for (var x = 0; x <= snakeboard.height - 1; x += grid_margin) {
          
          if (count < (num_vert) ){
            if (count === 10){
              console.log(x + 2 + " " + y + 8);
            }
            snakeboard_ctx.font = "7px Arial";
            snakeboard_ctx.fillStyle = "red";
            snakeboard_ctx.fillText(count, x + 2, y + 8);
            count = count + 1;
          }
          
          //console.log(count);
      }
    }
  }
    
}

function numPathBoard(){
  //console.log("Toggle Grid")
  if(num_show){
    for(var x = 0; x < num_vert; x += 1){
      snakeboard_ctx.font = "7px Arial";
      snakeboard_ctx.fillStyle = "red";
      //console.log(path[x]);
      snakeboard_ctx.fillText(x, path[x][0]*grid_margin + 2, path[x][1]*grid_margin + 8);
    }
  }
    
}

function changeGrid(){
	//console.log("Changed Grid")
	if (grid_show === 1){
		grid_show = 0;
	}else{
		grid_show = 1;
	}
  clear_board();
  gridBoard();
  numPathBoard();
}

function changeNum(){
  //console.log("Changed Grid")
  if (num_show === 1){
    num_show = 0;
  }else{
    num_show = 1;
  }
  clear_board();
  gridBoard();
  numPathBoard();
}

// Found from https://stackoverflow.com/questions/13808325/creating-a-2d-array-with-specific-length-and-width
function makeArray(w, h, val) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}


function count_ones(arr){
  count = 0;
  for(let i = 0; i < arr.length;i++){
    for(let j = 0; j < arr[0].length;j++){
      if (arr[i][j] === 1){
        count += 1;
      }
    }
  }
  return count;
}

// Found from here: https://stackoverflow.com/questions/41661287/how-to-check-if-an-array-contains-another-array
function isArrayInArray(arr, item){
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}


// Referenced: https://github.com/CheranMahalingam/Snake_Hamiltonian_Cycle_Solver/blob/master/
// Use Prim's algorithm to create a maze
function prim_maze(){
  // Calculate all verticies. Needs to be half the size of the original board. 
  num_rows = snakeboard.height/grid_margin/2;
  num_cols = snakeboard.width/grid_margin/2;
  num_vert = num_cols * num_rows;

  // directions = Array.from(Array(num_rows), () => new Array(num_cols));
  // visited = Array.from(Array(num_rows), () => new Array(num_cols));
  //directions = {}
  //visited = {}

// Got this from: https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
var directions = new Array(num_rows);
var visited = new Array(num_rows);

for (var i = 0; i < directions.length; i++) {
  directions[i] = new Array(num_cols);
  visited[i] = new Array(num_cols);
}
for (var i = 0; i < directions.length; i++){
  for (var j = 0; j < directions[0].length; j++){
    directions[i][j] = [];
    visited[i][j] = 0;
  }
}

//console.log(visited);
  // Key Generation
  // for (var y = 0; y <= num_rows; y++){
  //   for (var x = 0; x <= num_cols; x++){
  //     directions[x][y] = [];
  //     visited[x][y] = 0;
  //   }
  // }

  init_x = Math.floor(Math.random() * num_cols); 
  init_y = Math.floor(Math.random() * num_rows); 

  curr_x = init_x;
  curr_y = init_y;
  new_x = curr_x;
  new_y = curr_y;

  console.log("Current pos:");
  console.log(curr_x);
  console.log(curr_y);

  // Need to keep track of visited points
  visited[curr_x][curr_y] = 1;

  // Found from https://stackoverflow.com/questions/63179867/set-of-tuples-in-javascript
  class ObjectSet extends Set{
    add(elem){
      return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
    has(elem){
    return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
  }

  // Need to keep track of adjacent points
  let adjacent = new ObjectSet();

  //while (Object.keys(visited).length != num_vert){
  while(count_ones(visited) != num_vert){

    curr_x = new_x;
    curr_y = new_y;

    // Need to list all the cases to check adjacent cells

    // Case #1: Not on any edge of the board. Have neighbors above, below, right, and left of you
    if (curr_x != 0 && curr_y != 0 && curr_x != num_cols - 1 && curr_y != num_rows - 1){
      //adjacent.add({x: curr_x, y: curr_y })
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
      // Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
      // Below neighbor
      adjacent.add([curr_x , curr_y + 1 ]);
    }
    // Case #2: Top left corner. Have neighbors below, and right of you
    else if (curr_x === 0 && curr_y === 0 ){
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
      // Below neighbor
      adjacent.add([curr_x, curr_y + 1 ]);
    }
    // Case #3: Top Right corner. Have neighbors below, and left of you
    else if (curr_x === num_cols - 1 && curr_y === 0 ){
      // Below neighbor
      adjacent.add([curr_x, curr_y + 1 ]);
      // Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
    }
    // Case #4: Bottom Right corner. Have neighbors above, and left of you
    else if (curr_x === num_cols - 1 && curr_y === num_rows - 1 ){
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
      // Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
    }
    // Case #5: Bottom Left corner. Have neighbors above, and right of you
    else if (curr_x === 0 && curr_y === num_rows - 1 ){
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
    }
    // Case #6: Left Edge. Have neighbors above, below, and right of you
    else if (curr_x === 0 ){
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
      // Below neighbor
      adjacent.add([curr_x, curr_y + 1 ]);
    }
    // Case #7: Right Edge. Have neighbors above, below, and left of you
    else if (curr_x === num_cols - 1 ){
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
      /// Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
      // Below neighbor
      adjacent.add([curr_x, curr_y + 1 ]);
    }
    // Case #8: Top Edge. Have neighbors below, right and left of you
    else if (curr_y === 0 ){
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
      /// Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
      // Below neighbor
      adjacent.add([curr_x, curr_y + 1 ]);
    }
    // Case #9: Bottom Edge. Have neighbors above, right and left of you
    else if (curr_y === num_rows - 1 ){
      // Right neighbor
      adjacent.add([curr_x + 1, curr_y ]);
      /// Left neighbor
      adjacent.add([curr_x - 1, curr_y ]);
      // Above neighbor
      adjacent.add([curr_x , curr_y - 1]);
    }

    console.log(adjacent);

    while (true){

      // Pick random adjacent cell to check. 
      new_cell = set_pop(adjacent);
      //console.log(new_cell);
      
      new_x = parseInt(new_cell.split(",")[0].split("[")[1],dx);
      new_y = parseInt(new_cell.split(",")[1].split("]")[0],dx);
      console.log(new_x + " " +  new_y);
      //console.log(visited);
      adjacent.delete(new_cell)   
      //console.log(adjacent)
      // Checks if a wall already exists. If it does, it will pick a new cell
      if (visited[new_x][new_y] == 0) {

        // Marks this location as visited
        visited[new_x][new_y] = 1;

        // Creating the wall. Check the adjacent cells until you find a visited cell. Then make a wall towards it. 
        // Only consider walls to be the right or down
        if (new_x+1 <= num_cols-1 && visited[new_x+1][new_y] == 1){
          directions[new_x][new_y].push("right");
        }
        else if(new_x != 0 && visited[new_x-1][new_y] == 1){
          directions[new_x-1][new_y].push("right");
        }
        else if(new_y+1 <= num_rows && visited[new_x][new_y+1] == 1){
          directions[new_x][new_y].push("down");
        }
        else if(new_y != 0 && visited[new_x][new_y-1] == 1){
          directions[new_x][new_y-1].push("down");
        }
        else{
          console.log("Something went wrong in prim_maze()");
        }

        break;
      }
    }
      console.log("num visited:");
      console.log(count_ones(visited));
      
  }
   console.log(directions); 
   return directions;
  //}
}

function generate_cycle(directions){

  num_rows = snakeboard.height/grid_margin/2;
  num_cols = snakeboard.width/grid_margin/2;
  num_vert = num_cols * num_rows;

  // 2D Array that acts like a dictionary
  // Key is the (x,y) location
  // Value is the (x,y) locations it can travel to from the (x,y) location from key
  var graph = new Array(num_rows*2);

  for (var i = 0; i < graph.length; i++) {
    graph[i] = new Array(num_cols*2);
  }
  for (var i = 0; i < graph.length; i++){
    for (var j = 0; j < graph[0].length; j++){
      graph[i][j] = [];
    }
  }

  for (var i = 0; i < num_rows; i++){
    for (var j = 0; j < num_cols; j++){
      // Case #1: Not on any edge of the board. Have neighbors above, below, right, and left of you
      if (j != num_cols - 1 && i != num_rows - 1 && j != 0 && i != 0){
        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

        if (!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1, i*2]);
        }

        if (!(directions[j-1][i].includes("right"))){
            graph[j*2][i*2].push([j*2, i*2 + 1]);
        }

      }

      // Case #2: Top left corner. Have neighbors below, and right of you
      else if (j == 0 && i == 0) {
        graph[j*2][i*2].push([j*2 + 1, i*2]);
        graph[j*2][i*2].push([j*2, i*2 + 1]);

        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

      }

      // Case #3: Top Right corner. Have neighbors below, and left of you
      else if (j == num_cols-1 && i == 0) {
        //console.log("Got here? when j = " + j + " and i = " + i );
        graph[j*2][i*2].push([j*2 + 1, i*2]);
        graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j-1][i].includes("right"))){
          graph[j*2][i*2].push([j*2,i*2 + 1]);
        }

      }

      // Case #4: Bottom Right corner. Have neighbors above, and left of you
      else if (j == num_cols-1 && i == num_rows - 1) {
        graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);

        if(!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1,i*2]);
        }
        else if(!(directions[j-1][i].includes("right"))){
          graph[j*2][i*2].push([j*2 ,i*2 + 1]);
        }

      }

      // Case #5: Bottom Left corner. Have neighbors above, and right of you
      else if (j == 0 && i == num_rows-1){
        graph[j*2][i*2].push([j*2 , i*2 + 1]);
        graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);

        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1,i*2 ]);
        }

      }

      // Case #6: Left Edge. Have neighbors above, below, and right of you
      else if(j == 0){
        graph[j*2][i*2].push([j*2 , i*2 + 1]);

        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1,i*2 ]);
        }

      }

      // Case #7: Right Edge. Have neighbors above, below, and left of you
      else if(j == num_cols-1){
        graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1, i*2 ]);
        }

        if(!(directions[j-1][i].includes("right"))){
          graph[j*2][i*2].push([j*2,i*2 + 1]);
        }

      }

      // Case #8: Top Edge. Have neighbors below, right and left of you
      else if(i == 0){
        graph[j*2][i*2].push([j*2 + 1, i*2 ]);

        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if (directions[j][i].includes("down")){
          graph[j*2][i*2 + 1].push([j*2, i*2 + 2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 1, i*2 + 2]);
        } else {
          graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j-1][i].includes("right"))){
          graph[j*2][i*2].push([j*2,i*2 + 1]);
        }

      }

      // Case #9: Bottom Edge. Have neighbors above, right and left of you
      else if( i == num_rows-1){
        graph[j*2][i*2 + 1].push([j*2 + 1, i*2 + 1]);

        if (directions[j][i].includes("right")){
          graph[j*2 + 1][i*2].push([j*2 + 2, i*2]);
          graph[j*2 + 1][i*2 + 1].push([j*2 + 2, i*2 + 1]);
        } else {
          graph[j*2 + 1][i*2].push([j*2 + 1, i*2 + 1]);
        }

        if(!(directions[j][i-1].includes("down"))){
          graph[j*2][i*2].push([j*2 + 1, i*2 ]);
        }

        if(!(directions[j-1][i].includes("right"))){
          graph[j*2][i*2].push([j*2,i*2 + 1]);
        }

      }

    }
  }
  console.log(graph);
  return graph;
}

function make_hamiltonian_path (graph){
  num_rows = snakeboard.height/grid_margin;
  num_cols = snakeboard.width/grid_margin;
  num_vert = num_cols * num_rows;

  // Array that contains the ordered list of coordinates that compose of the path
  var path = new Array();

  path.push([0,0]);
  prev_cell = path[0];
  prev_x = path[0][0];
  prev_y = path[0][1];
  prev_direction = 'NONE';

  // Generates a Hamiltonian Path by following these rules:
  // 1. Can you go right? If so go right
  // 2. Can you go down? If so go down
  // 3. Can you go left? If so go left
  // 4. Can you go up? If so go Up
  // 5. It is not possible to reverse directions (left then right)
  while(path.length != num_vert ){

    //console.log("READING: " + prev_x + " " + prev_y);
    // console.log(graph[prev_x][prev_y]);
    // console.log(isArrayInArray(graph[prev_x][prev_y], [prev_x +1, prev_y]));
    // console.log(graph[prev_x][prev_y][0]);
    // console.log([prev_x + 1, prev_y]);

    if (graph[prev_x][prev_y].length != 0 && isArrayInArray(graph[prev_x][prev_y], [prev_x +1, prev_y]) && prev_direction != 'left'){
      path.push([prev_x + 1, prev_y]);
      prev_x = prev_x + 1;
      prev_direction = 'right';
    }
    else if (graph[prev_x][prev_y].length != 0 && isArrayInArray(graph[prev_x][prev_y], [prev_x , prev_y + 1]) && prev_direction != 'up'){
      path.push([prev_x, prev_y + 1]);
      prev_y = prev_y + 1;
      prev_direction = 'down';
    }
    else if (prev_x -1 != -1 && graph[prev_x - 1][prev_y].length != 0 && isArrayInArray(graph[prev_x - 1][prev_y], [prev_x , prev_y]) && prev_direction != 'right'){
      path.push([prev_x - 1, prev_y]);
      prev_x = prev_x - 1;
      prev_direction = 'left';
    }
    else{
      path.push([prev_x, prev_y - 1]);
      prev_y = prev_y - 1;
      prev_direction = 'up';
    }

  }

  console.log(path);
  return path;

}


// document.addEventListener("DOMContentLoaded", function () {
//   pTag = document.querySelector("div");
//   newVal = document.createElement("p");
//   newVal.innerHTML = '';
//   pTag.appendChild(newVal);
// });
