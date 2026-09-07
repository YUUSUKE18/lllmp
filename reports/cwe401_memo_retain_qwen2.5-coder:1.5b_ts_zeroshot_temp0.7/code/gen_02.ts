import { readLine } from 'process';

const memo = new Map<number, number>();

async function main() {
  while (true) {
    const input = await readLine();
    if (!input) break;

    const n = parseInt(input, 10);
    if (n === 1) {
      console.log('total=0');
      continue;
    }

    let count = 0;
    while (n !== 1) {
      if (memo.has(n)) {
        count += memo.get(n);
        break;
      }

      count++;
      memo.set(n, count);

      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = 3 * n + 1;
      }
    }

    console.log(`total=${count}`);
  }
}

main();
