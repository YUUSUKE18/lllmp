const numbers = process.stdin.read().split(',').map(n => {
  const trimmed = n.trim();
  if (!trimmed || isNaN(trimmed)) return null;
  const parsed = parseInt(trimmed, 10);
  if (isNaN(parsed)) return null;
  if (parsed < -9007199254740992 || parsed > 9007199254740991) return null;
  return parsed;
}).filter(n => n !== null);

const count = numbers.length;
const max = Math.max(...numbers);

console.log(`count=${count} max=${max}`);
