const input = process.stdin.read();
const numbers = input
  .split(',')
  .map((num) => {
    const trimmed = num.trim();
    if (trimmed === '') return null;
    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed)) return null;
    return parsed;
  })
  .filter((num) => num !== null)
  .map((num) => num.toString());
const count = numbers.length;
const max = Math.max(...numbers);
console.log(`count=${count} max=${max}`);
