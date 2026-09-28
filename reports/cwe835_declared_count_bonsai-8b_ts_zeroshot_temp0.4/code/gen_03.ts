const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

let count = 0;
let total = 0;

countLine.split('').forEach(c => {
  const num = parseInt(c, 10);
  if (!isNaN(num)) {
    count++;
    total += num;
  }
});

sumLine.split('').forEach(line => {
  const num = parseInt(line, 10);
  if (!isNaN(num)) {
    total += num;
  }
});

console.log(`count=${count} sum=${total}`);
