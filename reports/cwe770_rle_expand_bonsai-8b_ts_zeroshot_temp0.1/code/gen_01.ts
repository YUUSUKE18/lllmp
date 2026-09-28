const input = process.stdin.read().trim();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
  const [value, num] = part.split(':').map(Number);
  if (!isNaN(value) && !isNaN(num)) {
    count += num;
    sum += value * num;
  }
}

console.log(`count=${count} sum=${sum}`);
