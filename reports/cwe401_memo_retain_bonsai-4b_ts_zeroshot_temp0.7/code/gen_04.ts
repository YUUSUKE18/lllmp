import { Map } from 'js/util';

const memo = new Map<number, number>();

const process = (input: string) => {
  const lines = input.trim().split('\n');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n)) continue;

    if (n === 1) {
      total += 0;
    } else if (memo.has(n)) {
      total += memo.get(n);
    } else {
      let current = n;
      let steps = 0;

      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
      }

      memo.set(n, steps);
      total += steps;
    }
  }

  return total;
};

const main = () => {
  const input = process(process.stdin.read()).toString();
  const result = process(input);
  console.log(`total=${result}`);
};

main();
