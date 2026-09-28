import { stdin } from 'process';

stdin.on('data', async (input: Buffer) => {
  const target = parseInt(input.toString().trim(), 10);

  const numbers = input.toString().split('\n').slice(2).map(Number);

  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
