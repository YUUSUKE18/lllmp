const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const goal = parseInt(line.trim(), 10);
  const numbers = line.trim().split(/\s+/).filter((val) => val !== '').map((val) => parseInt(val, 10));
  
  const validNumbers = numbers.filter((num) => num >= 0 && num <= goal);
  
  const pairs = [];
  for (let i = 0; i < validNumbers.length; i++) {
    for (let j = i + 1; j < validNumbers.length; j++) {
      if (validNumbers[i] + validNumbers[j] === goal) {
        pairs.push([validNumbers[i], validNumbers[j]]);
      }
    }
  }
  
  const pairsCount = pairs.length;
  console.log(`pairs=${pairsCount}`);
});
