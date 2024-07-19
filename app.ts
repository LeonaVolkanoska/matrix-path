type FindPathResult = {
  path: string;
  letters: string;
};

const matrix: Array<string[]> = [
  [">", "-", "-", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", "+", "-", "U", "-", "+", " ", "C"],
  [" ", " ", "|", " ", " ", " ", "|", " ", "|"],
  [" ", " ", "s", " ", " ", " ", "C", "-", "+"],
];

const validateChar = function (char: string): boolean {
  const valid = ["-", "|", "+", "@"];

  if (valid.indexOf(char) !== -1) {
    return true;
  }

  if (char >= "A" && char <= "Z") {
    return true;
  }

  return false;
};

const findFirstElement = function (matrix: Array<string[]>): {
  x: number;
  y: number;
} {
  let x = 0;
  let y = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === ">") {
        x = i;
        y = j;
        break;
      }
    }
  }
  return { x, y };
};

const canMoveRight = (
  matrix: Array<string[]>,
  direction: string,
  x: number,
  y: number
) => {
  if (
    y + 1 < matrix[x].length &&
    validateChar(matrix[x][y + 1]) &&
    direction !== "left"
  ) {
    return true;
  }

  return false;
};

const canMoveLeft = (
  matrix: Array<string[]>,
  direction: string,
  x: number,
  y: number
) => {
  if (
    y - 1 < matrix[x].length &&
    validateChar(matrix[x][y - 1]) &&
    direction !== "right"
  ) {
    return true;
  }

  return false;
};

const canMoveDown = (
  matrix: Array<string[]>,
  direction: string,
  x: number,
  y: number
) => {
  if (
    x + 1 < matrix.length &&
    validateChar(matrix[x + 1][y]) &&
    direction !== "up"
  ) {
    return true;
  }

  return false;
};

const canMoveUp = (
  matrix: Array<string[]>,
  direction: string,
  x: number,
  y: number
) => {
  if (
    x - 1 < matrix.length &&
    validateChar(matrix[x - 1][y]) &&
    direction !== "down"
  ) {
    return true;
  }

  return false;
};

const findDirection = (
  direction: string,
  matrix: Array<string[]>,
  x: number,
  y: number
): string => {
  let newDirection = direction;
  if (matrix[x][y] === "+" || (matrix[x][y] >= "A" && matrix[x][y] <= "Z")) {
    if (canMoveRight(matrix, newDirection, x, y)) {
      newDirection = "right";
    } else if (canMoveLeft(matrix, newDirection, x, y)) {
      newDirection = "left";
    } else if (canMoveDown(matrix, newDirection, x, y)) {
      newDirection = "down";
    } else if (canMoveUp(matrix, newDirection, x, y)) {
      newDirection = "up";
    }
  }
  return newDirection;
};

const findPath = function (matrix: Array<string[]>): FindPathResult {
  const firstElement = findFirstElement(matrix);
  let x = firstElement.x;
  let y = firstElement.y;

  let path = "";
  let letters = "";
  let direction = "right";

  while (matrix[x][y] !== "s") {
    path += matrix[x][y];
    if (matrix[x][y] >= "A" && matrix[x][y] <= "Z") {
      letters += matrix[x][y];
    }

    direction = findDirection(direction, matrix, x, y);

    if (direction === "right") {
      y++;
    } else if (direction === "left") {
      y--;
    } else if (direction === "down") {
      x++;
    } else if (direction === "up") {
      x--;
    }
  }

  path += "s";
  return { path, letters };
};

const result = findPath(matrix);
console.log(result.path);
console.log(result.letters);
