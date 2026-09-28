import { Readable } from 'stream';

const input = Readable.from(process.stdin);

let count = 0;
let max = -Infinity;

for await (const line of input) {
  const elements = line.strip().split(',').map(e => e.trim());
  elements.forEach(e => {
    const num = parseInt(e, 10);
    if (!isNaN(num) && num >= -9223372036854775808 && num <= 9223372036854775807) {
      count++;
      if (num > max) max = num;
    }
  });
}

console.log(`count=${count} max=${max}`);
