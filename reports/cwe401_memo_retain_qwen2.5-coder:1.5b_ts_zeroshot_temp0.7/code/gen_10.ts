import { readLine } from 'process';

let memo: { [key: number]: number } = {};

async function processQuery(query: number): Promise<number> {
  if (query === 1) return 0;

  if (memo[query]) return memo[query];

  if (query % 2 === 0) {
    memo[query] = 1 + processQuery(query / 2);
  } else {
    memo[query] = 1 + processQuery(3 * query + 1);
  }

  return memo[query];
}

async function main(): Promise<void> {
  const total = await processQueries();
  console.log(`total=${total}`);
}

async function processQueries(): Promise<number> {
  let total = 0;

  while (true) {
    const query = await readLine().trim();
    if (!query) break;

    try {
      const n = parseInt(query, 10);
      if (!isNaN(n)) {
        total += await processQuery(n);
      }
    } catch (error) {
      // Ignore invalid input
    }
  }

  return total;
}

main();
