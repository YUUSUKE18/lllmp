const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1).split('\n').reduce((acc, line) => {
  const num = parseInt(line, 10);
  if (!isNaN(num)) {
    acc += num;
  }
  return acc;
}, 0);

const actualCount = countLine ? countLine.trim().split('').length : 0;
const actualSum = sumLine ? sumLine.trim() : '0';

console.log(`count=${actualCount} sum=${actualSum}`);
