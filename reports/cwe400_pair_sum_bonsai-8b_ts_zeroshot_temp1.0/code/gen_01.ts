const numbers = [];
const input = process.stdin.read().split('\n');

for (let i = 1; i < input.length; i++) {
  const line = input[i].trim();
  if (/^-?\d+$/.test(line)) {
    numbers.push(+line);
  }
}

const countPairs = () => {
  const n = numbers.length;
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  return count;
};

const target = parseInt(input[0].trim());
const result = countPairs();

console.log(`pairs=${result}`);
