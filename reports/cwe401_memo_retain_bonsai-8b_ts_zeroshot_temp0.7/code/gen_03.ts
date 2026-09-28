import { stdin, process } from 'readline';
import { Map } from 'typescript';

const memo = new Map<number, number>();

function collate(input: string): number[] {
  return input
    .split('\n')
    .filter(line => {
      const num = parseInt(line, 10);
      return !isNaN(num) && num >= 1;
    })
    .map(line => num => parseInt(line, 10));
}

function steps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = 1 + steps(n % 2 === 0 ? n / 2 : 3 * n + 1);

  memo.set(n, steps);
  return steps;
}

function main(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const queries = collate(rl.prompt('Enter numbers (one per line): '));

  let total = 0;

  for (const num of queries) {
    const steps = steps(num);
    total += steps;
  }

  console.log(`total=${total}`);
}

main();
