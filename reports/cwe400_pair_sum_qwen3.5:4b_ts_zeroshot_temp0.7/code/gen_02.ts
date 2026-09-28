const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let targetValue = null;
let numbers: number[] = [];

rl.on('line', (line) => {
  if (targetValue === null) {
    const trimmed = line.trim();
    if (trimmed !== '' && /^-?\d+$/.test(trimmed)) {
      targetValue = parseInt(trimmed, 10);
    }
  } else {
    const trimmed = line.trim();
    if (trimmed !== '') {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }

  if (targetValue !== null && numbers.length > 0) {
    rl.close();
    processPairs();
  }
});

function processPairs() {
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === targetValue) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
}
