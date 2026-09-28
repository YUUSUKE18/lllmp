const numbers = [];
const target = 0;

process.stdin
  .pipe(numbers)
  .on('end', () => {
    numbers = numbers.map(n => parseInt(n, 10));
    numbers = numbers.filter(n => !isNaN(n));
    numbers = numbers.filter(n => typeof n === 'number' && !Number.isNaN(n));

    const pairs = [];
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
          pairs.push([i, j]);
        }
      }
    }

    console.log(`pairs=${pairs.length}`);
  });
