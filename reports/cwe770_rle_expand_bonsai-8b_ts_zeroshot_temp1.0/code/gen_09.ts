const input = process.stdin.read();
const items = input
  .split(',')
  .map(item => item.trim())
  .filter(item => item !== '');

let count = 0;
let sum = 0;

for (const item of items) {
  const [value, freq] = item.split(':');
  const num = parseInt(value, 10);
  const numFreq = parseInt(freq, 10);

  if (isNaN(num) || isNaN(numFreq) || numFreq < 0) continue;

  count += numFreq;
  sum += num * numFreq;
}

console.log(`count=${count} sum=${sum}`);
