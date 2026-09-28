const args = process.argv;
const input = args[2].trim();

const numbers = input
  .split(',')
  .map(n => {
    const trimmed = n.trim();
    if (!trimmed) return null;
    const num = parseInt(trimmed, 10);
    if (isNaN(num)) return null;
    if (num < -9007199254740992 || num > 9007199254740992) return null;
    return num;
  })
  .filter(n => n !== null);

const count = numbers.length;
const max = count > 0 ? Math.max(...numbers) : 0;

console.log(`count=${count} max=${max}`);
