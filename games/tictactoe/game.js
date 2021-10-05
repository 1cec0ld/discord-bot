class Game {
  constructor() {
    this.board = [];
    this.BLANK = -1;
    this.size = 3; //future feature: dynamic sizes beyond 3x3
    for (let i = 0; i < this.size ** 2; i++) {
      this.board[i] = this.BLANK;
    } // -1, 0, or 1
    this.activePlayer = 0; // 0 or 1
    this.charSet = ["X", "O"]; //future feature: get reactions from msg.content for different charsets
  }

  reset() {
    this.board = [];
    for (let i = 0; i < this.size ** 2; i++) {
      this.board[i] = this.BLANK;
    } // -1, 0, or 1
    this.activePlayer = 0; // 0 or 1
  }

  toString() {
    let output = "";
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] != this.BLANK) {
        output += this.charSet[this.board[i]] + " ";
      } else {
        output += "." + " ";
      }
      if (!((i - 2) % this.size)) {
        output += "\n";
      }
    }
    return output;
  }

  mark(col, row) {
    let index = col + row * this.size;
    if (this.board[index] == this.BLANK) {
      this.board[index] = this.activePlayer;
      this.nextPlayer();
      return true;
    } else {
      return false;
    }
  }

  nextPlayer() {
    this.activePlayer = 1 - this.activePlayer; // 0 or 1
  }

  winner() {
    //future: make this not first-year win checking
    let slice = [];
    //horizontal
    for (let i = 0; i < this.size; i++) {
      let start = i * this.size;
      let end = (i + 1) * this.size;
      slice = this.board.slice(start, end);
      if (this.inARow(...slice)) return slice[0];
    }
    //vertical
    for (let j = 0; j < this.size; j++) {
      slice = [];
      for (let i = 0; i < this.size; i++) {
        slice.push(this.board[j + (i * (this.size - 1) + i)]);
        if (this.inARow(...slice)) return slice[0];
      }
    }
    //diagonal right
    slice = [];
    for (let i = 0; i < this.size; i++) {
      let index = i * this.size + i;
      slice.push(this.board[index]);
    }
    if (this.inARow(...slice)) return slice[0];
    //diagonal left
    slice = [];
    for (let i = 0; i < this.size; i++) {
      let index = (i + 1) * this.size - i - 1;

      slice.push(this.board[index]);
    }
    if (this.inARow(...slice)) return slice[0];
    return false;
  }

  inARow(...inputs) {
    return (
      inputs[0] != this.BLANK &&
      inputs.filter((val) => inputs[0] == val).length == this.size
    );
  }

  cat() {
    return !this.board.some((val) => val == this.BLANK);
  }
}
