const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1).join('\n');

const count = parseInt(countLine.trim()) || 0;
const sum = 0;

const lines = sumLine.split('\n');
for (const line of lines) {
  const num = parseInt(line.trim());
  if (!isNaN(num)) {
    sum += num;
  }
}

const actualCount = countLine ? parseInt(countLine.trim()) || 0 : 0;
const actualSum = sum;

console.log(`count=${actualCount} sum=${actualSum}`);
