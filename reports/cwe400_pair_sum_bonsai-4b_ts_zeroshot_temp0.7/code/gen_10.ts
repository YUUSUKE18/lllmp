const readline = require('readline');
const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

input.on('line', (line) => {
  if (line.trim() === '') return;
  
  const target = parseInt(line.trim());
  const numbers = [];
  
  input_lines = [];
  input_lines.push(line.trim());
  
  while (true) {
    const nextLine = input.next();
    if (nextLine) {
      input_lines.push(nextLine.trim());
    } else {
      break;
    }
  }
  
  // Filter only valid integers
  const validNumbers = numbers.filter(num => num !== undefined);
  const validNumbers = validNumbers.filter(num => !isNaN(num) && num >= -2**31 && num <= 2**31 - 1);
  
  // Count pairs that sum to target
  const pairs = 0;
  const seen = new Set<number>();
  
  validNumbers.forEach(num => {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs++;
    }
    seen.add(num);
  });
  
  // Output only the pair count
  console.log(`pairs=${pairs}`);
});

input_lines.forEach(line => {
  if (line.trim() === '') return;
  
  const num = parseInt(line.trim());
  if (!isNaN(num) && num >= -2**31 && num <= 2**31 - 1) {
    numbers.push(num);
  }
});

input_lines.forEach(line => {
  if (line.trim() === '') return;
  
  const num = parseInt(line.trim());
  if (!isNaN(num) && num >= -2**31 && num <= 2**31 - 1) {
    numbers.push(num);
  }
});

input_lines.forEach(line => {
  if (line.trim() === '') return;
  
  const num = parseInt(line.trim());
  if (!isNaN(num) && num >= -2**31 && num <= 2**31 - 1) {
    numbers.push(num);
  }
});

// Correct input parsing
input.on('line', (line) => {
  const target = parseInt(line.trim());
  const numbers = [];
  
  input_lines = [];
  input_lines.push(line.trim());
  
  while (true) {
    const nextLine = input.next();
    if (nextLine) {
      input_lines.push(nextLine.trim());
    } else {
      break;
    }
  }
  
  // Filter only valid integers
  const validNumbers = numbers.filter(num => num !== undefined);
  const validNumbers = validNumbers.filter(num => !isNaN(num) && num >= -2**31 && num <= 2**31 - 1);
  
  // Count pairs that sum to target
  const pairs = 0;
  const seen = new Set<number>();
  
  validNumbers.forEach(num => {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs++;
    }
    seen.add(num);
  });
  
  // Output only the pair count
  console.log(`pairs=${pairs}`);
});
