/**
 * All eight possible moves a knight can make on a chessboard.
 * @type {Array<[number, number]>}
 */
const KNIGHT_MOVES = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

/**
 * Finds one of the shortest paths between the two given coordinates.
 * @param {[number, number]} start
 * @param {[number, number]} end
 * @returns {Array<[number, number]>}
 */
export default function knightMoves(start, end) {
  const prev = new Map();
  const visited = new Set();
  const queue = [start];

  const startKey = start.join("");
  const endKey = end.join("");

  prev.set(startKey, null);
  visited.add(startKey);

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const currKey = [x, y].join("");

    if (x === end[0] && y === end[1]) {
      break;
    }

    for (const [dx, dy] of KNIGHT_MOVES) {
      const [nx, ny] = [x + dx, y + dy];
      const nextKey = [nx, ny].join("");

      if (!visited.has(nextKey) && nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        prev.set(nextKey, currKey);
        visited.add(nextKey);
        queue.push([nx, ny]);
      }
    }
  }

  const path = [];

  let curr = endKey;

  while (curr !== null) {
    path.push(curr.split("").map((x) => parseInt(x)));
    curr = prev.get(curr);
  }

  return path.reverse();
}
