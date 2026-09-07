import { readLine } from 'process';

let memo: { [key: number]: number } = {};
let total: number = 0;

process.stdin.on('data', (data: string) => {
  const numbers = data.split('\n').filter(Boolean);
  numbers.forEach(num => {
    const numInt = parseInt(num);
    if (numInt < 1) {
      return;
    }
    let hand = numInt;
    if (memo[numInt]) {
      total += memo[numInt];
      return;
    }
    let steps = 0;
    while (hand !== 1) {
      steps++;
      if (steps > 10000) {
        // To avoid an infinite loop for some numbers
        break;
      }
      if (hand % 2 === 0) {
        hand = hand / 2;
      } else {
        hand = 3 * hand + 1;
      }
    }
    total += steps;
    memo[numInt] = steps;
  });
  process.stdin.pause();
  process.stdout.write(`total=${total}\n`);
});
