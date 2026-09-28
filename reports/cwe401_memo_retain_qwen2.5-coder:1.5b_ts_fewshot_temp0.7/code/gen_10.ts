import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let memo = new Map<number, number>();

async function query(n: number): Promise<number> {
  if (memo.has(n)) return memo.get(n);

  if (n === 1) return 0;

  if (n % 2 === 0) return memo.set(n, 1 + await query(n / 2));
  else return memo.set(n, 1 + await query(3 * n + 1));
}

async function main() {
  let total = 0;
  let lastQuery = 0;

  for await (const line of rl) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === lastQuery) continue;

    total += await query(n);
    lastQuery = n;
  }

  console.log(`total=${total}`);

  rl.close();
}

main();
