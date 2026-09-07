const target = parseInt(process.stdin.read(), 10);
let pairs = 0;
let seen = new Set<number>();

for (const line of process.stdin) {
  const numbers = line.split(' ').map(Number);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (seen.has(sum) && sum === target) {
        pairs++;
      }
      seen.add(sum);
    }
  }
}

console.log(`pairs=${pairs}`);
