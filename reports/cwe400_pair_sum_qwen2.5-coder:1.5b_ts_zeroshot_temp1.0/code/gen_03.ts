import { readLine } from 'node:readline/promises';

async function main() {
  const targetValue = parseInt(await readLine(), 10);
  const numbers = await readLines().then((lines) => lines.filter((line) => !line.trim().startsWith('#')).map((line) => parseInt(line.trim(), 10)));

  let pairs = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === targetValue) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
}

main().catch((error) => {
  console.error(error);
});
