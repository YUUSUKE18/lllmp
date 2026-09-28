const input = process.stdin.read();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
  const [value, num] = part.trim().split(':');
  const value = parseInt(value, 10);
  const num = parseInt(num, 10);

  if (isNaN(value) || isNaN(num) || num < 0) continue;

  count += num;
  sum += value * num;
}

console.log(`count=${count} sum=${sum}`);
