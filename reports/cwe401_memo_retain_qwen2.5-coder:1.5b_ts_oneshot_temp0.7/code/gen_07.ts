import { prompt } from 'prompt-sync';

function computeSteps(n: number): number {
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    steps++;
  }
  return steps;
}

const prompt = prompt();
const data: number[] = [];

async function main() {
  while (true) {
    const input = await prompt('Enter a number (or press Ctrl+C to exit): ');
    if (!input) break;
    const n = parseInt(input, 10);
    if (isNaN(n)) continue;
    data.push(n);
  }

  const totalSteps = data.reduce((acc, n) => acc + computeSteps(n), 0);

  console.log(`total=${totalSteps}`);
}

main();
