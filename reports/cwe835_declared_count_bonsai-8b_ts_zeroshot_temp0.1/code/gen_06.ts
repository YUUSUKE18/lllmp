const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

let count = 0;
let sum = 0;

countLine.split('').forEach(char => {
    if (char === '-') {
        count++;
    } else if (char === '+' || char === '.') {
        sum += parseInt(sumLine, 10);
        count++;
    } else if (char === '0' || char >= '0' && char <= '9') {
        sum += parseInt(sumLine, 10);
        count++;
    }
});

const actualCount = count;
const actualSum = sum;

console.log(`count=${actualCount} sum=${actualSum}`);
