const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
let goal = parseInt(input[0]);
let numbers = [];

if (input.length > 1) {
  for (let i = 1; i < input.length; i++) {
    const value = parseInt(input[i]);
    if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
      numbers.push(value);
    }
  }
}

let count = 0;
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === goal) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
