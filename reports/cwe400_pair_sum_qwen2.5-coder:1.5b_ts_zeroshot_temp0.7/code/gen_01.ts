import { stdin } from 'process';

stdin.on('data', (data) => {
  const targetValue = parseInt(data.toString().trim(), 10);
  const pairs = 0;
  const numbers: number[] = [];

  for (let i = 2; i <= data.length; i++) {
    const num = parseInt(data.slice(i - 2, i).trim(), 10);
    if (numbers.includes(num)) {
      pairs++;
    } else {
      numbers.push(num);
    }
  }

  console.log(`pairs=${pairs}`);
});
