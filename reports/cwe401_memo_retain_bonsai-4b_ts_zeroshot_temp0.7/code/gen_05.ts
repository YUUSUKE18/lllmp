```ts
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo: { [n: number]: number } = {};

let total = 0;

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  if (isNaN(n) || n <= 0 || n > 2^63) {
    return;
  }

  if (n === 1) {
    total += 0;
  } else {
    let current = n;
    let steps = 0;

    // メモ化して計算を高速化
    if (memo[current]) {
      steps = memo[current];
    } else {
      // 1 <= current <= 2^63 のループ内で計算
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
      }
      memo[current] = steps;
    }

    total += steps;
  }
});

rl.close();
console.log(`total=${total}`);
