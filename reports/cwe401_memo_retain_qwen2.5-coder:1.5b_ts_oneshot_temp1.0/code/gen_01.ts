import { readLine } from 'process';

const memo = new Map<number, number>();

async function solve() {
  let total = 0;

  while (true) {
    const query = await readLine();
    if (query === null || query.trim() === "") break;

    const n = parseInt(query, 10);
    if (Number.isNaN(n)) continue;

    if (memo.has(n)) {
      total += memo.get(n);
    } else {
      let steps = 0;
      let current = n;

      while (current !== 1) {
        steps++;
        current = current % 2 === 0 ? current / 2 : 3 * current + 1;
      }

      memo.set(n, steps);
      total += steps;
    }
  }

  console.log(`total=${total}`);
}

solve();
