const input = process.stdin.read();
const tokens = input.trim().split(/\s+/);
const numbers: number[] = [];
for (const token of tokens) {
  const num = parseInt(token, 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}
const uniqueSet = new Set(numbers);
let count = uniqueSet.size;
let sum = 0;
for (const num of uniqueSet) {
  sum += num;
}
console.log(`count=${count} sum=${sum}`);
