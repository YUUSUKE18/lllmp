import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let memo = new Map<string, number>();

async function solve() {
  while (true) {
    const query = (await rl.question("Enter a number: ")) as string;
    if (query === "") continue;
    const n = parseInt(query, 10);

    if (n === 1) {
      console.log(`total=0`);
      continue;
    }

    if (memo.has(query)) {
      console.log(`total=${memo.get(query)}`);
      continue;
    }

    const steps = computeSteps(n);
    memo.set(query, steps);
    console.log(`total=${steps}`);
  }
}

async function computeSteps(n: number): number {
  let count = 0;
  while (n !== 1) {
    count++;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }
  return count;
}

solve();
