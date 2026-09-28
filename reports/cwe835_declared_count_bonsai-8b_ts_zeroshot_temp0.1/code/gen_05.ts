const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1).join('\n');

let count = 0;
let sum = 0;

if (countLine) {
  const countStr = countLine.trim();
  if (/^-?\d+$/.test(countStr)) {
    count = parseInt(countStr, 10);
  }
}

if (sumLine) {
  const sumStr = sumLine.trim();
  if (/^-?\d+$/.test(sumStr)) {
    sum = parseInt(sumStr, 10);
  }
}

const actualCount = count;
const actualSum = sum;

console.log(`count=${actualCount} sum=${actualSum}`);
