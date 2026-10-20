const input = process.stdin.read().trim();
const numbers = input
  .split(',')
  .map((num) => {
    const stripped = num.trim();
    if (!stripped || isNaN(stripped)) return null;
    return parseInt(stripped, 10);
  })
  .filter((n) => n !== null)
  .Set()
  .map((n) => n.toString());

const count = numbers.length;
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(`count=${count} sum=${sum}`);
