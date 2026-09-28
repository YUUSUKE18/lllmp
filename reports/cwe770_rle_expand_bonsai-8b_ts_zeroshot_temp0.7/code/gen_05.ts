const input = process.stdin.read();
const parts = input.trim().split(',');

let count = 0;
let sum = 0;
let prevValue: number | undefined = undefined;

for (const part of parts) {
  const [valueStr, countStr] = part.split(':');
  const value = parseInt(valueStr, 10);
  const numCount = parseInt(countStr, 10);

  if (isNaN(value) || isNaN(numCount) || numCount < 0) continue;

  if (value !== prevValue) {
    if (prevValue !== undefined) {
      count += numCount;
      sum += value * numCount;
    }
    prevValue = value;
    count = numCount;
    sum = value * numCount;
  } else {
    count += numCount;
    sum += value * numCount;
  }
}

console.log(`count=${count} sum=${sum}`);
