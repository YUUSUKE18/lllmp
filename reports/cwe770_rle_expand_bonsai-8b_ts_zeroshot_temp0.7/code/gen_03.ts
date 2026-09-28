const input = process.stdin.read();
const parts = input.trim().split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
  const [value, countStr] = part.trim().split(':');
  const valueNum = parseInt(value, 10);
  const numCount = parseInt(countStr, 10);

  if (isNaN(valueNum) || isNaN(numCount) || numCount < 0) continue;

  count += numCount;
  sum += valueNum * numCount;
}

console.log(`count=${count} sum=${sum}`);
