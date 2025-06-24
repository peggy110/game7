// 3x3 拼圖遊戲
const size = 3;
let board = [];
let emptyIndex = 8;

function initBoard() {
  board = Array.from({ length: 9 }, (_, i) => i);
  emptyIndex = 8;
  render();
}

function shuffleBoard() {
  // Fisher-Yates 洗牌
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  emptyIndex = board.indexOf(8);
  render();
  document.getElementById('message').textContent = '';
}

function render() {
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';
  board.forEach((num, idx) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece' + (num === 8 ? ' empty' : '');
    piece.textContent = num === 8 ? '' : num + 1;
    piece.addEventListener('click', () => movePiece(idx));
    container.appendChild(piece);
  });
}

function movePiece(idx) {
  if (canMove(idx)) {
    [board[emptyIndex], board[idx]] = [board[idx], board[emptyIndex]];
    emptyIndex = idx;
    render();
    if (isSolved()) {
      document.getElementById('message').textContent = '恭喜完成拼圖！';
    }
  }
}

function canMove(idx) {
  const row = Math.floor(idx / size);
  const col = idx % size;
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  );
}

function isSolved() {
  return board.every((num, idx) => num === idx);
}

document.getElementById('shuffle').addEventListener('click', shuffleBoard);

initBoard();
