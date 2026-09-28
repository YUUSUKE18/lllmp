import { Readable, ReadTextStream } from 'stream';

const input = Readable.from(process.stdin);

let numbers = [];
let validLines = 0;

for await (const line of input) {
  const strippedLine = line.trim();
  if (!strippedLine) continue;

  const parsed = parseInt(strippedLine, 10);
  if (!isNaN(parsed)) {
    numbers.push(parsed);
    validLines++;
  }
}

const countPairs = (arr: number[]): number => {
  const n = arr.length;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  if (sum !== target) return 0;

  const seen = new Set<number>();
  let count = 0;

  for (let i = 0; i < n; i++) {
    const num = arr[i];
    if (seen.has(num)) continue;
    seen.add(num);
    for (let j = i + 1; j < n; j++) {
      if (seen.has(arr[j])) continue;
      seen.add(arr[j]);
      if (num + arr[j] === sum) {
        count++;
      }
    }
  }

  return count;
};

const target = numbers[0] || 0;
const result = countPairs(numbers);

console.log(`pairs=${result}`);
