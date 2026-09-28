import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const memo = new Map<number, number>();

async function main() {
  let total = 0;
  const reader = input.getReader();
  const result = await reader.readText();

  const lines = result.trim().split('\n');
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n <= 0) continue;

    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }

    let count = 0;
    let current = n;
    while (current !== 1) {
      count++;
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
    }
    memo.set(n, count);
    total += count;
  }

  console.log(`total=${total}`);
}

main();
