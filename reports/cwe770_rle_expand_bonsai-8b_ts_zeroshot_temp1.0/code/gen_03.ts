const input = process.stdin.read().trim();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
  const [value, frequency] = part.split(':').map(Number);
  if (isNaN(value) || isNaN(frequency)) continue;
  if (frequency < 0) continue;

  count += frequency;
  sum += value * frequency;
}

console.log(`count=${count} sum=${sum}`);
