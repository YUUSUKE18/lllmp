const memo: { [n: number]: number } = {};

const process = (input: string) => {
  const lines = input.trim().split(/\r\n/).filter(line => line.trim() !== '');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n)) continue;

    if (n === 1) {
      total += 0;
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

      memo[current] = steps;
      total += steps;
    }
  }

  return total;
};

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const result = process(line);
  console.log(`${result}`);
});

rl.on('close', () => {
  console.log(`${memo[1]}`);
});
