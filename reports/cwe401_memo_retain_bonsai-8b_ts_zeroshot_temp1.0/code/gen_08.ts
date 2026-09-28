import { Readable } from 'stream';

const memo = new Map<number, number>();

const count = Readable.from(process.stdin);

count.pipe(process.stdout.write).on('close', () => {
  const results = [];
  let total = 0;

  for await (let line of count) {
    const n = parseInt(line.trim());
    if (isNaN(n) || n <= 0) continue;

    if (memo.has(n)) {
      results.push(memo[n]);
      total += results results.push(memo[n]);
      continue;
    }

    let current = n;
    let steps = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      memo.set(current, steps);
    }

    results.push(steps);
    total += steps;
  }

  process.stdout.write(`total=${total}\n`);
});
