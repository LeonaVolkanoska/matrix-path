var matrix = [
    [">", "-", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", "+", "-", "U", "-", "+", " ", "C"],
    [" ", " ", "|", " ", " ", " ", "|", " ", "|"],
    [" ", " ", "s", " ", " ", " ", "C", "-", "+"],
];
var validateChar = function (char) {
    var valid = ["-", "|", "+", "@"];
    if (valid.indexOf(char) !== -1) {
        return true;
    }
    if (char >= "A" && char <= "Z") {
        return true;
    }
    return false;
};
var findFirstElement = function (matrix) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === ">") {
                x = i;
                y = j;
                break;
            }
        }
    }
    return { x: x, y: y };
};
var canMoveRight = function (matrix, direction, x, y) {
    if (y + 1 < matrix[x].length &&
        validateChar(matrix[x][y + 1]) &&
        direction !== "left") {
        return true;
    }
    return false;
};
var canMoveLeft = function (matrix, direction, x, y) {
    if (y - 1 < matrix[x].length &&
        validateChar(matrix[x][y - 1]) &&
        direction !== "right") {
        return true;
    }
    return false;
};
var canMoveDown = function (matrix, direction, x, y) {
    if (x + 1 < matrix.length &&
        validateChar(matrix[x + 1][y]) &&
        direction !== "up") {
        return true;
    }
    return false;
};
var canMoveUp = function (matrix, direction, x, y) {
    if (x - 1 < matrix.length &&
        validateChar(matrix[x - 1][y]) &&
        direction !== "down") {
        return true;
    }
    return false;
};
var findDirection = function (direction, matrix, x, y) {
    var newDirection = direction;
    if (matrix[x][y] === "+" || (matrix[x][y] >= "A" && matrix[x][y] <= "Z")) {
        if (canMoveRight(matrix, newDirection, x, y)) {
            newDirection = "right";
        }
        else if (canMoveLeft(matrix, newDirection, x, y)) {
            newDirection = "left";
        }
        else if (canMoveDown(matrix, newDirection, x, y)) {
            newDirection = "down";
        }
        else if (canMoveUp(matrix, newDirection, x, y)) {
            newDirection = "up";
        }
    }
    return newDirection;
};
var findPath = function (matrix) {
    var firstElement = findFirstElement(matrix);
    var x = firstElement.x;
    var y = firstElement.y;
    var path = "";
    var letters = "";
    var direction = "right";
    while (matrix[x][y] !== "s") {
        path += matrix[x][y];
        if (matrix[x][y] >= "A" && matrix[x][y] <= "Z") {
            letters += matrix[x][y];
        }
        direction = findDirection(direction, matrix, x, y);
        if (direction === "right") {
            y++;
        }
        else if (direction === "left") {
            y--;
        }
        else if (direction === "down") {
            x++;
        }
        else if (direction === "up") {
            x--;
        }
    }
    path += "s";
    return { path: path, letters: letters };
};
var result = findPath(matrix);
console.log(result.path);
console.log(result.letters);
